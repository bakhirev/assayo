import type Filter from 'ts/components/Layout/Search/interfaces/Filter';

import { downloadFile } from 'ts/helpers/File';
import { getDate, getDateByTimestamp, getStringWithCapitalLetter } from 'ts/helpers/formatter';
import statisticStore from 'ts/store/StatisticsByCommitsStore';
import applicationConfig from 'ts/store/ApplicationConfig';

import { useTranslation } from 'ts/components/Translation';
import { getTimeOnTask } from 'ts/components/TempoByTable/helpers';

function getWorkLogString(days: any[], author?: string) {
  const authors = statisticStore.statisticsByCommits.author.list as string[];
  const totalInfoByName = statisticStore.statisticsByCommits.tasks.totalInfoByName;
  const prefix = applicationConfig?.config?.prefixForTask || '/';
  const list: any = [];

  days.forEach((dayInfo: any) => {
    const [date, day] = getDateByTimestamp(dayInfo.timestamp);
    list.push(`\n## ${date} (${day})`);

    authors.forEach((taskAuthor) => {
      if (author && taskAuthor !== author) return;
      const tasks = Object.keys(dayInfo.tasksByAuthor[taskAuthor] || {});
      if (!tasks?.length) return;

      if (!author) {
        list.push(`\n**${taskAuthor}:**`);
      }

      const timeOnTask = getTimeOnTask(tasks);
      tasks.forEach((task, index) => {
        const info = totalInfoByName.get(task);
        list.push(`— [${task}](${prefix}${task}) (${timeOnTask[index]}h) ${getStringWithCapitalLetter(info?.description)};`);
      });
    });
  });

  return `# Work days\n${list.join('\n')}`;
}

function getFileName(filters?: Filter) {
  const { text } = useTranslation();
  const from = getDate(filters?.from);
  const to = getDate(filters?.to);
  const prefix = document.title;
  const suffix = text('plugin.team_day.download');
  return filters?.author
    ? `${prefix} - ${suffix} ${filters?.author || ''} (${from} - ${to}).md`
    : `${prefix} - ${suffix} (${from} - ${to}).md`;
}

export default function saveWorkLog(days: any[], filters?: Filter) {
  const content = getWorkLogString(days);
  const type = 'text/csv;charset=windows-utf-8;'; // utf-8;';
  const file = new Blob([content], { type });
  const fileName = getFileName(filters);
  downloadFile(file, fileName);
}
