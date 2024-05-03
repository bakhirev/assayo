const fs = require('node:fs');

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
const text = html
  .replace(/var\sreport=\[]<\/script>/gim, `var report=[]</script>${content}`);
fs.writeFileSync('../build/index.html', text);
