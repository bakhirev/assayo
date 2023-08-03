import React from 'react';

import dataGripStore from 'ts/store/DataGrip';
import Console from 'ts/components/Console';

import style from '../styles/index.module.scss';

function MailMap(): React.ReactElement | null {
  const statistic = dataGripStore.dataGrip.author.statistic.map((item: any) => (
    <p key={item.author}>
      {`${item.author} <${item.firstCommit.email}> <${item.firstCommit.email}>`}
    </p>
  ));

  return (
    <div className={style.races_track}>
      <Console>
        {statistic}
      </Console>
    </div>
  );
}

MailMap.defaultProps = {
  type: '',
  canStart: false,
};

export default MailMap;
