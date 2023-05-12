import ICommit from 'ts/interfaces/Commit';

function getTypeAndScope(messageParts: string[], task: string) {
  if (messageParts.length < 2) return ['', ''];

  const [type, scope] = (messageParts.shift() || '')
    .replace(task, '')
    .split(/[()]/g)
    .map(v => v.trim());

  return (!type && scope)
    ? [scope, '']
    : [type, scope];
}

export default function getUserInfo(logString: string): ICommit {
  // "2021-02-09T12:59:17+03:00>Frolov Ivan>frolov@mail.ru>profile"
  const parts = logString.split('>');

  const sourceDate = parts.shift() || '';
  const date = new Date(sourceDate);
  const day = date.getDay() - 1;
  const timestamp = sourceDate.split('T')[0];

  const author = parts.shift()?.replace(/\./gm, ' ') || '';
  const email = parts.shift() || '';

  const message = parts.join('>');
  const task = (message.match(/(([A-Z]+-)|(#)|(gh-)|(GH-))([0-9]+)/gm) || [])[0] || ''; // ABC-123, #123, gh-123
  const messageParts = message.split(':');
  const [type, scope] = getTypeAndScope(messageParts, task);

  return {
    date: sourceDate,
    day: day < 0 ? 6 : day,
    dayInMonth: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    month: date.getMonth(),
    year: date.getUTCFullYear(),
    week: 0,
    timestamp,
    milliseconds: (new Date(timestamp)).getTime(),

    author,
    email,
    message,

    task,
    type: type || 'не подписан',
    scope: scope || 'неопределенна',

    changes: 0,
    added: 0,
    removed: 0,
  };
}