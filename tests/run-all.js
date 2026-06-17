const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const testsDir = __dirname;
const tests = fs
  .readdirSync(testsDir)
  .filter((name) => name.endsWith('.test.js') && name !== 'run-all.js')
  .sort();

let failed = 0;

for (const test of tests) {
  const fullPath = path.join(testsDir, test);
  const result = childProcess.spawnSync(process.execPath, [fullPath], {
    cwd: path.resolve(testsDir, '..'),
    stdio: 'inherit',
  });
  if (result.status !== 0) failed++;
}

if (failed > 0) {
  console.error(`${failed} test file(s) failed`);
  process.exit(1);
}

console.log(`${tests.length} test file(s) passed`);
