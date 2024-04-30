const custom = require('./custom');
const TableOfContent = require('./TableOfContent');

function addListWithPrefix(list, markdown, prefix = '') {
  (list || []).forEach((text) => text ? markdown.push(`${prefix}${text}`) : '');
}

function addList(list, markdown) {
  addListWithPrefix(list, markdown, '- ');
}

function addBlockCode(list, markdown) {
  markdown.push('```');
  addListWithPrefix(list, markdown);
  markdown.push('```');
}

function getMarkdownFromJson(json, languages, language) {
  const tableOfContent = new TableOfContent();
  const firstTag = (json || [])?.[0]?.warning ? json.shift() : null;
  let markdown = [
    custom.getLanguageLinks(languages, language),
    firstTag ? `> ${firstTag.warning}\n` : '',
    custom.getTitle(language),
    custom.getSocialLinks(),
  ];

  (json || []).forEach((tag) => {
    if (!tag) return;

    if (tag.p) markdown.push(tag.p);
    else if (tag.warning) markdown.push(`> ${tag.warning}\n`);
    else if (tag.tableOfContent) markdown.push('tableOfContent');
    else if (tag.li) addList(tag.li, markdown);
    else if (tag.pre) addBlockCode(tag.pre, markdown);
    else if (tag.img) markdown.push(`${tag.img}\n`);
    else if (tag.h1) tableOfContent.addTitle(1, tag.h1, markdown);
    else if (tag.h2) tableOfContent.addTitle(2, tag.h2, markdown);
    else if (tag.h3) tableOfContent.addTitle(3, tag.h3, markdown);
    else if (tag.h4) tableOfContent.addTitle(4, tag.h4, markdown);
    else if (tag.h5) tableOfContent.addTitle(5, tag.h5, markdown);
    else if (tag.li) tableOfContent.addTitle(5, tag.h5, markdown);
  });

  markdown = tableOfContent.getMarkdownWithTable(markdown);
  markdownText = markdown
    .join('\n')
    .replace('demo/?dump=./test.txt', `demo/?ref=github&lang=${language}&dump=./test.txt`)
    .replace('online/demo)', `online/demo?ref=github&lang=${language})`);

  return markdownText;
}

module.exports = getMarkdownFromJson;
