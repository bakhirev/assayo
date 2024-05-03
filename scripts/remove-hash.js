const fs = require('node:fs');
const { exec } = require('node:child_process');

exec([
  'mv ../build/static/js/main.*.js ../build/static/index.js',
  'rm -rf ../build/static/js',
  'mv ../build/static/css/main.*.css ../build/static/index.css',
  'rm -rf ../build/static/css',
  'rm ../build/asset-manifest.json',
  'rm ../build/test.txt',
].join(' && '));

const html = fs.readFileSync('../build/index.html', 'utf8');
const text = html
  .replace(/static\/js\/[a-z0-9.]+/gim, 'static/index.js')
  .replace(/static\/css\/[a-z0-9.]+/gim, 'static/index.css');
fs.writeFileSync('../build/index.html', text);
