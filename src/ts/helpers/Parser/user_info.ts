import ICommit, { COMMIT_TYPE, ISystemCommit } from 'ts/interfaces/Commit';

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

// ABC-123, #123, gh-123
function getTask(message: string) {
  return ((message || '').match(/(([A-Z]+-)|(#)|(gh-)|(GH-))([0-9]+)/gm) || [])[0] || '';
}

export default function getUserInfo(logString: string): ICommit | ISystemCommit {
  // "2021-02-09T12:59:17+03:00>Frolov Ivan>frolov@mail.ru>profile"
  const parts = logString.split('>');

  const sourceDate = parts.shift() || '';
  const date = new Date(sourceDate);
  const day = date.getDay() - 1;
  const timestamp = sourceDate.split('T')[0];

  const author = parts.shift()?.replace(/\./gm, ' ') || '';
  const email = parts.shift() || '';

  const message = parts.join('>');

  const commonInfo: any = {
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

    type: 'не подписан',
    scope: 'неопределенна',
  };

  const isSystemPR = message.indexOf('Pull request #') === 0;
  const isSystemMerge = message.indexOf('Merge pull request #') === 0;
  const fromGitHubToBitBucket = message.indexOf('Merge branch ') === 0;
  const isSystemCommit = isSystemPR
    || isSystemMerge
    || fromGitHubToBitBucket
    || message.indexOf('Automatic merge from') === 0;

  if (isSystemCommit) {
    let commitType = COMMIT_TYPE.AUTO_MERGE;
    let prId, repository, branch, toBranch, task;
    if (isSystemMerge) {
      commitType = COMMIT_TYPE.MERGE;
      [, prId, repository, branch, toBranch ] = message
        .replace(/(Merge\spull\srequest\s#)|(\sfrom\s)|(\sin\s)|(\sto\s)/gim, ',')
        .split(',');
      task = getTask(branch);
    } else if (isSystemPR) {
      commitType = COMMIT_TYPE.PR;
      const messageParts = message.substring(14, Infinity).split(':');
      prId = messageParts.shift();
      task = getTask(messageParts.join(':'));
    }

    return {
      ...commonInfo,
      prId: prId || '',
      task: task || '',
      repository: repository || '',
      branch: branch || '',
      toBranch: toBranch || '',
      commitType,
    };
  }

  const messageParts = message.split(':');
  const task = getTask(message);
  const [type, scope] = getTypeAndScope(messageParts, task);
  return {
    ...commonInfo,
    task,
    type: type || 'не подписан',
    scope: scope || 'неопределенна',

    changes: 0,
    added: 0,
    removed: 0,
  };
}