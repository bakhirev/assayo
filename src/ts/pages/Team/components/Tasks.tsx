import React from 'react';
import { observer } from 'mobx-react-lite';

import ISort from 'ts/interfaces/Sort';
import { IPaginationRequest, IPagination } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import getFakeLoader from 'ts/components/DataLoader/helpers/formatter';
import NothingFound from 'ts/components/NothingFound';
import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import UiKitTags from 'ts/components/UiKit/components/Tags';

import { getMax } from 'ts/pages/Common/helpers/getMax';
import { getDate } from 'ts/helpers/formatter';

import ExternalLink from 'ts/components/ExternalLink';
import userSettings from 'ts/store/UserSettings';

interface ITasksViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function TasksView({ response, updateSort, rowsForExcel, mode }: ITasksViewProps) {
  if (!response) return null;

  const commitsChart = getOptions({ max: getMax(response, 'commits'), suffix: 'page.team.type.tasksSmall' });

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
        isSortable
        template={(value: string) => (
          <ExternalLink
            link={`${userSettings?.settings?.linksPrefix?.task || '/'}${value}`}
            text={value}
          />
        )}
        title="page.team.tasks.task"
        properties="task"
        width={120}
      />
      <Column
        properties="types"
        template={(value: string) => (
          <UiKitTags value={value} />
        )}
        width={100}
      />
      <Column
        properties="scope"
        template={(value: string) => (
          <UiKitTags value={value} />
        )}
        width={100}
      />
      <Column
        isSortable
        template={(value: string, row: any) => (
          <ExternalLink
            link={`${userSettings?.settings?.linksPrefix?.pr || '/'}${row?.prId}`}
            text="PR"
          />
        )}
        properties="task"
        width={40}
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
      <Column
        template={ColumnTypesEnum.STRING}
        title="page.team.tasks.pr"
        properties="to"
        width={150}
        formatter={getDate}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        title="page.team.tasks.prAuthor"
        properties="prAuthor"
        width={170}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="commits"
      />
      <Column
        isSortable
        title="page.team.tasks.commits"
        properties="commits"
        minWidth={170}
        template={(value: number) => (
          <LineChart
            options={commitsChart}
            value={value}
          />
        )}
      />
    </DataView>
  );
}

TasksView.defaultProps = {
  response: undefined,
};

const Tasks = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const rows = dataGripStore.dataGrip.tasks.statistic;
  if (!rows?.length) return mode !== 'print' ? (<NothingFound />) : null;

  return (
    <DataLoader
      to="response"
      loader={(pagination?: IPaginationRequest, sort?: ISort[]) => getFakeLoader({
        content: rows, pagination, sort, mode,
      })}
      watch={mode}
    >
      <br/>
      <br/>
      <br/>
      <TasksView
        mode={mode}
        rowsForExcel={rows}
      />
      <Pagination />
    </DataLoader>
  );
});

export default Tasks;
