import { WeightedAverage } from 'ts/helpers/Math';

type TimeToMarket = {
  total: number;
  details: Record<string, number>;
};

export function getTimeToMarketForTask(task: any, prByName: any): TimeToMarket | undefined {
  const lastIndex = task.prIds.length - 1;
  if (lastIndex < 0) return;

  const firstPR = prByName.get(task.prIds[0]);
  const backlog = task.totalDaysInBacklog;

  const worked = firstPR?.daysWorkOnTask || 0;
  const review = firstPR?.daysInReview || 0;
  const release = firstPR?.daysAwaitRelease || 0;
  const total = worked + review + release;

  const simpleResponse = {
    total: backlog + total,
    details: { backlog, worked, review, release, improvements: 0 },
  };

  if (!lastIndex) return simpleResponse;

  const lastPR = prByName.get(lastIndex);
  const workedByTask = task?.totalDays;
  const reviewByLast = lastPR?.daysInReview || 0;
  const releaseByLast = lastPR?.daysAwaitRelease || 0;
  const improvements = (workedByTask + reviewByLast + releaseByLast) - total;

  if (improvements < 1) return simpleResponse;

  return {
    total: backlog + total + improvements,
    details: { backlog, worked, review, release, improvements },
  };
}

export function getMiddleTimeToMarketForTasks(tasks: any[], prByName: any) {
  const backlog = new WeightedAverage();
  const worked = new WeightedAverage();
  const review = new WeightedAverage();
  const release = new WeightedAverage();
  const improvements = new WeightedAverage();

  tasks.forEach((task: any) => {
    const timeToMarket = getTimeToMarketForTask(task, prByName);
    if (!timeToMarket) return;

    backlog.update(timeToMarket.details.backlog);
    worked.update(timeToMarket.details.worked);
    review.update(timeToMarket.details.review);
    release.update(timeToMarket.details.release);
    improvements.update(timeToMarket.details.improvements);
  });

  const details = {
    backlog: backlog.get() >> 0,
    worked: worked.get() >> 0,
    review: review.get() >> 0,
    release: release.get() >> 0,
    improvements: improvements.get() >> 0,
  };

  return {
    total: Object.values(details).reduce((a, b) => a + b, 0),
    details,
  };
}
