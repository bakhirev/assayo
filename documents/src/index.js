const fs = require('node:fs');
const getJsonFromMarkdown = require('./lib/MdToJson/getJsonFromMarkdown');
const getMarkdownFromJson = require('./lib/JsonToMd/getMarkdownFromJson');

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

function MdToJson(lang) {
  const text = fs.readFileSync(`./md/${lang.toUpperCase()}.md`, 'utf8');
  const json = getJsonFromMarkdown(text);
  const content = JSON.stringify(json, null, 4);
  fs.writeFileSync(`./json/${lang}.json`, content);
}

function JsonToMd(lang) {
  const text = fs.readFileSync(`./json/${lang}.json`, 'utf8');
  const json = JSON.parse(text);
  const content = getMarkdownFromJson(json, languages, lang);
  fs.writeFileSync(`../${lang.toUpperCase()}.md`, content);
}

// languages.forEach(MdToJson);
languages.forEach(JsonToMd);

