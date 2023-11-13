// function evalCsvFile(text: string, onChange: Function) {
//   const byTaskId = {};
//   text.split('\n').forEach(row => {
//     const [taskId, type, scopeOrTitle, title] = row.split('|');
//     const scope = title ? scopeOrTitle : '';
//     byTaskId[taskId] = { type, scope };
//   });
//   onChange('meta', { byTaskId });
// }

export function getStringsForParser(text: string) {
  // @ts-ignore
  let temp = window.report; // @ts-ignore
  window.report = [];
  const firstText = text.slice(0, 12);
  if (firstText === 'report.push(') {
    try {
      eval(text);
    } catch (e) {
      // error(`Файл отчёта содержит запрещенный символ.\nОткройте его в редакторе и проверьте.\n${e.stack}`)
      // @ts-ignore
      window.report = temp;
      return;
    }
  } else { // @ts-ignore
    window.report = text.split('\n');
  }

  // @ts-ignore
  return window.report;
}

export async function getStringFromFileList(files: any) {
  const text: string[] = await Promise.all(
    files.map((file: any) => file.text()),
  );

  return text
    .filter(file => file)
    .map((item: string) => ({ key: item.substring(13, 32), text: item }))
    .sort((a: any, b: any) => (a.key || '').localeCompare(b.key || ''))
    .map(item => item.text)
    .join('\n');
}

export function getOnDrop(setLoading: Function, onChange: Function) {
  return async function dropFile(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const files = [...(event?.dataTransfer?.items || [])]
      .map((file: any) => file.kind === 'file' ? file?.getAsFile() : null)
      .filter(file => file);

    setLoading(false);
    if (!files.length) return;

    const text = await getStringFromFileList(files);
    const report = getStringsForParser(text);
    onChange('dump', report);
  };
}

export function getShowDropZone(setLoading: Function) {
  return function showDropZone(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
  };
}
