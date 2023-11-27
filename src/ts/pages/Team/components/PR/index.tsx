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
import localization from 'ts/helpers/Localization';

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
      <Title title="page.team.pr.oneTaskDays"/>
      <Total/>

      <PageWrapper>
        <PageColumn>
          <Description
            text={localization.get('page.team.pr.description1')}
          />
          <Description
            text={localization.get('page.team.pr.description2')}
          />
        </PageColumn>
        <PageColumn>
          <Description
            text={localization.get('page.team.pr.description3')}
          />
        </PageColumn>
      </PageWrapper>
      <br/>
      <br/>

      <Title title="page.team.pr.statByAuthors"/>
      <DataLoader
        to="response"
        loader={(pagination?: IPaginationRequest, sort?: ISort[]) => getFakeLoader({
          content: authorsStat, pagination, sort, mode,
        })}
      >
        <Authors mode={mode}/>
        <Pagination/>
      </DataLoader>

      <PageBreak/>
      <Title title="page.team.pr.longDelay"/>
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
