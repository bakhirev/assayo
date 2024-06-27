import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import Title from 'ts/components/Title';
import Races from 'ts/components/Races';
import CityBuilder from 'ts/components/CityBuilder';

import SwimmingPool from 'ts/components/SwimmingPool';
import Quize from 'ts/components/Quize';

const TeamBuilding = observer((): React.ReactElement => {
  const filesByAuthor = dataGripStore.fileGrip.author?.statisticByName || {};
  const addedFilesByAuthor = Object.entries(filesByAuthor)
    .reduce((acc: any, item: any) => {
      acc[item[0]] = item[1].addedFiles;
      return acc;
    }, {});

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

      <Title title="Квиз"/>
      <Quize />
      <Title title="Скорость закрытия задач"/>
      <Races tracks={tracks} />
      <Title title="Максимальная длинна подписи коммита"/>
      <SwimmingPool tracks={maxMessageLength}/>

      <Title title="Количество созданных файлов, если бы это был город"/>
      <CityBuilder valuesByTitle={addedFilesByAuthor} />
      <Title title="Скорость коммитов в день"/>
      {'Небоскребы вверх ввиде графика'}
    </>
  );
});

export default TeamBuilding;
