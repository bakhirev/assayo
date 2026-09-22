import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import InputNumber from 'ts/components/UiKit/components/InputNumber';
import applicationConfig from 'ts/store/ApplicationConfig';
import getDefaultConfig from 'ts/helpers/ApplicationConfig/getDefaultConfig';
import statisticStore from 'ts/store/StatisticsByCommitsStore';

import Box from '../Box';

const DEFAULT_CONFIG = getDefaultConfig();

const Salary = observer((): React.ReactElement | null => {
  const [salary, setSalary] = useState<number>(applicationConfig.config?.middleSalaryInMonth);

  return (
    <Box>
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
    </Box>
  );
});

export default Salary;
