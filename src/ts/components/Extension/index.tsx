import React from 'react';

import Icon from './components/Icon';
import Line from './components/Line';
import style from './styles/index.module.scss';

interface IExtensionProps {
  statistic: any;
}

function Extension({
  statistic,
}: IExtensionProps): React.ReactElement | null {
  if (!statistic || true) return null;

  const getValue = (more: any) => `${more.author} (${more.percent.toFixed(1)}%)`;

  return (
    <div className={style.extension}>
      <Icon title={statistic.extension} />
      <h6>
        Чаще всего
      </h6>
      <Line
        title="Добавляет:"
        value={getValue(statistic.more.added)}
      />
      <Line
        title="Меняет:"
        value={getValue(statistic.more.changes)}
      />
      <Line
        title="Удаляет:"
        value={getValue(statistic.more.removed)}
      />
    </div>
  );
}

Extension.defaultProps = {
  rows: [],
};

export default Extension;
