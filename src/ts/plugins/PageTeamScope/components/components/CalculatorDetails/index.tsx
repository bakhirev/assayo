import React, { useEffect, useState } from 'react';

import ICommit from 'ts/interfaces/Commit';
import { If, Gap, Title } from 'ts/components/Layout';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import statisticStore from 'ts/store/Statistics';

import Icons from './Icons';
import IconsSmall from '../Details/Icons';
import PieCharts from '../Details/PieCharts';
import Tasks from './Tasks';
import Commits from './Commits';

interface CalculatorDetailsProps {
  scope?: any;
  commits?: ICommit[];
}

function CalculatorDetails({
  scope,
  commits,
}: CalculatorDetailsProps): React.ReactElement | null {
  const [hash, setHash] = useState<number>(1);

  if (!scope) return null;

  useEffect(() => {
    setHash(Math.random());
  }, [scope, commits]);

  const taskByName = statisticStore.statisticsByCommits.tasks.totalInfoByName;
  const tasks = scope.tasks
    .map((task: string) => taskByName.get(task))
    .filter((task: any) => task);

  return (
    <>
      <Gap height="xxl" />

      <Title title="plugin.team_scope.details.cards" />
      <Icons scope={scope} />
      <IconsSmall scope={scope} />

      <Title title="plugin.team_scope.details.charts" />
      <PieCharts scope={scope} />

      <If value={tasks}>
        <Title title="plugin.team_scope.details.tasks" />
        <FakeDataLoader
          content={tasks}
          watch={hash}
        >
          <Tasks />
          <Pagination/>
        </FakeDataLoader>
      </If>

      <If value={commits}>
        <Title title="plugin.team_scope.details.commits" />
        <FakeDataLoader
          content={commits}
          watch={hash}
        >
          <Commits />
          <Pagination/>
        </FakeDataLoader>
      </If>
    </>
  );
}

export default CalculatorDetails;
