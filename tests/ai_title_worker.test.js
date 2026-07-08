const assert = require('assert');
const path = require('path');
const { pathToFileURL } = require('url');

(async () => {
  const workerPath = pathToFileURL(path.resolve(__dirname, '../workers/title-detect-worker.mjs')).href;
  const worker = await import(workerPath);
  let upstreamBody = null;

  const env = {
    QWEN_API_KEY: 'test-key',
    ALLOWED_ORIGINS: 'https://example.com',
    QWEN_FETCH: async (url, options) => {
      upstreamBody = JSON.parse(options.body);
      return new Response(
        JSON.stringify({
          choices: [{ message: { content: '{"titles":[0,2,99,"x"]}' } }],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    },
  };

  const response = await worker.default.fetch(
    new Request('https://worker.example/title-detect', {
      method: 'POST',
      headers: { Origin: 'https://example.com', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [
          { index: 0, text: '主流型号' },
          { index: 1, text: 'AC707N' },
          { index: 2, text: '产品特点' },
        ],
      }),
    }),
    env
  );

  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.headers.get('Access-Control-Allow-Origin'), 'https://example.com');
  assert.deepStrictEqual(await response.json(), { titles: [0, 2] });
  assert.strictEqual(upstreamBody.model, 'qwen-turbo');
  assert.strictEqual(upstreamBody.temperature, 0);
  assert.ok(upstreamBody.messages[0].content.includes('型号、产品名、普通功能点'));

  const fileOriginPreflight = await worker.default.fetch(
    new Request('https://worker.example/title-detect', {
      method: 'OPTIONS',
      headers: { Origin: 'null' },
    }),
    { ALLOWED_ORIGINS: 'https://example.com,null', QWEN_API_KEY: 'test-key' }
  );
  assert.strictEqual(fileOriginPreflight.status, 204);
  assert.strictEqual(fileOriginPreflight.headers.get('Access-Control-Allow-Origin'), 'null');

  const health = await worker.default.fetch(
    new Request('https://worker.example/health', {
      method: 'GET',
      headers: { Origin: 'https://example.com' },
    }),
    { ALLOWED_ORIGINS: 'https://example.com', QWEN_API_KEY: 'test-key', QWEN_MODEL: 'qwen-turbo' }
  );
  assert.strictEqual(health.status, 200);
  assert.deepStrictEqual(await health.json(), { ok: true, model: 'qwen-turbo' });

  const missingKey = await worker.default.fetch(
    new Request('https://worker.example/title-detect', { method: 'POST', body: '{"items":[]}' }),
    {}
  );
  assert.strictEqual(missingKey.status, 500);

  console.log('ai title worker checks passed');
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
