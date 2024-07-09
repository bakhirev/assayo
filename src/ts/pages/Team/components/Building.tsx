import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import Title from 'ts/components/Title';
import Races from 'ts/components/Races';

import SwimmingPool from 'ts/components/SwimmingPool';
import Quiz from 'ts/components/Quiz';

const TeamBuilding = observer((): React.ReactElement => {
  const tracksAuth = dataGripStore.dataGrip.author.statistic
    .filter((item: any) => !item.isStaff);
  const value = tracksAuth.map((statistic: any) => statistic.taskInDay);
  const max = Math.max(...value);
  const tracks = tracksAuth.map((statistic: any) => ({
    title: statistic.author,
    speed: statistic.taskInDay / max,
  }));

  const maxMessageLength = [...tracksAuth]
    .sort((a: any, b: any) => b.maxMessageLength - a.maxMessageLength)
    .map((item: any) => ({ title: item.author, value: item.maxMessageLength }));

  return (
    <>
      <Quiz />
      <Races tracks={tracks} />
      <Title title="Максимальная длинна подписи коммита"/>
      <SwimmingPool tracks={maxMessageLength}/>
    </>
  );
});

export default TeamBuilding;
