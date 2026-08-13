import React from 'react';

import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { If, Gap, Title } from 'ts/components/Layout';
import getReleaseAndPR from 'ts/helpers/StatisticsByCommits/helpers/getReleaseAndPR';
import statisticStore from 'ts/store/StatisticsByCommitsStore';

import Icons from './Icons';
import Release from './Release';
import Commits from './Commits';

interface TaskInfoProps {
  task?: any;
}

function TaskInfo({ task }: TaskInfoProps) {
  if (!task) return null;

  const content = getReleaseAndPR(task, statisticStore.statisticsByCommits);

  return (
    <>
      <Gap height="xxl" />
      <Title title="plugin.team_tasks.details.facts" />
      <Icons task={task} />

      <If value={content}>
        <Gap height="xxl" />
        <Title title="plugin.team_tasks.details.release" />
      </If>
      <FakeDataLoader content={content}>
        <Release mode="details" />
        <Pagination />
      </FakeDataLoader>

      <If value={task?.commits}>
        <Gap height="xxl" />
        <Title title="plugin.team_tasks.details.commits" />
      </If>
      <FakeDataLoader content={task?.commits}>
        <Commits mode="details" />
        <Pagination />
      </FakeDataLoader>
    </>
  );
}

TaskInfo.defaultProps = {
  response: undefined,
};

export default TaskInfo;
