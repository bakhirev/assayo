import React from 'react';
import { observer } from 'mobx-react-lite';

import ICommit from 'ts/interfaces/Commit';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { Gap, If, Title } from 'ts/components/Layout';
import getReleaseAndPR from 'ts/helpers/StatisticsByCommits/helpers/getReleaseAndPR';
import statisticStore from 'ts/store/Statistics';

import Icons from './Icons';
import Release from './Release';
import Files from './Files';

interface CommitInfoProps {
  commit?: ICommit;
}

const CommitInfo = observer(({ commit }: CommitInfoProps): React.ReactElement | null => {
  if (!commit) return null;

  const task = statisticStore.statisticsByCommits.tasks.totalInfoByName.get(commit.task);
  const releaseAndPRs = getReleaseAndPR(task, statisticStore.statisticsByCommits, commit.milliseconds);

  const fileChanges = (commit?.fileChanges || [])
    .map((file) => ({
      action: file.action,
      addedRemoved: file.removedLines ? file.removedLines * (-1) : file.addedLines,
      added: file.addedLines,
      removed: file.removedLines,
      changed: file.changedLines,
      path: file.path,
    }));

  return (
    <>
      <Gap height="xxl" />

      <Title title="plugin.team_commits.details.title" />
      <Icons commit={commit} />

      <If value={releaseAndPRs}>
        <Gap height="l" />
        <Title title="plugin.team_commits.info.release" />
      </If>
      <FakeDataLoader content={releaseAndPRs}>
        <Release mode="details" />
        <Pagination />
      </FakeDataLoader>

      <If value={fileChanges}>
        <Gap height="l" />
        <Title title="plugin.team_commits.files.title" />
      </If>
      <FakeDataLoader content={fileChanges}>
        <Files // @ts-ignore
          rowsForExcel={fileChanges}
          mode="details"
        />
        <Pagination/>
      </FakeDataLoader>
    </>
  );
});

export default CommitInfo;
