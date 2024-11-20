import ICommit, { COMMIT_TYPE, ISystemCommit } from 'ts/interfaces/Commit';

import {
  getTypeAndScope,
  getTask,
  getTaskNumber,
  getTaskCode,
} from './getTypeAndScope';
import { getGithubPrInfo, getGitlabPrInfo } from './getMergeInfo';
import getEmailAuthor from './getEmailAuthor';

const MASTER_BRANCH = {
  master: true,
  dev: true,
  develop: true,
};

let prevDate = new Date();
// TODO: add limit for date in future or past
// const MIN_DATE = new Date('01-01-2000');
// const MAX_DATE = prevDate;

let refTimestampTime = new Map();

export function clearCache() {
  prevDate = new Date();
  refTimestampTime.clear();
}

export default function getCommitInfo(logString: string): ICommit | ISystemCommit {
  // "2021-02-09T12:59:17+03:00>Frolov Ivan>frolov@mail.ru>profile"
  const parts = logString.split('>');

  const sourceDate = parts[0] || '';
  let date = new Date(sourceDate);
  if (isNaN(date.getDay())) {
    // console.log(`PARSE ERROR: Date parse error for: "${logString}"`);
    date = prevDate;
  }
  prevDate = date;
  const day = date.getDay() - 1;
  const timestamp = sourceDate.substring(0, 10); // split('T')[0];
  const timezone = sourceDate.substring(19, 25);
  let milliseconds = refTimestampTime.get(timestamp);
  if (!milliseconds) {
    milliseconds = (new Date(timestamp)).getTime();
    refTimestampTime.set(timestamp, milliseconds);
  }

  const {
    author,
    email,
    device,
    company,
    country,
  } = getEmailAuthor(parts, timezone);

  // performance
  const message = logString.substring(parts[0]?.length + parts[1]?.length + parts[2]?.length + 3);

  const commonInfo: any = {
    date: sourceDate,
    day: day < 0 ? 6 : day,
    dayInMonth: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    month: date.getMonth(),
    year: date.getUTCFullYear(),
    week: 0,
    timezone,
    timestamp,
    milliseconds,

    author,
    email,
    message,
    company,
    country,
    device,

    text: '',
    type: '',
    scope: '',
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
    let prId, repository, branch, toBranch, task, taskNumber, type, scope;
    if (isGithubPR) {
      // "Merge pull request #3 in repository from TASK-123-add-profile to master"
      // "Merge pull request #3 from facebook/compiler"
      commitType = COMMIT_TYPE.PR_GITHUB;
      [prId, repository, branch, toBranch] = getGithubPrInfo(message);
      task = getTask(branch);

    } else if (isBitbucketPR) { // "Pull request #3: TASK-123 fix: Add profile"
      commitType = COMMIT_TYPE.PR_BITBUCKET;
      const messageParts = message.substring(14).split(':');
      prId = messageParts.shift();
      const description = messageParts.join(':');
      task = getTask(description);
      [type, scope] = getTypeAndScope(description, task);

    } else if (isAutoMerge) { // "Automatic merge from release/release-2.8.0 -> master"
      commitType = COMMIT_TYPE.AUTO_MERGE;
      [, branch, toBranch ] = message
        .replace(/(Automatic\smerge\sfrom\s)|(\s->\s)/gim, ',')
        .replace(/(Merge\sremote-tracking\sbranch\s')|('\sinto\s)/gim, ',')
        .split(',');

    } else if (isGitlabPR) {
      commitType = COMMIT_TYPE.PR_GITLAB;
      [branch, toBranch] = getGitlabPrInfo(message);
      if (toBranch && MASTER_BRANCH[toBranch]) {
        task = getTask(branch);
        taskNumber = getTaskNumber(branch);
        prId = `#${taskNumber}-${Math.random()}`;
        if (!task && taskNumber) task = `#${taskNumber}`;
      }
    }
    taskNumber = getTaskNumber(task);
    const taskCode = getTaskCode(task);

    return {
      ...commonInfo,
      type,
      scope,
      prId: prId || '',
      task: task || '',
      taskNumber: taskNumber || '',
      taskCode,
      repository: repository || '',
      branch: branch || '',
      toBranch: toBranch || '',
      commitType,
    };
  } else {
    const textIndex = (message || '').indexOf(':');
    const text = textIndex > 1
      ? message.substring(textIndex + 2).trim()
      : message;
    const task = getTask(message);
    const taskNumber = getTaskNumber(task);
    const taskCode = getTaskCode(task);
    const [type, scope] = getTypeAndScope(message, task);
    return {
      ...commonInfo,
      task,
      taskNumber,
      taskCode,
      text,
      type: type || '',
      scope: scope || '',

      changes: 0,
      added: 0,
      removed: 0,
    };
  }
}
