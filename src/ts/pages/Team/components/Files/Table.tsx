import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import { IDirtyFile } from 'ts/interfaces/FileInfo';
import dataGripStore from 'ts/store/DataGrip';

import Table from 'ts/components/Table';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';

import { getMax } from 'ts/pages/Common/helpers/getMax';
import { getDate } from 'ts/helpers/formatter';

import treeStore from '../../store/Tree';

interface IViewProps {
  response?: IPagination<any>;
}

function View({ response }: IViewProps) {
  if (!response) return null;

  const fileSizeChart = getOptions({ max: getMax(response, 'lines'), suffix: 'page.team.tree.line' });
  const addedLinesChart = getOptions({ order: dataGripStore.dataGrip.author.list, suffix: 'page.team.tree.line' });
  const addedRemovedChangedChart = getOptions({ order: [
    'page.team.tree.lineAdd',
    'page.team.tree.lineChange',
    'page.team.tree.lineRemove',
  ], suffix: 'page.team.tree.line' });

  return (
    <Table
      rows={response.content}
      disabledRow={(row: any) => {
        if (row?.title === '..') return false;
        else return true;
        const limit = treeStore.minCommits || 0;
        const name = dataGripStore.dataGrip.author.list[treeStore.authorId || ''] || '';
        const author = row.file?.authors[name];
        const commits = author?.commits || 0;
        return (treeStore.authorId && !author) || (commits < limit);
      }}
    >
      <Column
        isFixed
        template={ColumnTypesEnum.STRING}
        formatter={(row: any) => row?.content ? `📁 ${row?.name}` : `📄 ${row?.name}`}
        minWidth={170}
        onClick={(row: any) => {
          if (!row.content) return;
          treeStore.updateFilter('selectedPath', [...row.path, row.name]);
        }}
      />
      <Column
        isSortable
        width={50}
        properties="lines"
        template={ColumnTypesEnum.SHORT_NUMBER}
      />
      <Column
        isSortable
        properties="lines"
        minWidth={100}
        template={(value: any) => (
          <LineChart
            options={fileSizeChart}
            value={value}
          />
        )}
      />
      <Column
        isSortable
        template={ColumnTypesEnum.STRING}
        title="page.team.pr.firstCommitTime"
        formatter={(item: any) => getDate(item?.firstCommit?.timestamp)}
        width={130}
      />
      <Column
        isSortable
        template={ColumnTypesEnum.STRING}
        title="page.team.pr.author"
        formatter={(item: any) => item?.firstCommit?.author || ''}
        width={150}
      />
      <Column
        isSortable
        template={ColumnTypesEnum.STRING}
        title="page.team.pr.lastCommitTime"
        formatter={(item: any) => getDate(item?.lastCommit?.timestamp)}
        width={130}
      />
      <Column
        isSortable
        template={ColumnTypesEnum.STRING}
        title="page.team.pr.author"
        formatter={(item: any) => item?.lastCommit?.author || ''}
        width={150}
      />
      <Column
        minWidth={200}
        template={(file: IDirtyFile) => (
          <LineChart
            value={100}
            options={addedRemovedChangedChart}
            details={{
              'page.team.tree.lineAdd': file?.addedRemovedChangedInPercent?.added || 0,
              'page.team.tree.lineRemove': file?.addedRemovedChangedInPercent?.removed || 0,
              'page.team.tree.lineChange': file?.addedRemovedChangedInPercent?.changed || 0,
            }}
          />
        )}
      />
      <Column
        title="page.team.tree.add"
        minWidth={200}
        template={(file: IDirtyFile) => (
          <LineChart
            value={100}
            options={addedLinesChart}
            details={file?.addedByAuthorInPercent}
          />
        )}
      />
      <Column
        title="page.team.tree.change"
        minWidth={200}
        template={(file: IDirtyFile) => (
          <LineChart
            value={100}
            options={addedLinesChart}
            details={file?.changedByAuthorInPercent}
          />
        )}
      />
      <Column
        title="page.team.tree.remove"
        minWidth={200}
        template={(file: IDirtyFile) => (
          <LineChart
            value={100}
            options={addedLinesChart}
            details={file?.removedByAuthorInPercent}
          />
        )}
      />
    </Table>
  );
}

View.defaultProps = {
  response: undefined,
};

export default View;
