function evalCsvFile(text: string, onChange: Function) {
  const byTaskId = {};
  text.split('\n').forEach(row => {
    const [taskId, type, scopeOrTitle, title] = row.split('|');
    const scope = title ? scopeOrTitle : '';
    byTaskId[taskId] = { type, scope };
  });
  onChange('meta', { byTaskId });
}

function evalJsFile(text: string, onChange: Function) {
  // @ts-ignore
  let temp = window.report;
  // @ts-ignore
  window.report = [];

  try {
    eval(text);
  } catch (e) {
    // error(`Файл отчёта содержит запрещенный символ.\nОткройте его в редакторе и проверьте.\n${e.stack}`)
    // @ts-ignore
    window.report = temp;
    return;
  }

  // @ts-ignore
  onChange('dump', window.report);
}

export function getOnDrop(setLoading: Function, onChange: Function) {
  return function dropFile(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const dropItems = [...(event?.dataTransfer?.items || [])]
      .map((file: any) => file.kind === 'file' ? file?.getAsFile() : null)
      .filter(file => file);

    setLoading(false);
    if (!dropItems.length) return;

    if (dropItems[0].type === 'application/json') {
      Promise.all(
        dropItems.map((file: any) => file.text()),
      ).then((text: string[]) => {
        const telegrammMessages = text
          .map(file => JSON.parse(file)?.messages)
          .flat(1);
        // @ts-ignore
        onChange('telegramm', telegrammMessages);
      });
      return;
    }

    Promise.all(
      dropItems.map((file: any) => file.text()),
    ).then((text: string[]) => {
      const sortedText = text
        .filter(file => file)
        .map((item: string) => ({ key: item.substring(13, 32), text: item }))
        .sort((a: any, b: any) => (a.key || '').localeCompare(b.key || ''))
        .map(item => item.text)
        .join('\n');

      evalJsFile(sortedText, onChange);
      return; // file.type
      if (text[0] === 'text/csv') evalCsvFile(text[0], onChange);
    });
  };
}

export function getShowDropZone(setLoading: Function) {
  return function showDropZone(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
  };
}
