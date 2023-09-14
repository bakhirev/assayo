import ICommit, { COMMIT_TYPE, ISystemCommit } from 'ts/interfaces/Commit';

import { getTypeAndScope, getTask, getTaskNumber } from './getTypeAndScope';

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
  const isAutoMerge = message.indexOf('Merge branch ') === 0
    || message.indexOf('Merge remote-tracking branch') === 0
    || message.indexOf('Merge commit ') === 0
    || message.indexOf('Automatic merge from') === 0;
  const isSystemCommit = isSystemPR
    || isSystemMerge
    || isAutoMerge;

  if (isSystemCommit) {
    let commitType = COMMIT_TYPE.AUTO_MERGE;
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

  const task = getTask(message);
  const taskNumber = getTaskNumber(task);
  const [type, scope] = getTypeAndScope(message, task);
  return {
    ...commonInfo,
    task,
    taskNumber,
    type: type || 'не подписан',
    scope: scope || 'неопределенна',

    changes: 0,
    added: 0,
    removed: 0,
  };
}