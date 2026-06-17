const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

assert.strictEqual(packageJson.scripts.test, 'node tests/run-all.js', 'npm test should run the test discovery script');
assert.ok(fs.existsSync(path.join(root, 'tests', 'run-all.js')), 'test runner should exist');

const runner = fs.readFileSync(path.join(root, 'tests', 'run-all.js'), 'utf8');
assert.ok(runner.includes("name.endsWith('.test.js')"), 'test runner should discover test files by suffix');
assert.ok(runner.includes("name !== 'run-all.js'"), 'test runner should exclude itself');
assert.ok(!runner.includes('test_runner.test.js'), 'test runner should not hard-code this test by filename');

console.log('test runner checks passed');
