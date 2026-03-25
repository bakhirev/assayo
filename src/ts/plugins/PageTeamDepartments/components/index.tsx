import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';
import fullScreen from 'ts/store/FullScreen';

import { If, Title, TitleBig, Description, NothingFound, Gap } from 'ts/components/Layout';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import SelectWithButtons from 'ts/components/UiKit/components/SelectWithButtons';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';

import Departments from './components/Departments';
import DepartmentCharts from './components/Charts';
import Months from './components/Months';
import ShortInformation from './components/ShortInformation';
import Forecasting from './components/Forecasting';

import style from 'ts/pages/Team/styles/filters.module.scss';

const Department = observer(({
  mode,
}: PageOptions): React.ReactElement | null => {
  const taskCodes = statisticStore.statisticsByCommits.taskCodes;
  const content = taskCodes.totalInfo.filter((item: any) => item.totalDaysWorked > 10);
  const options = content
    .filter((item: any) => item?.months?.length > 6)
    .map((item: any, id: number) => ({ id, title: item.taskCode }));
  const [taskCode, setTaskCode] = useState(options?.[0]?.id);
  const months = content[taskCode]?.months || [];

  if (!content?.length) return <NothingFound />;

  return (
    <>
      <If value={!fullScreen.isOpen && content?.length > 1}>
        <DepartmentCharts/>
      </If>
      <Title title="plugin.team_departments.title"/>
      <FakeDataLoader
        content={content}
        mode={mode}
      >
        <Departments mode={mode} />
        <Pagination />
      </FakeDataLoader>

      <TitleBig
        prefix="plugin.team_departments.banner.title"
        title={options[taskCode]?.title}
      >
        <SelectWithButtons
          value={taskCode}
          className={style.table_filters_item}
          options={options}
          onChange={(value: string) => {
            setTaskCode(value);
          }}
        />
      </TitleBig>

      <Title title="plugin.team_departments.details.title"/>
      <ShortInformation department={content[taskCode]} />

      <Title title="plugin.team_departments.months.title"/>
      <Description translationId="plugin.team_departments.months.description" />
      <Gap height={48} />
      <FakeDataLoader
        content={months}
        mode={mode}
        watch={taskCode}
      >
        <Months mode={mode} />
        <Pagination />
      </FakeDataLoader>

      <Title title="plugin.team_departments.forecasting.title"/>
      <Forecasting department={content[taskCode]} />
    </>
  );
});

export default Department;

