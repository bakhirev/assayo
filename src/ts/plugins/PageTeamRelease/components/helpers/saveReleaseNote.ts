import { downloadFile } from 'ts/helpers/File';
import { getDateForExcel } from 'ts/helpers/formatter';
import statisticStore from 'ts/store/Statistics';
import applicationConfig from 'ts/store/ApplicationConfig';

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

function getTextBeginningWithCapitalLetter(text?: string) {
  const formattedText = text || '';
  const firstSymbol = formattedText?.[0]?.toUpperCase() || '';
  return `${firstSymbol}${formattedText?.slice(1) || ''}`;
}

function getTaskDescription(pr: any, taskById: any) {
  const formattedMessage = pr.message || '';
  let message = formattedMessage.substring(formattedMessage.lastIndexOf(':') + 2)
    .replace(pr.task, '')
    .trim();

  const prefix = applicationConfig?.config?.prefixForTask || '/';
  const taskId = pr.task?.[0] === '#'
    ? pr.task.replace('#', '')
    : pr.task;
  const task = taskById.get(taskId);
  const formattedTask = task?.task || taskId;
  message = message.indexOf('pull request') !== -1
    ? (task?.comments || '')
    : message;
  if (!formattedTask && !message) return '';
  return `- [${formattedTask}](${prefix}${formattedTask}) ${getTextBeginningWithCapitalLetter(message)}`;
}

function getReleaseDescription(prs: any, taskById: any) {
  const types = groupByType(prs);
  return  Object.keys(types)
    .sort()
    .map((type: string) => {
      const tasks = types[type]
        .map((pr: any) => getTaskDescription(pr, taskById))
        .filter((v: string) => v)
        .join('\n');
      if (!type) return `\n${tasks}`;
      return `\n### ${type}\n${tasks}`;
    }).join('\n');
}

function getChangeLogString() {
  const rows = statisticStore.statisticsByCommits.release.totalInfo;
  const getPrByName = statisticStore.statisticsByCommits.pr.totalInfoByName;
  const list = rows.map((release: any) => {
    const date = getDateForExcel(release.dateMerge);
    const prs = release.prIds
      .map((prId: string) => getPrByName.get(prId))
      .filter((v: any) => v);
    const taskById = statisticStore.statisticsByCommits.tasks.totalInfoByName;
    const description = getReleaseDescription(prs, taskById);
    return `
## [${release.title}] - ${date}
${description}`;
  }).join('\n');

  return `# Change Log
${list}`;
}

export default function saveReleaseNote() {
  const content = getChangeLogString();
  const type = 'text/csv;charset=windows-utf-8;'; // utf-8;';
  const file = new Blob([content], { type });
  downloadFile(file, 'CHANGELOG.md');
}
