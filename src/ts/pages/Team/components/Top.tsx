import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import PageWrapper from 'ts/components/Page/wrapper';
import Title from 'ts/components/Title';
import Races from 'ts/components/Races';
import CityBuilder from 'ts/components/CityBuilder';

import Tv100And1 from 'ts/components/Tv100And1';

import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';

const Top = observer((): React.ReactElement => {

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
      <Title title="Скорость закрытия задач"/>
      <Races tracks={tracks} />
      <Title title="Объем созданных файлов"/>
      <CityBuilder />
      {'Небоскребы вверх ввиде графика'}

      <Title title="Максимальная длинна подписи коммита"/>
      <Tv100And1 rows={maxMessageLength} />

      <PageWrapper template="table">
        <DataView rows={maxMessageLength}>
          <Column
            isFixed
            template={ColumnTypesEnum.STRING}
            title="Сотрудник"
            properties="title"
            width={260}
          />
          <Column
            template={ColumnTypesEnum.SHORT_NUMBER}
            properties="value"
            width={40}
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
      </PageWrapper>

    </>
  );
});

export default Top;
