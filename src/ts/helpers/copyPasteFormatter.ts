export const MARKER = '\u200B';

function getFirstAndLastSymbol(text: string): string[] {
  return [
    text[0],
    text[text.length - 1],
  ];
}

function getDraft(lines: string[]): string[] {
  const draft = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nextLine = lines[i + 1];
    if (!line) continue;
    const [first, last] = getFirstAndLastSymbol(line);

    if (line && !nextLine) {
      if (first !== MARKER) continue;
      if (lines[i + 3]) { // card with icon
        draft.push(`— ${line} ${lines[i + 2]} (${lines[i + 3]});`);
        i +=  lines[i + 4] ? 4 : 3;
        continue;
      } else { // card with small icon
        draft.push(`— ${line} ${lines[i + 2]};`);
        i += 2;
        continue;
      }
    } else if (line && nextLine) {
      if (last === '%') { // pie chart
        draft.push(`— ${line} ${nextLine};`);
        i += 2;
        continue;
      }

      if (first === MARKER && last === MARKER) { // recommendations
        draft.push(`— ${line} ${nextLine}`);
        i += 2;
        continue;
      }

      if (first === MARKER) { // table header
        const camelCase = /(\p{Ll})(\p{Lu})/gu;
        draft.push(`;${line.replace(camelCase, '$1;$2')}`);
        continue;
      }

      if (last === MARKER) { // table body
        draft.push(`;${line.split(MARKER).filter(v => v).join(';')} `);
        continue;
      }
    }
    draft.push(line);
  }
  return draft;
}

function getTextFromDraft(draft: string[]): string {
  let modifiedText = '';
  for (let i = 0; i < draft.length; i++) {
    const line = draft[i];
    const nextLine = draft[i + 1];
    if (nextLine) {
      if (line[0] !== '—' && nextLine[0] === '—') {
        modifiedText += `\n${line}:\n`;
        continue;
      }
      if (line[0] === '—' && nextLine[0] !== '—') {
        modifiedText += `${line}\n\n`;
        continue;
      }
    }
    modifiedText += `${line}\n`;
  }

  return modifiedText
    .replace(/\n{3,}/gm, '\n\n')
    .replaceAll(MARKER, '');
}

export function getModifiedText(text: string): string {
  const lines = text.split('\n');
  const draft = getDraft(lines);
  return getTextFromDraft(draft);
}
