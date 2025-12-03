import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import { BillBoard, Races, Quiz, SwimmingPool } from 'ts/components/Games';

import isMobile from 'ts/helpers/isMobile';
import fullScreen from 'ts/store/FullScreen';

import style from './styles/quiz.module.scss';

const TeamBuilding = observer((): React.ReactElement => {
  const tracksAuth = dataGripStore.dataGrip.author.statistic
    .filter((item: any) => !item.isStaff);
  const order = tracksAuth.map((statistic: any) => statistic.taskInDay);
  order.sort((a:number, b:number) => b - a);
  const tracks = tracksAuth.map((statistic: any) => ({
    title: statistic.author,
    position: order.indexOf(statistic.taskInDay) + 1,
    taskInDay: statistic.taskInDay,
    speed: statistic.taskInDay / order[0],
  }));

  const maxMessageLength = [...tracksAuth]
    .sort((a: any, b: any) => b.maxMessageLength - a.maxMessageLength)
    .map((item: any) => ({ title: item.author, value: item.maxMessageLength }));

  const className = fullScreen.isOpen
    ? style.team_building_full_screen_open
    : style.team_building_full_screen_close;

  return (
    <>
      {!isMobile && (
        <img
          src={fullScreen.isOpen
            ? './assets/icons/CloseFullscreen.svg'
            : './assets/icons/OpenFullscreen.svg'}
          className={className}
          onClick={() => {
            fullScreen.toggle();
          }}
        />
      )}
      {Math.random() < 1 && (
        <Quiz />
      )}
      <BillBoard
        title="page.team.building.races.title"
        type="cloud"
      />
      <Races tracks={tracks} />
      <BillBoard
        title="page.team.building.swimmingPool.title"
        type="green"
      />
      <SwimmingPool tracks={maxMessageLength}/>
    </>
  );
});

export default TeamBuilding;
