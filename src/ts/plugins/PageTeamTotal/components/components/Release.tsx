import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { If, Title, CardWithIcon, Section, SectionColumn } from 'ts/components/Layout';

import statisticStore from 'ts/store/Statistics';
import { PieChart } from 'ts/components/Charts';
import { getMiddleTimeToMarketForTasks } from 'ts/helpers/StatisticsByCommits/helpers/timeToMarket';

const Release = observer((): React.ReactElement | null => {
  const releaseCount = statisticStore.statisticsByCommits.release.totalInfo?.length;
  const prByName = statisticStore.statisticsByCommits.pr.totalInfoByName;
  const tasks = statisticStore.statisticsByCommits.tasks.totalInfo;
  const normalTasks = useMemo(() => (
    tasks.filter((task: any) => task.totalDaysInBacklog <= 90)
  ), [statisticStore.hash]);
  const timeToMarket = getMiddleTimeToMarketForTasks(normalTasks, prByName);
  const [backlog, worked, review, release, improvements] = [
    'plugin.team_tasks.charts.timeToMarket.backlog',
    'plugin.team_tasks.charts.timeToMarket.worked',
    'plugin.team_tasks.charts.timeToMarket.review',
    'plugin.team_tasks.charts.timeToMarket.release',
    'plugin.team_tasks.charts.timeToMarket.improvements',
  ];

  const fromCommitToRelease = timeToMarket.details.worked + timeToMarket.details.review + timeToMarket.details.release;

  if (!releaseCount && !timeToMarket.total) return null;

  return (
    <>
      <Title title="plugin.team_total.release.title"/>
      <Section>
        <SectionColumn>
          <If value={releaseCount}>
            <CardWithIcon
              value={releaseCount}
              icon="./assets/cards/release.svg"
              title="plugin.team_total.release.total.title"
              description="plugin.team_total.release.total.description"
            />
            <CardWithIcon
              value={fromCommitToRelease}
              icon="./assets/cards/release_month.svg"
              title="plugin.team_tasks.charts.cardFromCommit.title"
              description="plugin.team_tasks.charts.cardFromCommit.description"
            />
          </If>
        </SectionColumn>
        <SectionColumn>
          <PieChart
            title="plugin.team_tasks.charts.timeToMarket.title"
            value={timeToMarket?.total}
            details={timeToMarket?.details ? {
              [backlog]: timeToMarket?.details?.backlog,
              [worked]: timeToMarket?.details?.worked,
              [review]: timeToMarket?.details?.review,
              [release]: timeToMarket?.details?.release,
              [improvements]: timeToMarket?.details?.improvements,
            } : undefined}
            limit={1}
            order={[backlog, worked, review, release, improvements]}
            description="common.statistic.days"
            suffix="common.statistic.days"
          />
        </SectionColumn>
      </Section>
    </>
  );
});

export default Release;
