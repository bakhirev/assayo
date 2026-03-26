import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';
import fullScreen from 'ts/store/FullScreen';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { Title, TitleBig, NothingFound, If } from 'ts/components/Layout';
import SelectWithButtons from 'ts/components/UiKit/components/SelectWithButtons';

import Companies from './components/Companies';
import CompanyCharts from './components/Charts';
import TaskCodes from './components/TaskCodes';
import Employments from './components/Employments';
import ShortInformation from './components/ShortInformation';

const Company = observer(({
  mode,
}: PageOptions): React.ReactElement | null => {
  const companies = statisticStore.statisticsByCommits.company;
  const options = companies.totalInfo
    .filter((item: any) => item?.totalDaysWorked > 6)
    .map((item: any) => ({ id: item.company, title: item.company }));
  const [company, setCompany] = useState(options?.[0]?.id);
  const selectedCompany = companies.totalInfoByName.get(company);

  if (!companies.totalInfo?.length) {
    return mode !== 'print' ? (<NothingFound />) : null;
  }

  return (
    <>
      <If value={!fullScreen.isOpen}>
        <CompanyCharts />
      </If>

      <Title title="plugin.team_country.title"/>
      <FakeDataLoader
        content={companies.totalInfo}
        mode={mode}
        watch={`${mode}${statisticStore.hash}`}
      >
        <Companies
          mode={mode}
          rowsForExcel={companies.totalInfo}
        />
        <Pagination />
      </FakeDataLoader>

      <TitleBig
        prefix="plugin.team_companies.banner.title"
        title={company}
      >
        <SelectWithButtons
          value={company}
          options={options}
          onChange={(value: string) => {
            setCompany(value);
          }}
        />
      </TitleBig>

      <If value={selectedCompany}>
        <ShortInformation company={selectedCompany} />

        <If value={selectedCompany?.taskCodes}>
          <Title title="plugin.team_companies.taskCodes.title"/>
          <FakeDataLoader
            content={selectedCompany?.taskCodes}
            watch={`${mode}${company}${statisticStore.hash}`}
          >
            <TaskCodes
              mode={mode}
              rowsForExcel={selectedCompany?.taskCodes}
            />
            <NothingFound />
            <Pagination />
          </FakeDataLoader>
        </If>

        <If value={selectedCompany?.authors}>
          <Title title="plugin.team_companies.employments.title"/>
          <FakeDataLoader
            content={selectedCompany?.authors}
            watch={`${mode}${company}${statisticStore.hash}`}
          >
            <Employments
              mode={mode}
              rowsForExcel={selectedCompany?.authors}
            />
            <NothingFound />
            <Pagination />
          </FakeDataLoader>
        </If>
      </If>
    </>
  );
});

export default Company;
