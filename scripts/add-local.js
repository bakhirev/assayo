const fs = require('node:fs');
const { exec } = require('node:child_process');

const prefixes = [ './', '../', '../../', '/'];
const suffixes = (new Array(6)).fill(1).map((a, i) => i + 1);
const paths = [];
prefixes.forEach((prefix) => {
  paths.push(`<script src='${prefix}log.txt'></script>`);
  suffixes.forEach((suffix) => {
    paths.push(`<script src='${prefix}log-${suffix}.txt'></script>`);
  });
});
const content = paths.join('');

const html = fs.readFileSync('../build/index.html', 'utf8');
const js = fs.readFileSync('../build/static/index.js', 'utf8');
const css = fs.readFileSync('../build/static/index.css', 'utf8');
let text = html
  .replace(/<\/title>/gim, `</title>${content}`)
  .replace('<script defer="defer" src="./static/index.js"></script><link href="./static/index.css" rel="stylesheet">', '');
text += `<style>${css}</style><script>${js}</script>`;
fs.writeFileSync('../build/index.html', text);

exec([
  'rm ../build/static/index.js',
  'rm ../build/static/index.css',
  'rm -rf ../build/static',
].join(' && '));
