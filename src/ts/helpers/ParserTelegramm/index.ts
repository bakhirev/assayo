import ICommit from 'ts/interfaces/Commit';

import getUserInfo from './user_info';
import settingsStore from 'ts/store/Settings';

export default function ParserTelegramm(
  messages: any[],
  parseCommit: Function,
) {
  const commits: ICommit[] = [];
  let week: number = 0;
  let weekEndTime: number = 0;

  let prev = null;

  for (let i = 0, l = messages.length; i < l; i += 1) {
    const message = messages[i];
    if (!message?.text) continue;

    if (prev) parseCommit(prev);
    const next = getUserInfo(message);
    if (next.milliseconds > weekEndTime) {
      week += 1;
      weekEndTime = next.milliseconds + (settingsStore.ONE_DAY * (6 - next.day));
    }
    // @ts-ignore
    next.week = week;

    prev = next;
    commits.push(prev);
  }
  if (prev) parseCommit(prev);

  return {
    commits,
    fileList: [],
    fileTree: {
      id: Math.random(),
      name: '',
      content: {},
    },
  };
}
