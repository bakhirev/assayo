import React from 'react';
import { observer } from 'mobx-react-lite';

import ISort from 'ts/interfaces/Sort';
import IHashMap from 'ts/interfaces/HashMap';
import { IPaginationRequest, IPagination } from 'ts/interfaces/Pagination';
import { getMoney, getShortNumber } from 'ts/helpers/formatter';
import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import getFakeLoader from 'ts/components/DataLoader/helpers/formatter';
import localization from 'ts/helpers/Localization';
import NothingFound from 'ts/components/NothingFound';
import Title from 'ts/components/Title';
import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import RecommendationsWrapper from 'ts/components/Recommendations/wrapper';

import { getMax, getMaxByLength } from 'ts/pages/Common/helpers/getMax';
import Description from 'ts/components/Description';

interface IAuthorViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
  mode?: string;
}

function AuthorView({ response, updateSort, mode }: IAuthorViewProps) {
  if (!response) return null;

  const textWork = localization.get('page.team.author.worked');
  const textLosses = localization.get('page.team.author.losses');
  const daysWorked = getOptions({ order: [textWork, textLosses], suffix: 'page.team.author.days' });
  const taskChart = getOptions({ max: getMaxByLength(response, 'tasks'), suffix: 'page.team.author.tasksSmall' });
  const commitsChart = getOptions({ max: getMax(response, 'commits') });
  const typeChart = getOptions({ order: dataGripStore.dataGrip.type.list });

  return (
    <DataView
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
      type={mode === 'print' ? 'cards' : undefined}
      columnCount={mode === 'print' ? 3 : undefined}
    >
      <Column
        isFixed
        template={ColumnTypesEnum.STRING}
        properties="author"
        width={200}
      />
      <Column
        isSortable="daysWorked"
        title="page.team.author.workedLosses"
        minWidth={300}
        template={(details: any) => (
          <LineChart
            options={daysWorked}
            details={details}
          />
        )}
        formatter={(row: any) => {
          return { [textWork]: row.daysWorked, [textLosses]: row.daysLosses };
        }}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="tasks"
        formatter={(tasks: string[]) => (tasks?.length || 0)}
      />
      <Column
        isSortable
        properties="tasks"
        title="page.team.author.tasks"
        minWidth={200}
        template={(value: number) => (
          <LineChart
            options={taskChart}
            value={value}
          />
        )}
        formatter={(tasks: any) => (tasks?.length || 0)}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        title="page.team.author.daysForTask"
        properties="daysForTask"
        formatter={getShortNumber}
        width={120}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        title="page.team.author.scopes"
        properties="scopes"
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="commits"
      />
      <Column
        isSortable
        title="page.team.author.commits"
        properties="commits"
        minWidth={100}
        template={(value: number) => (
          <LineChart
            options={commitsChart}
            value={value}
          />
        )}
      />
      <Column
        title="page.team.author.types"
        properties="types"
        width={400}
        template={(details: IHashMap<number>) => (
          <LineChart
            options={typeChart}
            details={details}
          />
        )}
      />
      <Column
        template={ColumnTypesEnum.NUMBER}
        title="page.team.author.moneyAll"
        properties="moneyAll"
        formatter={getMoney}
      />
      <Column
        template={ColumnTypesEnum.NUMBER}
        title="page.team.author.moneyWorked"
        properties="moneyWorked"
        formatter={getMoney}
      />
      <Column
        template={ColumnTypesEnum.NUMBER}
        title="page.team.author.moneyLosses"
        properties="moneyLosses"
        formatter={getMoney}
      />
    </DataView>
  );
}

AuthorView.defaultProps = {
  response: undefined,
};

const Author = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const rows = dataGripStore.dataGrip.author.statistic;
  if (!rows?.length) return mode !== 'print' ? (<NothingFound />) : null;
  const recommendations = dataGripStore.dataGrip.recommendations.team?.byAuthor;

  return (
    <>
      {mode !== 'print' && (
        <RecommendationsWrapper recommendations={recommendations} />
      )}
      <Title title="page.team.author.title"/>
      <DataLoader
        to="response"
        loader={(pagination?: IPaginationRequest, sort?: ISort[]) => getFakeLoader({
          content: rows, pagination, sort, mode,
        })}
      >
        <AuthorView mode={mode} />
        <Pagination />
      </DataLoader>
      <PageWrapper>
        <PageColumn>
          <Description
            text={localization.get('page.team.author.description1')}
          />
        </PageColumn>
        <PageColumn>
          <Description
            text={localization.get('page.team.author.description2')}
          />
        </PageColumn>
      </PageWrapper>
    </>
  );
});

export default Author;
