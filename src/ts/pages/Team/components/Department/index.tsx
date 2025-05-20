import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import dataGripStore from 'ts/store/DataGrip';
import fullScreen from 'ts/store/FullScreen';

import Title from 'ts/components/Title';
import Description from 'ts/components/Description';
import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import { getFakeLoader } from 'ts/components/DataLoader/helpers/formatter';
import SelectWithButtons from 'ts/components/UiKit/components/SelectWithButtons';
import NothingFound from 'ts/components/NothingFound';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import PageWrapper from 'ts/components/Page/wrapper';

import Departments from './components/Departments';
import DepartmentCharts from './components/Charts';
import Months from './components/Months';

import style from '../../styles/filters.module.scss';

const Department = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const { t } = useTranslation();

  const byMonths = dataGripStore.dataGrip.taskNumbers.statistic;
  const content = dataGripStore.dataGrip.taskCodes.statistic
    .filter((item: any) => item.totalDaysWorked > 10);
  const options = Object.keys(byMonths).map((id: string) => ({ id }));

  const [taskCode, setTaskCode] = useState(options?.[0]?.id);

  if (!content?.length) {
    return <NothingFound />;
  }

  return (
    <>
      {!fullScreen.isOpen && (
        <DepartmentCharts/>
      )}
      <Title title="page.team.department.title"/>
      <DataLoader
        to="response"
        loader={getFakeLoader(content, mode)}
      >
        <Departments mode={mode} />
        <Pagination />
      </DataLoader>

      {taskCode ? (
        <>
          <Title title="page.team.department.months.title"/>
          <PageWrapper>
            <div className={style.table_filters}>
              <SelectWithButtons
                title="page.team.tree.filters.author"
                value={taskCode}
                className={style.table_filters_item}
                options={options}
                onChange={(value: string) => {
                  setTaskCode(value);
                }}
              />
            </div>
          </PageWrapper>
          <DataLoader
            to="response"
            loader={getFakeLoader(byMonths[taskCode], mode)}
            watch={taskCode}
          >
            <Months mode={mode} />
            <Pagination />
          </DataLoader>
          <Description text={t('page.team.department.months.description')} />
        </>
      ) : null}
    </>
  );
});

export default Department;

