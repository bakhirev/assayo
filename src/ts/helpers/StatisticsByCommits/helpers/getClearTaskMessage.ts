export function getClearTaskMessage(
  originText: string,
  task: string,
  types: string[],
  scope: string[],
): string {
  const message = [task, types, scope]
    .flat()
    .filter(v => v)
    .reduce((text, item) => text.replaceAll(item, ''), originText || '')
    .replace(/[)(}{:#_-]+/gm, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return message.length > 150
    ? `${message.substring(0, 140)}...`
    : message;
}

export function getClearTaskMessages(
  messages: Set<string>,
  task: string,
  types: string[],
  scope: string[],
): string {
  const originText = Array.from(messages.values()).join(', ');
  return getClearTaskMessage(originText, task, types, scope);
}
