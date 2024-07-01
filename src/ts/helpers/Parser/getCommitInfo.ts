import ICommit, { COMMIT_TYPE, ISystemCommit } from 'ts/interfaces/Commit';
import IHashMap from 'ts/interfaces/HashMap';

import { getTypeAndScope, getTask, getTaskNumber } from './getTypeAndScope';

const MASTER_BRANCH = {
  master: true,
  dev: true,
  develop: true,
};

let prevDate = new Date();

export default function getCommitInfo(
  logString: string,
  refEmailAuthor: IHashMap<string>,
): ICommit | ISystemCommit {
  // "2021-02-09T12:59:17+03:00>Frolov Ivan>frolov@mail.ru>profile"
  const parts = logString.split('>');

  const sourceDate = parts.shift() || '';
  let date = new Date(sourceDate);
  if (isNaN(date.getDay())) {
    console.log(`PARSE ERROR: Date parse error for: "${logString}"`);
    date = prevDate;
  }
  prevDate = date;
  const day = date.getDay() - 1;
  const timestamp = sourceDate.split('T')[0];

  let author = parts.shift()?.replace(/[._]/gm, ' ') || '';
  let email = parts.shift() || '';
  if (!(/@/gim).test(email)) email = '';

  const authorID = author.replace(/\s|\t/gm, '');
  if (authorID && refEmailAuthor[authorID] && refEmailAuthor[authorID] !== author) {
    console.log(`PARSE WARNING: Rename "${author}" to "${refEmailAuthor[authorID]}"`);
    author = refEmailAuthor[authorID];
  }

  if (email && refEmailAuthor[email] && refEmailAuthor[email] !== author) {
    console.log(`PARSE WARNING: Rename "${author}" to "${refEmailAuthor[email]}" by "${email}"`);
    author = refEmailAuthor[email];
  }

  if (author && refEmailAuthor[author] && refEmailAuthor[author] !== email) {
    console.log(`PARSE WARNING: Rename "${email}" to "${refEmailAuthor[author]}" by "${author}"`);
    email = refEmailAuthor[author];
  }

  refEmailAuthor[email] = author;
  refEmailAuthor[author] = email;
  refEmailAuthor[authorID] = author;

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

  const isBitbucketPR = message.indexOf('Pull request #') === 0;
  const isGithubPR = message.indexOf('Merge pull request #') === 0;
  const isGitlabPR = message.indexOf('Merge branch ') === 0;
  const isMerge = message.indexOf('Merge commit ') === 0
    || message.indexOf('Merge remote-tracking branch') === 0;
  const isAutoMerge = message.indexOf('Automatic merge from') === 0;
  const isSystemCommit = isBitbucketPR
    || isGithubPR
    || isMerge
    || isGitlabPR
    || isAutoMerge;

  if (isSystemCommit) {
    let commitType = COMMIT_TYPE.MERGE;
    let prId, repository, branch, toBranch, task, taskNumber;
    if (isGithubPR) {
      commitType = COMMIT_TYPE.PR_GITHUB;
      [, prId, repository, branch, toBranch ] = message
        .replace(/(Merge\spull\srequest\s#)|(\sfrom\s)|(\sin\s)|(\sto\s)/gim, ',')
        .split(',');
      task = getTask(branch);
    } else if (isBitbucketPR) {
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
    } else if (isGitlabPR) {
      commitType = COMMIT_TYPE.PR_GITLAB;
      [, branch, toBranch ] = message
        .replace(/'/gim, '')
        .replace(/(Merge\sbranch\s)|(\sinto\s)/gim, ',')
        .split(',');
      if (toBranch && MASTER_BRANCH[toBranch]) {
        task = getTask(branch) || `#${getTaskNumber(branch)}`;
        prId = task;
      }
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
