import React from 'react';

import dataGripStore from 'ts/store/DataGrip';
import { Console } from 'ts/components/Layout';

import style from '../styles/index.module.scss';

function MailMap(): React.ReactElement | null {
  const items = dataGripStore.dataGrip.author.statistic
    .map((item: any) => `${item.author} <${item.firstCommit.email}> <${item.firstCommit.email}>`)
    .sort();
  const commands = items.map((text: any) => (<p key={text}>{text}</p>));
  const commandsForCopy = items.join('\r\n');

  return (
    <div className={style.races_track}>
      <Console textForCopy={commandsForCopy}>
        {commands}
      </Console>
    </div>
  );
}

export default MailMap;
