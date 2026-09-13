import { getBuilder, getWrapperWithCache } from 'ts/helpers/recommendations';
import statisticStore from 'ts/store/StatisticsByCommitsStore';

import { RECOMMENDATIONS } from './contstants';

const {
  getItem,
  getTitle,
  getArgTitleDescription,
} = getBuilder(RECOMMENDATIONS);

function getProjectType(workLazyTotal: number) {
  if (workLazyTotal < 1) return getItem('projectTypeOpenSource');

  if (workLazyTotal < 5) return getItem('projectTypeEasy');

  return null;
}

function getTotalInfo() {
  const statisticsByCommits = statisticStore.statisticsByCommits;
  const worker: string[] = [];
  const dismissed: string[] = [];
  const staff: string[] = [];
  const lotOfLazy: string[] = [];
  const manyLazy: string[] = [];
  const oneTypeMans: string[] = [];
  let workLazyTotal = 1;

  statisticsByCommits.author.list.forEach((name: string) => {
    const author = statisticsByCommits.author.totalInfoByName.get(name);
    if (author.isStaff) {
      staff.push(name);
      return;
    }

    if (author.isDismissed) {
      dismissed.push(name);
      return;
    }

    worker.push(name);

    const workLazy = author.totalDaysWithCommits / author.totalDaysWithoutCommits;
    if (workLazy >= 0 && workLazy < 3) lotOfLazy.unshift(name);
    if (workLazy >= 3 && workLazy < 5) manyLazy.unshift(name);
    workLazyTotal = workLazyTotal * workLazy;

    // TODO: Что это за число? Я не помню
    const someNumber = Object.values(author.types).sort().pop() as number;
    const typePercent = (someNumber * 100) / author.commits;
    if (typePercent >= 70) oneTypeMans.unshift(name);
  });

  workLazyTotal = workLazyTotal ** (1 / worker.length);
  const projectType = getProjectType(workLazyTotal);

  return [
    projectType,

    (lotOfLazy.length ? getArgTitleDescription('lotOfLazy', { count: lotOfLazy.length }, { list: lotOfLazy.join(';\n- ') }) : null),
    (manyLazy.length ? getArgTitleDescription('manyLazy', { count: manyLazy.length }, { list: manyLazy.join(';\n- ') }) : null),
    (oneTypeMans.length ? getTitle('oneTypeMans', oneTypeMans) : null),
    (worker.length ? getArgTitleDescription('workToday', { count: worker.length }, { list: worker.join(';\n- ') }) : null),
    (dismissed.length ? getArgTitleDescription('dismissed', { count: dismissed.length }, { list: dismissed.join(';\n- ') }) : null),
    (staff.length ? getArgTitleDescription('staff', { count: staff.length }, { list: staff.join(';\n- ') }) : null),

    // ['Планирование', 'Задачи распределены довольно равномерно', 'info'],
    getItem('manager'),
    getItem('shorTalk'),
    getItem('ipr'),
    getItem('oneToOne'),
    getItem('club'),
  ].filter(item => item);
}

const getRecommendations = getWrapperWithCache(getTotalInfo);

export default getRecommendations;
