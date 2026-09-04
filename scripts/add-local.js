const fs = require('node:fs');
const path = require('node:path');

const buildDir = path.join(__dirname, '..', 'build');
const staticDir = path.join(buildDir, 'static');

const prefixes = ['./', '../', '../../', '/'];
const suffixes = (new Array(6)).fill(1).map((unused, index) => index + 1);
const paths = [];
prefixes.forEach((prefix) => {
  paths.push(`<script src='${prefix}log.txt'></script>`);
  suffixes.forEach((suffix) => {
    paths.push(`<script src='${prefix}log-${suffix}.txt'></script>`);
  });
});
const content = paths.join('');

const htmlPath = path.join(buildDir, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const js = fs.readFileSync(path.join(staticDir, 'index.js'), 'utf8');
const css = fs.readFileSync(path.join(staticDir, 'index.css'), 'utf8');

let text = html
  .replace(/<\/title>/gim, `</title>${content}`)
  .replace(/<script[^>]*src=["'][^"']*static\/index\.js["'][^>]*><\/script>/gi, '')
  .replace(/<link[^>]*href=["'][^"']*static\/index\.css["'][^>]*>/gi, '');
text += `<style>${css}</style><script>${js}</script>`;
fs.writeFileSync(htmlPath, text);

fs.rmSync(staticDir, { recursive: true, force: true });
