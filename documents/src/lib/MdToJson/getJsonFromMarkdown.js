class BlockLikeList {
  constructor(code = '-') {
    this.code = code;
    this.content = [];
  }

  update(code, text, json) {
    if (code === this.code) {
      this.content.push(text);
      return true;
    } else if (this.content.length) {
      json.push({ li: this.content });
      this.content = [];
      return false;
    }
  }

  close(json) {
    if (!this.content.length) return;
    json.push({ li: this.content });
    this.content = [];
  }
}

class BlockLikeCode {
  constructor(code = '```') {
    this.code = code;
    this.isOpen = false;
    this.content = [];
  }

  update(code, line, json) {
    if (code === this.code) {
      if (this.isOpen) {
        json.push({ pre: this.content });
        this.content = [];
      }
      this.isOpen = !this.isOpen;
      return true;
    }

    if (this.isOpen) {
      this.content.push(line);
      return true;
    }

    return false;
  }
}

function getJsonFromMarkdown(markdownText) {
  const json = [];
  const li = new BlockLikeList();
  const pre = new BlockLikeCode();

  (markdownText || '').split('\n').forEach((line) => {
    if (!line[0]) return;

    const parts = (line || '').split(' ');
    const code = parts.shift();
    const text = parts.join(' ');

    if (code === '<a') return;
    if (li.update(code, text, json)) return;
    if (pre.update(code, line, json)) return;

    if (code === '>') json.push({ warning: text });
    else if (code === '#####') json.push({ h5: text });
    else if (code === '####') json.push({ h4: text });
    else if (code === '###') json.push({ h3: text });
    else if (code === '##') json.push({ h2: text });
    else if (code === '#') json.push({ h1: text });
    else if (code === '<img') json.push({ img: line });
    else json.push({ p: line });
  });

  li.close(json);

  return json;
}

module.exports = getJsonFromMarkdown;
