import React from 'react';

import { PieChart } from 'ts/components/Charts';
import { Title, SmallCardWithIcon, Section, SectionColumn } from 'ts/components/Layout';
import statisticStore from 'ts/store/Statistics';
import { WeightedAverage } from 'ts/helpers/Math';
import { getShortNumber } from 'ts/helpers/formatter';

interface PieChartsAllProps {
  content: any[],
}

function getTypesCount(content: any[]) {
  let fast = 0;
  let normal = 0;
  let backlog = 0;
  content.forEach((task: any) => {
    if (task.totalDaysInBacklog > 90) backlog += 1;
    else if (task.totalDaysInBacklog > 14) normal += 1;
    else fast += 1;
  });
  return [fast, normal, backlog];
}

function getTotalTaskInfo(statisticByAuthor: any) {
  const totalTaskInChanges = new WeightedAverage();
  const totalTaskInCommits = new WeightedAverage();
  const totalTaskInDay = new WeightedAverage();
  const totalTaskInFiles = new WeightedAverage();

  statisticByAuthor.forEach((author: any) => {
    if (author.isStaff) return;
    totalTaskInChanges.update(author.totalTaskInChanges, author.totalTasks);
    totalTaskInCommits.update(author.totalTaskInCommits, author.totalTasks);
    totalTaskInDay.update(author.totalTaskInDay, author.totalTasks);
    totalTaskInFiles.update(author.totalTaskInFiles, author.totalTasks);
  });

  return {
    totalTaskInChanges: totalTaskInChanges.get(),
    totalTaskInCommits: totalTaskInCommits.get(),
    totalTaskInDay: totalTaskInDay.get(),
    totalTaskInFiles: totalTaskInFiles.get(),
  };
}

function PieChartsAll({
  content,
}: PieChartsAllProps) {
  if (!content?.length) return null;

  const [fastCount, normalCount, backlogCount] = getTypesCount(content);
  const [fast, normal, backlog] = [
    'plugin.team_tasks.charts.relative.fast',
    'plugin.team_tasks.charts.relative.normal',
    'plugin.team_tasks.charts.relative.backlog',
  ];
  const {
    totalTaskInChanges,
    totalTaskInCommits,
    totalTaskInDay,
    totalTaskInFiles,
  } = getTotalTaskInfo(statisticStore.statisticsByCommits.author.totalInfo);

  return (
    <Section>
      <SectionColumn>
        <Title title="plugin.team_tasks.charts.all"/>
        <PieChart
          value={content?.length}
          title="plugin.team_tasks.charts.relative.title"
          description="common.statistic.tasks"
          details={{
            [fast]: fastCount,
            [normal]: normalCount,
            [backlog]: backlogCount,
          }}
          limit={1}
          order={[fast, normal, backlog]}
          suffix="common.statistic.tasks"
        />
      </SectionColumn>
      <SectionColumn>
        <Title title="plugin.team_tasks.charts.totalTask.title" />
        <SmallCardWithIcon
          value={getShortNumber(totalTaskInDay)}
          icon="./assets/cards/day.svg"
          title="plugin.team_tasks.charts.totalTaskInDay.title"
        />
        <SmallCardWithIcon
          value={getShortNumber(totalTaskInFiles)}
          icon="./assets/cards/files.svg"
          title="plugin.team_tasks.charts.totalTaskInFiles.title"
        />
        <SmallCardWithIcon
          value={getShortNumber(totalTaskInChanges)}
          icon="./assets/cards/lines.svg"
          title="plugin.team_tasks.charts.totalTaskInChanges.title"
        />
        <SmallCardWithIcon
          value={getShortNumber(totalTaskInCommits)}
          icon="./assets/cards/commits.svg"
          title="plugin.team_tasks.charts.totalTaskInCommits.title"
        />
      </SectionColumn>
    </Section>
  );
}

export default PieChartsAll;
