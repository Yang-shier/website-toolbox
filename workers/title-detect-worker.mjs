const DEFAULT_QWEN_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
const DEFAULT_MODEL = 'qwen-turbo';
const MAX_ITEMS = 120;
const MAX_TEXT_LENGTH = 120;

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin') || '';
  const allowed = String(env.ALLOWED_ORIGINS || '*')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  const allowOrigin = allowed.includes('*') || allowed.includes(origin) ? (allowed.includes('*') ? '*' : origin) : allowed[0] || '*';
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json(data, status, request, env) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders(request, env),
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

function normalizeItems(items) {
  if (!Array.isArray(items)) return [];
  return items
    .slice(0, MAX_ITEMS)
    .map((item, position) => {
      const index = Number.isInteger(item.index) ? item.index : position;
      const text = String(item.text || '').replace(/\s+/g, ' ').trim().slice(0, MAX_TEXT_LENGTH);
      return { index, text };
    })
    .filter((item) => item.text);
}

function buildPrompt(items) {
  return [
    '你是网页内容排版助手。请判断哪些段落是小标题。',
    '只返回 JSON，不要解释。',
    '规则：',
    '- 小标题通常是章节名、分类名、参数名、产品介绍栏目名。',
    '- 型号、产品名、普通功能点、完整句子不要当小标题。',
    '- 如果不确定，宁可不选。',
    '返回格式：{"titles":[0,3,5]}',
    '',
    '段落：',
    items.map((item) => `${item.index}. ${item.text}`).join('\n'),
  ].join('\n');
}

function parseTitles(content, validIndexes) {
  const text = String(content || '').trim();
  const match = text.match(/\{[\s\S]*\}/);
  let titles = [];
  if (match) {
    try {
      const parsed = JSON.parse(match[0]);
      titles = Array.isArray(parsed.titles)
        ? parsed.titles
        : Array.isArray(parsed.titleIndexes)
          ? parsed.titleIndexes
          : Array.isArray(parsed.indices)
            ? parsed.indices
            : [];
    } catch (error) {
      titles = [];
    }
  }
  if (!titles.length) titles = text.match(/\d+/g) || [];
  const seen = new Set();
  return titles
    .map((value) => Number(value))
    .filter((value) => Number.isInteger(value) && validIndexes.has(value) && !seen.has(value) && seen.add(value));
}

async function callQwen(items, env) {
  const upstreamFetch = env.QWEN_FETCH || fetch;
  const response = await upstreamFetch(env.QWEN_API_URL || DEFAULT_QWEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.QWEN_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: env.QWEN_MODEL || DEFAULT_MODEL,
      messages: [
        {
          role: 'user',
          content: buildPrompt(items),
        },
      ],
      temperature: 0,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Qwen request failed: ${response.status} ${detail.slice(0, 160)}`);
  }

  const data = await response.json();
  return data && data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : '';
}

export async function handleTitleDetect(request, env = {}) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(request, env) });
  const url = new URL(request.url);
  if (request.method === 'GET' && url.pathname === '/health') {
    return json({ ok: true, model: env.QWEN_MODEL || DEFAULT_MODEL }, 200, request, env);
  }
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, request, env);
  if (!env.QWEN_API_KEY) return json({ error: 'QWEN_API_KEY is not configured' }, 500, request, env);

  let body;
  try {
    body = await request.json();
  } catch (error) {
    return json({ error: 'Invalid JSON body' }, 400, request, env);
  }

  const items = normalizeItems(body.items);
  if (!items.length) return json({ titles: [] }, 200, request, env);

  try {
    const validIndexes = new Set(items.map((item) => item.index));
    const content = await callQwen(items, env);
    return json({ titles: parseTitles(content, validIndexes) }, 200, request, env);
  } catch (error) {
    return json({ error: error.message || 'AI title detection failed' }, 502, request, env);
  }
}

export default {
  fetch: handleTitleDetect,
};
