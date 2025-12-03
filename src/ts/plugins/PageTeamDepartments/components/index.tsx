import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import fullScreen from 'ts/store/FullScreen';

import { Title, Description, NothingFound, Section } from 'ts/components/Layout';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import SelectWithButtons from 'ts/components/UiKit/components/SelectWithButtons';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';

import Departments from './components/Departments';
import DepartmentCharts from './components/Charts';
import Months from './components/Months';

import style from 'ts/pages/Team/styles/filters.module.scss';

const Department = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
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
      <FakeDataLoader
        content={content}
        mode={mode}
      >
        <Departments mode={mode} />
        <Pagination />
      </FakeDataLoader>

      {taskCode ? (
        <>
          <Title title="page.team.department.months.title"/>
          <Section>
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
          </Section>
          <FakeDataLoader
            content={byMonths[taskCode]}
            mode={mode}
            watch={taskCode}
          >
            <Months mode={mode} />
            <Pagination />
          </FakeDataLoader>
          <Description translationId="page.team.department.months.description" />
        </>
      ) : null}
    </>
  );
});

export default Department;

