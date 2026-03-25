import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import InputNumber from 'ts/components/UiKit/components/InputNumber';
import PageBox from 'ts/components/Page/Box';
import applicationConfig from 'ts/store/ApplicationConfig';
import getDefaultConfig from 'ts/helpers/ApplicationConfig/getDefaultConfig';
import statisticStore from 'ts/store/Statistics';

const DEFAULT_CONFIG = getDefaultConfig();

const Salary = observer((): React.ReactElement | null => {
  const [salary, setSalary] = useState<number>(applicationConfig.config?.middleSalaryInMonth);

  return (
    <PageBox>
      <InputNumber
        title="plugin.settings.salary.middle"
        value={salary}
        placeholder={`${DEFAULT_CONFIG.middleSalaryInMonth}`}
        onChange={(value: number) => {
          setSalary(value);
        }}
        onChangeDebounce={(value: string) => {
          const parsedValue = parseInt(value, 10);
          const formattedValue = parsedValue || DEFAULT_CONFIG.middleSalaryInMonth;
          applicationConfig.updateConfigProperty('middleSalaryInMonth', formattedValue);
          statisticStore.updateStatistic();
        }}
      />
    </PageBox>
  );
});

export default Salary;
