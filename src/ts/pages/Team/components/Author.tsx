import React from 'react';
import { observer } from 'mobx-react-lite';

import ISort from 'ts/interfaces/Sort';
import IHashMap from 'ts/interfaces/HashMap';
import { IPaginationRequest, IPagination } from 'ts/interfaces/Pagination';
import { getMoney, getShortNumber } from 'ts/helpers/formatter';
import dataGripStore from 'ts/store/DataGrip';

import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import getFakeLoader from 'ts/components/DataLoader/helpers/formatter';
import localization from 'ts/helpers/Localization';
import NothingFound from 'ts/components/NothingFound';
import Title from 'ts/components/Title';
import Table from 'ts/components/Table';
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
}

function AuthorView({ response, updateSort }: IAuthorViewProps) {
  if (!response) return null;

  const textWork = localization.get('page.team.author.worked');
  const textLosses = localization.get('page.team.author.losses');
  const daysWorked = getOptions({ order: [textWork, textLosses], suffix: 'дней' });
  const taskChart = getOptions({ max: getMaxByLength(response, 'tasks'), suffix: 'задач' });
  const commitsChart = getOptions({ max: getMax(response, 'commits') });
  const typeChart = getOptions({ order: dataGripStore.dataGrip.type.list });

  return (
    <Table
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
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
        width={400}
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
    </Table>
  );
}

AuthorView.defaultProps = {
  response: undefined,
};

const Author = observer((): React.ReactElement => {
  const rows = dataGripStore.dataGrip.author.statistic;
  if (!rows?.length) return (<NothingFound />);
  const recommendations = dataGripStore.dataGrip.recommendations.team?.byAuthor;

  return (
    <>
      <RecommendationsWrapper recommendations={recommendations} />
      <Title title="Статистика по фичам"/>
      <PageWrapper template="table">
        <DataLoader
          to="response"
          loader={(pagination?: IPaginationRequest, sort?: ISort[]) => getFakeLoader(rows, pagination, '', sort)}
        >
          <AuthorView />
          <Pagination />
        </DataLoader>
      </PageWrapper>
      <PageWrapper>
        <PageColumn>
          <Description
            text="*Часть статитики* (скорость работы, затраченные деньги и т.п.) *по сотрудникам с типом «Помошник» не считается*, т.к. это эпизодическая роль в проекте. Предпологаем, что они не влияют на проект, а их правками можно пренебречь на фоне общего объема работы."
          />
        </PageColumn>
        <PageColumn>
          <Description
            text="*Сортировка по умолчанию* — это сортировка по количеству задач и группам (текущие, уволенные, помогающие  сотрудники)."
          />
        </PageColumn>
      </PageWrapper>
    </>
  );
});

export default Author;
