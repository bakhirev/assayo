import React, { useMemo, useState } from 'react';

import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import SelectWithButtons from 'ts/components/UiKit/components/SelectWithButtons';
import { Gap } from 'ts/components/Layout';

import View from './View';

interface OneWithFilterProps {
  rowsByYear: any[];
  mode?: string;
}

function OneWithFilter({ mode, rowsByYear }: OneWithFilterProps): React.ReactElement | null {
  const [selectedYear, setSelectedYear] = useState<any>(rowsByYear?.[0]);

  const options = useMemo(() => (
    rowsByYear.map((item) => ({ id: item.year, title: item.year }))
  ), [selectedYear?.year]);

  return (
    <>
      <SelectWithButtons
        value={selectedYear?.year}
        options={options}
        onChange={(year: number) => {
          setSelectedYear(rowsByYear?.filter((item) => item.year === year)?.[0]);
        }}
      />
      <Gap height="xxl"/>
      <FakeDataLoader
        content={selectedYear?.rows}
        mode={mode}
        watch={`${mode}${selectedYear?.year}`}
      >
        <View />
        <Pagination/>
      </FakeDataLoader>
    </>
  );
}

export default OneWithFilter;
