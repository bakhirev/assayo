import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import SelectWithButtons from 'ts/components/UiKit/components/SelectWithButtons';

import Marquee from './components/marquee';

import style from './styles/index.module.scss';


function getSpeedAndMessages(user: string) {
  const byTimestamp = dataGripStore.dataGrip.timestamp.statisticByAuthor[user];
  const commitsInDay = byTimestamp.commitsByTimestampCounter.max;

  const startIndex = byTimestamp.allCommitsByTimestamp.length - 20;
  const messages = byTimestamp.allCommitsByTimestamp.slice(startIndex)
    .reduce((acc: string[], commit: any) => acc.concat(commit.messages), []);

  return {
    speed: commitsInDay,
    messages: Array.from(new Set(messages)) as string[],
  };
}

const GameConsole = observer((): React.ReactElement => {
  const employment = dataGripStore.dataGrip.author.employment;
  const authors = [
    ...employment.active,
    ...employment.dismissed,
  ].map((title: string) => ({ id: title, title }));

  const [user, setUser] = useState<any>(authors[0].id);

  const { speed, messages } = getSpeedAndMessages(user);

  return (
    <div
      className={style.game_console}
    >
      <Marquee
        commitsInDay={speed}
        messages={messages}
      />
      <SelectWithButtons
        value={user}
        options={authors}
        className={style.game_console_select}
        onChange={(newUser: any) => {
          setUser(newUser?.id || newUser);
        }}
      />
    </div>
  );
});

export default GameConsole;
