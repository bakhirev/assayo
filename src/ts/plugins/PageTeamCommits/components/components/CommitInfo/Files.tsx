import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import IHashMap from 'ts/interfaces/HashMap';

import { Column, ColumnTypes } from 'ts/components/Table';
import { DataView } from 'ts/components/Layout';
import { LineChart } from 'ts/components/Charts';

interface FilesProps {
  isCorrectPR?: IHashMap<boolean>;
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function Files({ response, updateSort, rowsForExcel, mode }: FilesProps) {
  if (!response) return null;

  return (
    <DataView
      rowsForExcel={rowsForExcel}
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
      mode="details"
      type={mode === 'print' ? 'cards' : undefined}
      columnCount={mode === 'print' ? 3 : undefined}
    >
      <Column
        isSortable
        title="plugin.team_commits.files.action.title"
        properties="action"
        formatter={(value: string) => {
          return {
            A: 'plugin.team_commits.files.action.added',
            C: 'plugin.team_commits.files.action.copy',
            D: 'plugin.team_commits.files.action.removed',
            M: 'plugin.team_commits.files.action.modification',
            R: 'plugin.team_commits.files.action.renamed',
            T: 'plugin.team_commits.files.action.typeChange',
            U: 'plugin.team_commits.files.action.unmerged',
            X: 'plugin.team_commits.files.action.unknown',
          }[value || ''] || value;
        }}
        template={ColumnTypes.TAGS}
        width={100}
      />
      <Column
        template={ColumnTypes.NUMBER}
        properties="addedRemoved"
        formatter={(value: any) => (value > 0 ? `+${value}` : value)}
        width={60}
      />
      <Column
        isSortable
        title="plugin.team_commits.files.addedRemoved"
        properties="addedRemoved"
        width={150}
        template={(value: any) => (
          <LineChart
            value={value < 0 ? value * (-1) : value}
            max={100}
            suffix="plugin.team_commits.files.line"
          />
        )}
      />
      <Column
        template={ColumnTypes.NUMBER}
        properties="changed"
        width={60}
      />
      <Column
        isSortable
        title="plugin.team_commits.files.changed"
        properties="changed"
        width={150}
        template={(value: number) => (
          <LineChart
            value={value}
            max={100}
            suffix="plugin.team_commits.files.line"
          />
        )}
      />
      <Column
        template={ColumnTypes.STRING}
        title="plugin.team_commits.files.path"
        properties="path"
      />
    </DataView>
  );
}

Files.defaultProps = {
  response: undefined,
};

export default Files;
