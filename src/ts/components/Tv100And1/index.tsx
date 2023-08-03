import React from 'react';

import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';

import Title from './components/Title';
import style from './styles/index.module.scss';

interface ITv100And1Props {
  rows: {
    title: string,
    value: number,
  }[];
}

function Tv100And1({
  rows = [],
}: ITv100And1Props): React.ReactElement | null {
  if (!rows || !rows.length) return null;

  const chartOptions = getOptions({ max: rows[0].value, suffix: 'сиволов' });
  const formattedRows = rows.map((row: any) => (
    <div
      key={row.title}
      className={`${style.tv100and1_row}`}
    >
      <Title title={row.title} />
      <div className={`${style.tv100and1_cell_value}`}>
        {row.value}
      </div>
      <div className={`${style.tv100and1_cell_chart}`}>
        <LineChart
          options={chartOptions}
          value={row.value}
        />
      </div>
    </div>
  ));

  return (
    <div className={`${style.tv100and1}`}>
      {formattedRows}
    </div>
  );
}

Tv100And1.defaultProps = {
  rows: [],
};

export default Tv100And1;
