import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/StatisticsByCommitsStore';
import { StatisticsWeekTotal } from 'ts/helpers/StatisticsByCommits/components/weeks';
import { If, Title, CardWithIcon, SmallCardWithIcon, Section, SectionColumn } from 'ts/components/Layout';
import { PieChart } from 'ts/components/Charts';

import { getMinMaxStatistic, getMiddleValues } from './helpers';

interface WeekInfoProps {
  weeks: StatisticsWeekTotal[];
  index: number;
}

const WeekInfo = observer(({ weeks, index }: WeekInfoProps): React.ReactElement | null => {
  const lastWeek = weeks?.[index];
  if (!lastWeek) return null;

  const prevWeek = weeks[index + 1];
  const minMaxStatistic = getMinMaxStatistic(lastWeek.authors);
  const middleValues = getMiddleValues(weeks, index);
  const title = index
    ? 'plugin.team_weeks.last.titleDefault'
    : 'plugin.team_weeks.last.title';

  return (
    <>
      <Title title={title}/>
      <Section>
        <SectionColumn>
          <CardWithIcon
            value={lastWeek.totalTasks}
            icon="./assets/cards/tasks_month.svg"
            title="plugin.team_weeks.last.tasks.title"
            description="plugin.team_weeks.last.tasks.description"
            scoring={prevWeek ? {
              title: 'plugin.team_weeks.last.tasks.scoring',
              value: prevWeek.totalTasks,
              total: middleValues.totalTasks,
            } : undefined}
          />

          <CardWithIcon
            value={lastWeek.totalChanges}
            icon="./assets/cards/lines.svg"
            title="plugin.team_weeks.last.changes.title"
            description="plugin.team_weeks.last.changes.description"
            scoring={prevWeek ? {
              title: 'plugin.team_weeks.last.changes.scoring',
              value: prevWeek.totalChanges,
              total: middleValues.totalChanges,
            } : undefined}
          />
        </SectionColumn>
        <SectionColumn>
          <If value={lastWeek.totalAuthors > 1}>
            <SmallCardWithIcon
              value={minMaxStatistic.totalTasks?.maxData}
              icon="./assets/cards/employees.svg"
              title="plugin.team_weeks.last.best.title"
              description="plugin.team_weeks.last.best.description"
              scoring={{
                title: 'plugin.team_weeks.last.vsPrev',
                value: minMaxStatistic.totalTasks?.max,
                total: prevWeek.authors[minMaxStatistic.totalTasks?.maxData || '']?.totalTasks,
              }}
            />
          </If>

          <If value={lastWeek.totalAuthors > 1}>
            <SmallCardWithIcon
              value={minMaxStatistic.totalTasks?.minData}
              icon="./assets/cards/work_days2.svg"
              title="plugin.team_weeks.last.quiet.title"
              description="plugin.team_weeks.last.quiet.description"
              scoring={{
                title: 'plugin.team_weeks.last.vsPrev',
                value: minMaxStatistic.totalTasks?.min,
                total: prevWeek.authors[minMaxStatistic.totalTasks?.minData || '']?.totalTasks,
              }}
            />
          </If>
        </SectionColumn>
      </Section>

      <Section>
        <SectionColumn>
          <PieChart
            title="plugin.team_weeks.last.days.title"
            details={{
              'plugin.team_weeks.hasCommits': lastWeek.totalDays,
              'plugin.team_weeks.hasNotCommits': lastWeek.totalDaysWithoutCommits,
            }}
            order={[
              'plugin.team_weeks.hasCommits',
              'plugin.team_weeks.hasNotCommits',
            ]}
            limit={1}
            suffix="common.statistic.days"
          />
        </SectionColumn>
        <SectionColumn>
          <PieChart
            title="plugin.team_weeks.last.types.title"
            value={lastWeek.commits}
            details={lastWeek.types}
            order={statisticStore.statisticsByCommits.type.list}
            limit={1}
            suffix="common.statistic.commits"
          />
        </SectionColumn>
      </Section>
    </>
  );
});

export default WeekInfo;
