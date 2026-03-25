import IHashMap from 'ts/interfaces/HashMap';

import getAchievementByAuthor from './byAuthor';
import getAchievementByFile from './byFile';

class AchievementsByAuthor {
  authors: IHashMap<string[]> = {};

  addAuthor(name: string) {
    this.authors[name] = [];
  }

  add(
    authors: Array<[string, number]>,
    maxAchievementCode?: string,
    minAchievementCode?: string,
  ) {
    const first = authors?.[0]?.[0];
    if (!first) return;
    if (maxAchievementCode) {
      this.authors?.[first]?.push(maxAchievementCode);
    }
    if (minAchievementCode) {
      const last = authors?.[authors.length - 1]?.[0];
      this.authors?.[last]?.push(minAchievementCode);
    }
  }
}

class AchievementsByCompetition {
  authors: IHashMap<Array<string[]>> = {};

  updateByGrip(statisticsByCommits: any, statisticsByFiles: any) {
    const statisticByAuthor = statisticsByCommits.author.totalInfo;
    const byAuthor: any = new AchievementsByAuthor();
    const total  = this.#getMinMaxValue(statisticByAuthor, statisticsByCommits, (statistic: any) => {
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
    byAuthor.add(total.firstCommit, null, 'adam');

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

    // Авиасейлс
    byAuthor.add(total.manyTimeZone, 'moreChangeTimeZone');

    // Первый и последний коммит
    const lastAuthor = statisticsByCommits.firstLastCommit.maxData.author;
    const firstAuthor = statisticsByCommits.firstLastCommit.minData.author;
    if (firstAuthor === lastAuthor) {
      byAuthor.authors[firstAuthor].push('firstLastCommit');
    } else {
      byAuthor.authors[firstAuthor].push('firstCommit');
      byAuthor.authors[lastAuthor].push('lastCommit');
    }

    getAchievementByFile(statisticsByFiles, byAuthor);

    statisticByAuthor.forEach((statistic: any) => {
      const achievements = byAuthor.authors[statistic.author];
      this.authors[statistic.author] = getAchievementByAuthor(achievements, statisticsByCommits, statistic.author);
    });
  }

  #getMinMaxValue(statisticByAuthor: any, statisticsByCommits: any, callback: Function) {
    const total: IHashMap<any> = {};

    statisticByAuthor.forEach((statistic: any) => {
      callback(statistic);

      const addData = (property: string, count?: number) => {
        if (!total[property]) total[property] = [];
        total[property].push([statistic.author, count || 0]);
      };

      addData('nameLength', statistic.author.length);
      addData('messageLength', statistic.maxMessageLength);
      addData('midMessageLength', statistic.middleMessageLength);
      addData('tasks', statistic.totalTasks);
      addData('days', statistic.totalDaysWithCommits);
      addData('moreRefactoring', statistic.types.refactor);

      if (statistic.countries) {
        const notBritish = statistic.countries
          .filter((country: any) => country.timezone !== '+00:00');
        addData('manyTimeZone', notBritish.length);
      }

      const byTimestamp = statisticsByCommits.timestamp.totalInfoByName[statistic.author];
      addData('tasksInDay', byTimestamp.tasksByTimestampCounter.max);
      addData('commitsInDay', byTimestamp.commitsByTimestampCounter.max);

      const byPr = statisticsByCommits.pr.totalInfoByName[statistic.author] || {};
      addData('moreLongWaitPR', byPr?.maxDelayDays);
      addData('morePRMerge', byPr?.numberMergedPr);

      if (statistic.isStaff) return;
      addData('allDaysInProject', statistic.totalDays);
      addData('lazyDays', statistic.totalDaysWithoutCommits);
      addData('firstCommit', statistic.firstCommit);
    });

    Object.keys(total).forEach(achievement => {
      total[achievement].sort((a: any, b: any) => b[1] - a[1]);
    });

    return total;
  }
}

const achievements = new AchievementsByCompetition();

export default achievements;
