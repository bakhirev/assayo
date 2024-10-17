import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';

import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import UiKitTags from 'ts/components/UiKit/components/Tags';
import { PRLink, TaskLink } from 'ts/components/ExternalLink';

import { getDate } from 'ts/helpers/formatter';

import Release from './Release';

interface ViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

export function View({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  if (!response) return null;

  return (
    <DataView
      rowsForExcel={rowsForExcel}
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
      type={mode === 'print' ? 'cards' : undefined}
      columnCount={mode === 'print' ? 3 : undefined}
    >
      <Column
        isFixed
        template={ColumnTypesEnum.DETAILS}
        width={40}
        properties="releaseIds"
        formatter={(row: any) => {
          const content = Array.from(row?.releaseIds)
            .reverse()
            .map((id: any) => dataGripStore.dataGrip.release.release[id])
            .filter(v => v);
          const isCorrectPr = Object.fromEntries(
            row.prIds.map((id: string) => [id, true]),
          );
          return (
            <Release // @ts-ignore
              response={{ content }}
              isCorrectPR={isCorrectPr}
              mode="details"
            />
          );
        }}
      />
      <Column
        isFixed
        isSortable
        template={(value: string) => (
          <TaskLink task={value} />
        )}
        title="page.team.tasks.task"
        properties="task"
        width={120}
      />
      <Column
        properties="types"
        width={100}
        template={(value: any) => (
          <UiKitTags value={Object.keys(value)} />
        )}
      />
      <Column
        properties="scope"
        width={100}
        template={(value: any) => (
          <UiKitTags value={Object.keys(value)} />
        )}
      />
      <Column
        isSortable
        width={80}
        template={(row: any) => {
          const links = row.prIds.map((id: string) => (
            <PRLink
              key={id}
              prId={id}
            />
          ));
          return (<>{links}</>);
        }}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        properties="comments"
      />
      <Column
        template={ColumnTypesEnum.STRING}
        title="page.team.tasks.author"
        properties="author"
        width={170}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        title="page.team.tasks.from"
        properties="from"
        width={150}
        formatter={getDate}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        title="page.team.tasks.to"
        properties="to"
        width={150}
        formatter={getDate}
      />
    </DataView>
  );
}

View.defaultProps = {
  response: undefined,
};

export default View;
