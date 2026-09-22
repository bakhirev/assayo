import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/StatisticsByCommitsStore';
import { getShortDateRange } from 'ts/helpers/formatter';
import { Title, Description, CardWithIcon, SmallCardWithIcon, Section, SectionColumn } from 'ts/components/Layout';
import { PieChart } from 'ts/components/Charts';

import { getAuthorWithMax, isAboveAverage } from './helpers/getLastWeek';

interface LastWeekProps {
  weeks: any[];
}

const LastWeek = observer(({ weeks }: LastWeekProps): React.ReactElement | null => {
  const lastWeek = weeks?.[0];
  if (!lastWeek) return null;

  const prevWeek = weeks[1];
  const best = getAuthorWithMax(lastWeek.authors);
  const quiet = lastWeek.authorsLength > 1
    ? getAuthorWithMax(lastWeek.lazyDays)
    : null;
  const overwork = getAuthorWithMax(lastWeek.weekDays);
  const isSprint = isAboveAverage(weeks);

  return (
    <>
      <Title title="plugin.team_weeks.last.title"/>
      <Description text={getShortDateRange(lastWeek.timestamp)} />
      <Section>
        <SectionColumn>
          <CardWithIcon
            value={lastWeek.tasks}
            icon="./assets/cards/tasks_month.svg"
            title="plugin.team_weeks.last.tasks.title"
            description="plugin.team_weeks.last.tasks.description"
            scoring={prevWeek ? {
              title: 'plugin.team_weeks.last.vsPrev',
              value: lastWeek.tasks,
              total: prevWeek.tasks,
            } : undefined}
          />
          <CardWithIcon
            value={lastWeek.changesLength}
            icon="./assets/cards/lines.svg"
            title="plugin.team_weeks.last.line.title"
            description="plugin.team_weeks.last.line.description"
            scoring={prevWeek ? {
              title: 'plugin.team_weeks.last.vsPrev',
              value: lastWeek.changesLength,
              total: prevWeek.changesLength,
            } : undefined}
          />
        </SectionColumn>
        <SectionColumn>
          <SmallCardWithIcon
            value={best?.name}
            icon="./assets/cards/employees.svg"
            title="plugin.team_weeks.last.best.title"
            description="plugin.team_weeks.last.best.description"
            scoring={best ? {
              value: best.value,
              total: lastWeek.tasks,
            } : undefined}
          />
          <SmallCardWithIcon
            value={quiet?.name}
            icon="./assets/cards/work_days2.svg"
            title="plugin.team_weeks.last.quiet.title"
            description="plugin.team_weeks.last.quiet.description"
            scoring={quiet ? {
              value: quiet.value,
              total: lastWeek.lazyDaysTotal,
            } : undefined}
          />
          <SmallCardWithIcon
            value={isSprint ? lastWeek.tasks : null}
            icon="./assets/cards/tasks.svg"
            title="plugin.team_weeks.last.sprint.title"
            description="plugin.team_weeks.last.sprint.description"
          />
          <SmallCardWithIcon
            value={overwork?.name}
            icon="./assets/cards/day.svg"
            title="plugin.team_weeks.last.overwork.title"
            description="plugin.team_weeks.last.overwork.description"
          />
        </SectionColumn>
      </Section>
      <Section>
        <SectionColumn>
          <PieChart
            title="plugin.team_weeks.last.days.title"
            details={{
              'plugin.team_weeks.hasCommits': lastWeek.workDaysTotal,
              'plugin.team_weeks.hasNotCommits': lastWeek.lazyDaysTotal,
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

export default LastWeek;
