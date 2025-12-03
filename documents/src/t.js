const fs = require('node:fs');

function getId(index) {
  const suffix = [
    'main.title',
    'main.features',
    'main.links',
    'main.videos',
    'main.tableOfContents',
    'report.title',
    'report.create.title',
    'report.create.public.title',
    'report.create.public.description',
    'report.create.js.title',
    'report.create.js.steps',
    'report.create.php.title',
    'report.create.php.steps',
    'report.create.python.title',
    'report.create.python.steps',
    'report.create.ruby.title',
    'report.create.ruby.steps',
    'report.create.go.title',
    'report.create.go.steps',
    'report.create.git.title',
    'report.create.git.description1',
    'report.create.git.description2',
    'report.create.github.title',
    'report.create.github.steps',
    'report.create.private.title',
    'report.create.private.description1',
    'report.create.private.log',
    '',
    'report.create.private.description2',
    'report.concat.title',
    'report.concat.example',
    '',
    'report.concat.description',
    'report.logFile.title',
    'report.logFile.online.title',
    'report.logFile.online.description',
    '',
    'report.logFile.offline.title',
    '',
    'report.logFile.offline.description',
    'report.logFile.powerShell.title',
    'report.logFile.powerShell.description',
    'report.logFile.powerShell.utf',
    'report.logFile.group.title',
    'report.logFile.group.description',
    'practice.title',
    'practice.message.title',
    'practice.message.description',
    'practice.message.example',
    'practice.preCommit.title',
    'practice.preCommit.description',
  ][index] || index;
  return `§ ${suffix}`;
}

function getTranslationFromJson(json) {
  let markdown = [];

  (json || []).filter((t) => t).forEach((tag, index) => {
    const id = getId(index);
    if (tag.p) markdown.push(`${id}: ${tag.p}`);
    else if (tag.li) markdown.push(`${id}:\n${tag.li.join('\n')}`);
    else if (tag.pre && Array.isArray(tag.pre)) markdown.push(`${id}:\n${tag.pre.join('\n')}`);
    else if (tag.pre && !Array.isArray(tag.pre)) markdown.push(`${id}: ${tag.pre}`);
    else if (tag.h1) markdown.push(`${id}: ${tag.h1}`);
    else if (tag.h2) markdown.push(`${id}: ${tag.h2}`);
    else if (tag.h3) markdown.push(`${id}: ${tag.h3}`);
    else if (tag.h4) markdown.push(`${id}: ${tag.h4}`);
    else if (tag.h5) markdown.push(`${id}: ${tag.h5}`);
  });

  return markdown
    .join('\n')
    .replace(/\n\*\*/gim, '\n\n**')
    .replace('demo/?dump=./test.txt', 'demo/?ref=github&dump=./test.txt')
    .replace('online/demo)', 'online/demo?ref=github)');
}

const languages = [
  'en',
  'es',
  'zh',
  'fr',
  'de',
  'pt',
  'ja',
  'ru',
];


function JsonToText(lang) {
  const text = fs.readFileSync(`./json/${lang}.json`, 'utf8');
  const json = JSON.parse(text);
  const content = getTranslationFromJson(json, languages, lang);
  fs.writeFileSync(`./text/${lang.toUpperCase()}.txt`, content);
}

languages.forEach(JsonToText);

