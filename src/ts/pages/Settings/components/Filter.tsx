import React from 'react';
import { observer } from 'mobx-react-lite';

import UiKitInputNumber from 'ts/components/UiKit/components/InputNumber';
import UiKitDate from 'ts/components/UiKit/components/Date';
import PageBox from 'ts/components/Page/Box';
import { Title } from 'ts/components/Layout';

import formStore from '../store/Form';

const Filter = observer((): React.ReactElement | null => {
  const filters = formStore.state.filters;
  if (!filters) return null;

  return (
    <>
      <Title title="Фильтр входных данных"/>
      <PageBox>
        <UiKitInputNumber
          title="Минимальное число коммитов"
          value={filters.minCommits}
          onChange={(minCommits: number) => {
            formStore.updateState('filters.minCommits', minCommits);
          }}
        />
        <UiKitDate
          title="Дата начала анализа"
          value={filters.from}
          onChange={(from: string) => {
            formStore.updateState('filters.from', from);
          }}
        />
        <UiKitDate
          title="Дата окончания анализа"
          value={filters.to}
          onChange={(to: string) => {
            formStore.updateState('filters.to', to);
          }}
        />
      </PageBox>
    </>
  );
});

export default Filter;
