import React from 'react';
import { observer } from 'mobx-react-lite';

import { useTranslation } from 'ts/components/Translation';
import { SmallCardWithIcon, Section, SectionColumn } from 'ts/components/Layout';
import { getDate } from 'ts/helpers/formatter';
import { getTimeToMarketForTask } from 'ts/helpers/StatisticsByCommits/helpers/timeToMarket';
import { Table, Column, ColumnTypes } from 'ts/components/Table';
import { PieChart } from 'ts/components/Charts';
import statisticStore from 'ts/store/Statistics';

interface IconsProps {
  task: any;
}

const Icons = observer(({ task }: IconsProps): React.ReactElement | null => {
  const prByName = statisticStore.statisticsByCommits.pr.totalInfoByName;
  const { text } = useTranslation();
  const data = [
    {
      title: text('plugin.team_tasks.info.authors'),
      value: Array.from(task?.authors).join(', ') || '—',
    },
    {
      title: text('plugin.team_tasks.info.types'),
      value: task?.types?.join(', ') || '—',
    },
    {
      title: text('plugin.team_tasks.info.scope'),
      value: task?.scope?.join(', ') || '—',
    },
    {
      title: text('plugin.team_tasks.info.commits'),
      value: task?.commits,
    },
  ];

  const timeToMarket = getTimeToMarketForTask(task, prByName);
  const [backlog, worked, review, release, improvements] = [
    'plugin.team_tasks.charts.timeToMarket.backlog',
    'plugin.team_tasks.charts.timeToMarket.worked',
    'plugin.team_tasks.charts.timeToMarket.review',
    'plugin.team_tasks.charts.timeToMarket.release',
    'plugin.team_tasks.charts.timeToMarket.improvements',
  ];

  return (
    <Section>
      <SectionColumn>
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
      </SectionColumn>
      <SectionColumn>
        <SmallCardWithIcon
          value={getDate(task?.createdBefore)}
          icon="./assets/cards/day.svg"
          title="plugin.team_tasks.info.createdBefore"
        />
        <SmallCardWithIcon
          value={task?.totalAuthors}
          icon="./assets/cards/employees.svg"
          title="plugin.team_tasks.info.totalAuthors"
        />
        <SmallCardWithIcon
          value={task?.totalDaysInBacklog}
          icon="./assets/cards/month.svg"
          title="plugin.team_tasks.info.totalDaysInBacklog"
        />
        <SmallCardWithIcon
          value={task?.totalDaysWorked}
          icon="./assets/cards/work_days2.svg"
          title="plugin.team_tasks.info.totalDaysWorked"
        />
      </SectionColumn>

      <Table
        headless
        rows={data}
      >
        <Column
          properties="title"
          width={170}
          template={(v: string) => (<b style={{ fontWeight: 'bold' }}>{v}</b>)}
        />
        <Column
          template={ColumnTypes.NUMBER}
          properties="value"
        />
      </Table>
    </Section>
  );
});

export default Icons;
