const fs = require('node:fs');
const path = require('node:path');

const buildDir = path.join(__dirname, '..', 'build');
const staticDir = path.join(buildDir, 'static');

function remove(target) {
  fs.rmSync(target, { recursive: true, force: true });
}

function findFile(dir, match) {
  if (!fs.existsSync(dir)) return null;
  const name = fs.readdirSync(dir).find(match);
  return name ? path.join(dir, name) : null;
}

const jsFile = findFile(path.join(staticDir, 'js'), (name) => name.endsWith('.js') && !name.endsWith('.map'));
const cssFile = findFile(path.join(staticDir, 'css'), (name) => name.endsWith('.css') && !name.endsWith('.map'));

fs.mkdirSync(staticDir, { recursive: true });
if (jsFile) fs.renameSync(jsFile, path.join(staticDir, 'index.js'));
if (cssFile) fs.renameSync(cssFile, path.join(staticDir, 'index.css'));

remove(path.join(staticDir, 'js'));
remove(path.join(staticDir, 'css'));
remove(path.join(buildDir, 'asset-manifest.json'));
remove(path.join(buildDir, 'test.txt'));
remove(path.join(buildDir, 'social'));
remove(path.join(buildDir, 'themes'));
remove(path.join(buildDir, 'config.json'));

const htmlPath = path.join(buildDir, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8')
  .replace(/static\/js\/[^"'\s]+/g, 'static/index.js')
  .replace(/static\/css\/[^"'\s]+/g, 'static/index.css');
fs.writeFileSync(htmlPath, html);
