import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import Title from 'ts/components/Title';
import Races from 'ts/components/Races';
import CityBuilder from 'ts/components/CityBuilder';

import DataView from 'ts/components/DataView';
import ShowSymbol from 'ts/components/ShowSymbol';
import Column from 'ts/components/Table/components/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import GameConsole from 'ts/components/GameConsole';
import GameBanner from 'ts/components/GameBanner';
import Quize from 'ts/components/Quize';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';

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
  const chartMessageLength = getOptions({ max: maxMessageLength[0].value, suffix: 'сиволов' });

  return (
    <>
      <Title title="Скорость коммитов в день"/>
      <GameConsole />

      <Title title="Квиз"/>
      <Quize />
      <Title title="Скорость закрытия задач"/>
      <Races tracks={tracks} />

      <Title title="Максимальная длинна подписи коммита"/>
      <GameBanner src="./assets/games/wheel.jpg" />
      <DataView rows={maxMessageLength}>
        <Column
          isFixed
          title="Сотрудник"
          properties="title"
          template={(text: string) => (
            <ShowSymbol
              text={text}
              length={14}
              mode="table-row"
            />
          )}
          width={360}
        />
        <Column
          template={ColumnTypesEnum.SHORT_NUMBER}
          properties="value"
          width={50}
        />
        <Column
          title="Количество символов"
          properties="value"
          template={(messageLength: number) => (
            <LineChart
              options={chartMessageLength}
              value={messageLength}
            />
          )}
        />
      </DataView>

      <Title title="Количество созданных файлов, если бы это был город"/>
      <CityBuilder valuesByTitle={addedFilesByAuthor} />

      <Title title="Количество созданных папок"/>
      <DataView rows={maxMessageLength}>
        <Column
          isFixed
          title="Сотрудник"
          properties="title"
          template={(text: string) => (
            <ShowSymbol
              text={text}
              length={14}
              mode="table-row"
            />
          )}
          width={360}
        />
        <Column
          template={ColumnTypesEnum.SHORT_NUMBER}
          properties="value"
          width={50}
        />
        <Column
          title="Количество символов"
          properties="value"
          template={(messageLength: number) => (
            <LineChart
              options={chartMessageLength}
              value={messageLength}
            />
          )}
        />
      </DataView>
      {'Квиз'}
      {'Небоскребы вверх ввиде графика'}
    </>
  );
});

export default TeamBuilding;
