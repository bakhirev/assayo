const fs = require('node:fs');

const PAGES = [
  // 'achievements',
  // 'common',
  // 'navigation',
  // 'pages',
  'recommendations',
  // 'settings',
];

function createTemplate(page) {
  const text = fs.readFileSync(`../ru/${page}.ts`, 'utf8');
  const content = text
    .replace(/(§\s[A-Z0-9._]+)(:\s){0,}/gim, '')
    .replace(/(export\sdefault\s`)|(`;)/gim, '');
  fs.writeFileSync(`./templates/${page}.txt`, content);
  fs.writeFileSync(`./transactions/${page}.txt`, content);
}

function restoreKeys(page) {
  const origin = fs.readFileSync(`../ru/${page}.ts`, 'utf8');
  const keys = origin.match(/(§\s[A-Z0-9._]+)(:\s){0,}/gim);
  const lines = origin.split('\n');

  const transactions = fs.readFileSync(`./transactions/${page}.txt`, 'utf8');
  const target = transactions.split('\n');
  lines.forEach((row, index) => {
    if (!target[index]) {
      target[index] = lines[index];
    } else if (row[0] === '§') {
      target[index] = keys.shift() + target[index];
    }
  });
  const content = target.join('\n');

  fs.writeFileSync(`./output/${page}.ts`, content);
}

const STEP = 2;
if (STEP === 1) PAGES.map(createTemplate);
if (STEP === 2) PAGES.map(restoreKeys);

