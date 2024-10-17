import { downloadFile } from 'ts/helpers/File';
import { getDateForExcel } from 'ts/helpers/formatter';
import dataGripStore from 'ts/store/DataGrip';
import userSettings from 'ts/store/UserSettings';

function groupByType(prs: any[]) {
  return prs.reduce((acc: any, item: any) => {
    const type = item.type || '';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {});
}

function getTaskDescription(pr: any) {
  const message = pr.message.substring(pr.message.lastIndexOf(':') + 2)
    .replace(pr.task, '')
    .trim();
  const prefix = userSettings?.settings?.linksPrefix?.task || '/';
  const formattedTask = pr.task?.[0] === '#'
    ? pr.task.replace('#', '')
    : pr.task;
  return `- [${formattedTask}](${prefix}${formattedTask}) ${message}`;
}

function getReleaseDescription(prs: any) {
  const types = groupByType(prs);
  return  Object.keys(types)
    .sort()
    .map((type: string) => {
      const tasks = types[type].map(getTaskDescription).join('\n');
      if (!type) return `\n${tasks}`;
      return `\n### ${type}\n${tasks}`;
    }).join('\n');
}

function getChangeLogString() {
  const rows = dataGripStore.dataGrip.release.statistic;
  const list = rows.map((release: any) => {
    const date = getDateForExcel(release.lastCommit.date);
    const prs = release.pr
      .map((prId: string) => dataGripStore.dataGrip.pr.pr.get(prId))
      .filter((v: any) => v);
    const description = getReleaseDescription(prs);
    return `
## [${release.title}] - ${date}
${description}`;
  }).join('\n');

  return `# Change Log
${list}`;
}

export default function saveChangeLog() {
  const content = getChangeLogString();
  const type = 'text/csv;charset=windows-utf-8;'; // utf-8;';
  const file = new Blob([content], { type });
  downloadFile(file, 'CHANGELOG.md');
}
