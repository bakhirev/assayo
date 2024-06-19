import ICommit, { COMMIT_TYPE, ISystemCommit } from 'ts/interfaces/Commit';

import { getTypeAndScope, getTask, getTaskNumber } from './getTypeAndScope';

export default function getCommitInfo(logString: string): ICommit | ISystemCommit {
  // "2021-02-09T12:59:17+03:00>Frolov Ivan>frolov@mail.ru>profile"
  const parts = logString.split('>');

  const sourceDate = parts.shift() || '';
  const date = new Date(sourceDate);
  const day = date.getDay() - 1;
  const timestamp = sourceDate.split('T')[0];

  const author = parts.shift()?.replace(/[._]/gm, ' ') || '';

  let email = parts.shift() || '';
  if (!(/@/gim).test(email)) email = '';

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

    text: '',
    type: '—',
    scope: '—',
    fileChanges: [],
  };

  const isSystemPR = message.indexOf('Pull request #') === 0;
  const isSystemMerge = message.indexOf('Merge pull request #') === 0;
  const isMerge = message.indexOf('Merge commit ') === 0
    || message.indexOf('Merge branch ') === 0
    || message.indexOf('Merge remote-tracking branch') === 0;
  const isAutoMerge = message.indexOf('Automatic merge from') === 0;
  const isSystemCommit = isSystemPR
    || isSystemMerge
    || isMerge
    || isAutoMerge;

  if (isSystemCommit) {
    let commitType = COMMIT_TYPE.MERGE;
    let prId, repository, branch, toBranch, task, taskNumber;
    if (isSystemMerge) {
      commitType = COMMIT_TYPE.PR_GITHUB;
      [, prId, repository, branch, toBranch ] = message
        .replace(/(Merge\spull\srequest\s#)|(\sfrom\s)|(\sin\s)|(\sto\s)/gim, ',')
        .split(',');
      task = getTask(branch);
    } else if (isSystemPR) {
      commitType = COMMIT_TYPE.PR_BITBUCKET;
      const messageParts = message.substring(14, Infinity).split(':');
      prId = messageParts.shift();
      task = getTask(messageParts.join(':'));
    } else if (isAutoMerge) {
      commitType = COMMIT_TYPE.AUTO_MERGE;
      [, branch, toBranch ] = message
        .replace(/(Automatic\smerge\sfrom\s)|(\s->\s)/gim, ',')
        .replace(/(Merge\sremote-tracking\sbranch\s')|('\sinto\s)/gim, ',')
        .split(',');
    }
    taskNumber = getTaskNumber(task);

    return {
      ...commonInfo,
      prId: prId || '',
      task: task || '',
      taskNumber: taskNumber || '',
      repository: repository || '',
      branch: branch || '',
      toBranch: toBranch || '',
      commitType,
    };
  }

  const textIndex = (message || '').indexOf(':');
  const text = textIndex > 1
    ? message.substring(textIndex + 2).trim()
    : message;
  const task = getTask(message);
  const taskNumber = getTaskNumber(task);
  const [type, scope] = getTypeAndScope(message, task);
  return {
    ...commonInfo,
    task,
    taskNumber,
    text,
    type: type || '—',
    scope: scope || '—',

    changes: 0,
    added: 0,
    removed: 0,
  };
}
