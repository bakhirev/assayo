import React from 'react';
import { observer } from 'mobx-react-lite';

import ISort from 'ts/interfaces/Sort';
import { IPaginationRequest } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import Description from 'ts/components/Description';
import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import getFakeLoader from 'ts/components/DataLoader/helpers/formatter';
import NothingFound from 'ts/components/NothingFound';
import Title from 'ts/components/Title';
import PageBreak from 'ts/pages/Common/components/PageBreak';

import Total from './Total';
import Authors from './Authors';
import All from './All';

const PR = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const allPR = dataGripStore.dataGrip.pr.statistic;
  const rows = allPR.filter((item: any) => item.delayDays > 3);
  if (rows?.length < 2) return mode !== 'print' ? (<NothingFound />) : null;

  const PRbyName = dataGripStore.dataGrip.pr.statisticByName;
  const authorsStat = Object.values(PRbyName);

  return (
    <>
      <Title title="Время потраченное на одну задачу"/>
      <PageWrapper template="table">
        <Total/>
      </PageWrapper>

      <PageWrapper>
        <PageColumn>
          <Description
            text="*Время разработки* это разница времени от первого до последнего коммита по задаче. Не важно были перерывы в несколько дней между коммитами или нет. Сам факт какого-либо коммита увеличивает время."
          />
          <Description
            text="*Время ожидания* это время между последним коммитом и влитием кода. Оно показывает фактический простой в ожидании чего-либо."
          />
        </PageColumn>
        <PageColumn>
          <Description
            text="*Зачем отображать время разработки* без разбивки на кодинг и код-ревью? Затем, чтобы показать бизнесу фактическое время поставки кода. Ожидание тестирования, замечания на ревью, проблемы DevOps и прочие несовершенства процесса, как раз уже заложены в этот срок."
          />
        </PageColumn>
      </PageWrapper>
      <br/>
      <br/>

      <Title title="Статистика по сотрудникам"/>
      <PageWrapper template="table">
        <DataLoader
          to="response"
          loader={(pagination?: IPaginationRequest, sort?: ISort[]) => getFakeLoader({
            content: authorsStat, pagination, sort, mode,
          })}
        >
          <Authors/>
          <Pagination/>
        </DataLoader>
      </PageWrapper>

      <PageBreak/>
      <Title title="Длительное ожидание влития"/>
      <PageWrapper template="table">
        <DataLoader
          to="response"
          loader={(pagination?: IPaginationRequest, sort?: ISort[]) => getFakeLoader({
            content: rows,
            pagination: mode === 'print'
              ? { size: 20 }
              : pagination,
            sort,
          })}
        >
          <All mode={mode} />
          {mode !== 'print' && <Pagination/>}
        </DataLoader>
      </PageWrapper>
    </>
  );
});

export default PR;
