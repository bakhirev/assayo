import IHashMap from 'ts/interfaces/HashMap';

import getAchievementByAuthor from './byAuthor';
import getAchievementByFile from './byFile';

class AchievementsByAuthor {
  authors: IHashMap<string[]> = {};

  addAuthor(name: string) {
    this.authors[name] = [];
  }

  add(authors: Array<[string, number]>, maxAchievementCode: string, minAchievementCode?: string) {
    const first = authors?.[0]?.[0];
    if (!first) return;
    this.authors?.[first]?.push(maxAchievementCode);

    if (!minAchievementCode) return;
    const last = authors?.[authors.length - 1]?.[0];
    this.authors?.[last]?.push(minAchievementCode);
  }
}

class AchievementsByCompetition {
  authors: IHashMap<Array<string[]>> = {};

  updateByGrip(dataGrip: any, fileGrip: any) {
    const statisticByAuthor = dataGrip.author.statistic;
    const byAuthor: any = new AchievementsByAuthor();
    const total  = this.#getMinMaxValue(statisticByAuthor, dataGrip, (statistic: any) => {
      byAuthor.addAuthor(statistic.author);
    });

    // Длина имени
    byAuthor.add(total.nameLength, 'longestName', 'shortestName');

    // Длина сообщения
    byAuthor.add(total.messageLength, 'longestMessage');

    // Средняя длина сообщения
    byAuthor.add(total.midMessageLength, 'everyMessageLong', 'everyMessageShort');

    // Количество закрытых задач
    byAuthor.add(total.tasks, 'moreTasks', 'lessTasks');

    // Количество дней с коммитами
    byAuthor.add(total.days, 'moreWorkDays', 'lessWorkDays');

    // Количество дней без коммитов
    byAuthor.add(total.lazyDays, 'moreLazyDays', 'lessLazyDays');

    // Количество дней на проекте
    byAuthor.add(total.allDaysInProject, 'moreDaysInProject', 'lessDaysInProject');

    // Дата первого коммита
    byAuthor.add(total.firstCommit, 'adam');

    // Количество метки «рефакторинг»
    byAuthor.add(total.moreRefactoring, 'moreRefactoring');

    // Количество закрытых задач в день
    byAuthor.add(total.tasksInDay, 'moreTasksInDay');

    // Количество коммитов в день
    byAuthor.add(total.commitsInDay, 'moreCommits');

    // Таможня даёт добро
    byAuthor.add(total.morePRMerge, 'morePRMerge');

    // Давным давно, в далёкой галактике
    byAuthor.add(total.moreLongWaitPR, 'moreLongWaitPR');

    // Первый и последний коммит
    const lastAuthor = dataGrip.firstLastCommit.maxData.author;
    const firstAuthor = dataGrip.firstLastCommit.minData.author;
    if (firstAuthor === lastAuthor) {
      byAuthor.authors[firstAuthor].push('firstLastCommit');
    } else {
      byAuthor.authors[firstAuthor].push('firstCommit');
      byAuthor.authors[lastAuthor].push('lastCommit');
    }

    getAchievementByFile(fileGrip, byAuthor);

    statisticByAuthor.forEach((statistic: any) => {
      const achievements = byAuthor.authors[statistic.author];
      this.authors[statistic.author] = getAchievementByAuthor(achievements, dataGrip, statistic.author);
    });
  }

  #getMinMaxValue(statisticByAuthor: any, dataGrip: any, callback: Function) {
    const total: IHashMap<any> = {};

    statisticByAuthor.forEach((statistic: any) => {
      callback(statistic);

      const addData = (property: string, count?: number) => {
        if (!total[property]) total[property] = [];
        total[property].push([statistic.author, count || 0]);
      };

      addData('nameLength', statistic.author.length);
      addData('messageLength', statistic.messageLength[statistic.messageLength.length - 1]);
      addData('midMessageLength', statistic.middleMessageLength);
      addData('tasks', statistic.tasks.length);
      addData('days', statistic.days);
      addData('moreRefactoring', statistic.types.refactor);

      const byTimestamp = dataGrip.timestamp.statisticByAuthor[statistic.author];
      addData('tasksInDay', byTimestamp.tasksByTimestampCounter.max);
      addData('commitsInDay', byTimestamp.commitsByTimestampCounter.max);

      const byPr = dataGrip.pr.statisticByName[statistic.author] || {};
      addData('moreLongWaitPR', byPr?.maxDelayDays);
      addData('morePRMerge', byPr?.numberMergedPr);

      if (statistic.isStaff) return;
      addData('allDaysInProject', statistic.allDaysInProject);
      addData('lazyDays', statistic.lazyDays);
      addData('firstCommit', statistic.firstCommit.milliseconds);
    });

    Object.keys(total).forEach(achievement => {
      total[achievement].sort((a: any, b: any) => b[1] - a[1]);
    });

    return total;
  }
}

const achievements = new AchievementsByCompetition();

export default achievements;
