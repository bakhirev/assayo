const custom = require('./custom');
const TableOfContent = require('./TableOfContent');

function addListWithPrefix(list, markdown, prefix = '') {
  if (Array.isArray(list)) {
    (list || []).forEach((text) => text ? markdown.push(`${prefix}${text}`) : '');
  } else if (typeof list === 'string') {
    markdown.push(`${prefix}${list}`);
  }
}

function addList(list, markdown) {
  addListWithPrefix(list, markdown, '- ');
  markdown.push('');
}

function addBlockCode(list, markdown) {
  markdown.push('```');
  addListWithPrefix(list, markdown);
  markdown.push('```');
}

function getMarkdownFromJson(json, languages, language) {
  const tableOfContent = new TableOfContent();
  // const firstTag = (json || [])?.[0]?.warning ? json.shift() : null;
  let markdown = [
    custom.getLanguageLinks(languages, language),
    // firstTag ? `> ${firstTag.warning}\n` : '',
    custom.getTitle(language),
  ];

  (json || []).forEach((tag, index) => {
    if (!tag) return;

    if (index === 4) {
      // markdown.push(custom.getSocialLinks());
      markdown.push(custom.getSreenshot());
    }

    if (tag.p) markdown.push(tag.p);
    // else if (tag.warning) markdown.push(`> ${tag.warning}\n`);
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

  markdown.push(custom.getYandexMetrika());
  markdown = tableOfContent.getMarkdownWithTable(markdown);

  markdownText = markdown
    .join('\n')
    .replace(/\n\*\*/gim, '\n\n**')
    .replace('demo/?dump=./test.txt', 'demo/?ref=github&dump=./test.txt')
    .replace('online/demo)', 'online/demo?ref=github)');

  return markdownText;
}

module.exports = getMarkdownFromJson;
