import React from 'react';
import { observer } from 'mobx-react-lite';


import isMobile from 'ts/helpers/isMobile';
import fullScreen from 'ts/store/FullScreen';
import statisticStore from 'ts/store/Statistics';

import Quiz from './components/Quiz';
import Races from './components/Races';
import BillBoard from './components/BillBoard';
import SwimmingPool from './components/SwimmingPool';
import style from './styles/quiz.module.scss';

const TeamBuilding = observer((): React.ReactElement => {
  const tracksAuth = statisticStore.statisticsByCommits.author.totalInfo
    .filter((item: any) => !item.isStaff);
  const order = tracksAuth.map((statistic: any) => statistic.totalTaskInDay);
  order.sort((a:number, b:number) => b - a);
  const tracks = tracksAuth.map((statistic: any) => ({
    title: statistic.author,
    position: order.indexOf(statistic.totalTaskInDay) + 1,
    taskInDay: statistic.totalTaskInDay,
    speed: statistic.totalTaskInDay / order[0],
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
        title="plugin.team_building.races.title"
        type="cloud"
      />
      <Races tracks={tracks} />
      <BillBoard
        title="plugin.team_building.swimmingPool.title"
        type="green"
      />
      <SwimmingPool tracks={maxMessageLength}/>
    </>
  );
});

export default TeamBuilding;
