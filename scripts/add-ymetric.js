const fs = require('node:fs');
const path = require('node:path');

const buildDir = path.join(__dirname, '..', 'build');

const PERCENT = 5;
const REF = 'local';
const yMetrics = `<img src="https://mc.yandex.ru/watch/94903985?ref=${REF}" style="position:absolute; left:-9999px;" />`;
const content = `(() => {if (!['localhost','github.com'].includes(location.hostname)&&((Math.random()*100>>0)<${PERCENT}))document.querySelector('.notifications').innerHTML='${yMetrics}';})();`;

const htmlPath = path.join(buildDir, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8').replace(/<\/script>/g, `${content}</script>`);
fs.writeFileSync(htmlPath, html);
