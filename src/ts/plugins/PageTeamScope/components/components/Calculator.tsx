import React, { useMemo, useState } from 'react';

import statisticStore from 'ts/store/Statistics';

import ICommit, { ISystemCommit } from 'ts/interfaces/Commit';
import { If, Description, Gap, NothingFound, Search as LayoutSearch, Title } from 'ts/components/Layout';
import StatisticsByScope from 'ts/helpers/StatisticsByCommits/components/scope';

import CalculatorDetails from './CalculatorDetails';

const statistics = new StatisticsByScope();
function getScope(commits: ICommit[]) {
  statistics.clear();
  [...commits].reverse().forEach((commit) => {
    statistics.addCommit(commit);
  });
  statistics.updateTotalInfo();
  return statistics.totalInfo[0];
}

interface CalculatorProps {
  mode?: string;
}

function Calculator({ mode }: CalculatorProps) {
  const commits = useMemo(() => (
    [...statisticStore.commits]
      .reverse()
      .filter((commit: any) => !commit?.commitType) as ICommit[]
  ), [statisticStore.hash]);
  const [showInfo, setShowInfo] = useState<any>(false);
  const [filteredCommits, setFilteredCommits] = useState<ICommit[]>([]);
  const [scope, setScope] = useState<any>(null);

  if (mode === 'print' && !showInfo) return null;

  return (
    <>
      <If value={mode !== 'print'}>
        <Title title="plugin.team_scope.calculator.title"/>
        <Description translationId="plugin.team_scope.calculator.description" />
        <Gap height="l" />

        <LayoutSearch
          content={commits}
          properties="message"
          examples={['api', 'http', 'auth', 'hack', 'doc', 'test', 'deploy']}
          elements={['search']}
          onChange={(newResults: Array<ICommit | ISystemCommit>) => {
            const onlyCommits = newResults.filter((commit: any) => !commit?.commitType) as ICommit[];
            const totalCommits = onlyCommits?.length;
            const canShowInfo = totalCommits > 8 && totalCommits < commits.length;
            if (canShowInfo) {
              setFilteredCommits(onlyCommits);
              setScope(getScope(onlyCommits));
            }
            setShowInfo(canShowInfo);
          }}
        />
      </If>

      {showInfo ? (
        <CalculatorDetails
          scope={scope}
          commits={filteredCommits}
        />
      ) : (
        <NothingFound mode="search" />
      )}
    </>
  );
}

export default Calculator;
