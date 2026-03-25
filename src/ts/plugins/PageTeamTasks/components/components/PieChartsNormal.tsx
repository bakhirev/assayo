import React from 'react';
import { observer } from 'mobx-react-lite';

import { If, CardWithIcon, Description, Section, SectionColumn } from 'ts/components/Layout';
import { PieChart } from 'ts/components/Charts';
import { getGroupsBy } from 'ts/helpers/charts';
import { getMiddleTimeToMarketForTasks } from 'ts/helpers/StatisticsByCommits/helpers/timeToMarket';
import statisticStore from 'ts/store/Statistics';

interface PieChartsProps {
  content: any[],
}

const [getGroupsByYears, yearOrder] = getGroupsBy('years');

const PieCharts = observer(({ content }: PieChartsProps): React.ReactElement | null => {
  if (!content?.length) return null;

  const releaseCount = statisticStore.statisticsByCommits.release.totalInfo?.length;
  const prByName = statisticStore.statisticsByCommits.pr.totalInfoByName;
  const timeToMarket = getMiddleTimeToMarketForTasks(content, prByName);
  const [backlog, worked, review, release, improvements] = [
    'plugin.team_tasks.charts.timeToMarket.backlog',
    'plugin.team_tasks.charts.timeToMarket.worked',
    'plugin.team_tasks.charts.timeToMarket.review',
    'plugin.team_tasks.charts.timeToMarket.release',
    'plugin.team_tasks.charts.timeToMarket.improvements',
  ];
  const fromCommitToRelease = timeToMarket.details.worked + timeToMarket.details.review + timeToMarket.details.release;

  const totalDetails = getGroupsByYears(content, 'totalDays')?.details;
  const workedDetails = getGroupsByYears(content, 'totalDaysWorked')?.details;

  return (
    <>
      <Section>
        <SectionColumn>
          <CardWithIcon
            value={content?.length}
            icon="./assets/cards/tasks.svg"
            title="plugin.team_tasks.charts.cardTotal.title"
            description="plugin.team_tasks.charts.cardTotal.description"
          />
          <If value={releaseCount}>
            <CardWithIcon
              value={fromCommitToRelease}
              icon="./assets/cards/release_month.svg"
              title="plugin.team_tasks.charts.cardFromCommit.title"
              description="plugin.team_tasks.charts.cardFromCommit.description"
            />
          </If>
        </SectionColumn>
        <SectionColumn>
          <If value={timeToMarket?.total}>
            <PieChart
              title="plugin.team_tasks.charts.timeToMarket.title"
              description="common.statistic.days"
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
              suffix="common.statistic.days"
            />
          </If>
        </SectionColumn>
      </Section>

      <Section>
        <SectionColumn>
          <PieChart
            title="plugin.team_tasks.charts.totalDays.title"
            details={totalDetails}
            order={yearOrder}
            limit={3}
            suffix="common.statistic.tasks"
            other="plugin.team_tasks.charts.other"
          />
          <Description translationId="plugin.team_tasks.charts.totalDays.description" />
        </SectionColumn>
        <SectionColumn>
          <PieChart
            title="plugin.team_tasks.charts.workedDays.title"
            details={workedDetails}
            order={yearOrder}
            limit={3}
            suffix="common.statistic.tasks"
            other="plugin.team_tasks.charts.other"
          />
          <Description translationId="plugin.team_tasks.charts.workedDays.description" />
        </SectionColumn>
      </Section>
    </>
  );
});

export default PieCharts;
