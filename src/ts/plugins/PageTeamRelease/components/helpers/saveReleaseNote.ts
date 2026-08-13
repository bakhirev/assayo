import { downloadFile } from 'ts/helpers/File';
import { getDateForExcel, getStringWithCapitalLetter } from 'ts/helpers/formatter';
import statisticStore from 'ts/store/StatisticsByCommitsStore';
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

function getTaskDescription(pr: any, taskById: any) {
  const taskId = pr.task?.[0] === '#'
    ? pr.task.replace('#', '')
    : pr.task;
  const task = taskById.get(taskId);

  const formattedMessage = pr.message || '';
  let message = formattedMessage.substring(formattedMessage.lastIndexOf(':') + 2)
    .replace(pr.task, '')
    .trim() || task?.description || '';

  const prefix = applicationConfig?.config?.prefixForTask || '/';
  const formattedTask = task?.task || taskId;
  message = message.indexOf('pull request') !== -1
    ? (task?.comments || '')
    : message;
  if (!formattedTask && !message) return '';
  return `- [${formattedTask}](${prefix}${formattedTask}) ${getStringWithCapitalLetter(message)}`;
}

function getReleaseDescription(prs: any, taskById: any) {
  const types = groupByType(prs);
  return  Object.keys(types)
    .sort()
    .map((type: string) => {
      const tasks = types[type]
        .map((pr: any) => getTaskDescription(pr, taskById))
        .filter((v: string) => v);
      const formattedTasks = Array.from(new Set(tasks)).join('\n');
      if (!type) return `\n${formattedTasks}`;
      return `\n### ${type}\n${formattedTasks}`;
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
