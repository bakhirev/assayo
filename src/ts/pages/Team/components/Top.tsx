import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import Achievement from 'ts/components/Achievement/components/Item';
import PageWrapper from 'ts/components/Page/wrapper';
import Extension from 'ts/components/Extension';
import Title from 'ts/components/Title';
import Races from 'ts/components/Races';

import Tv100And1 from 'ts/components/Tv100And1';

import ACHIEVEMENT_TYPE from 'ts/helpers/achievement/constants/type';
import getAchievementByAuthor from 'ts/helpers/achievement/byAuthor';
import Description from 'ts/components/Description';
import { getDate } from 'ts/helpers/formatter';

import style from '../styles/quiz.module.scss';

const Top = observer((): React.ReactElement => {
  const extensions = dataGripStore.dataGrip.extension.statistic
    .slice(0, 4).map((statistic: any) => {
      return (
        <Extension
          key={statistic.extension}
          statistic={statistic}
        />
      );
    });

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

  const authors = dataGripStore.dataGrip.author.statistic.map((statistic: any) => {
    const achievements = getAchievementByAuthor(statistic.author);
    const from = getDate(statistic.firstCommit.date);
    const to = getDate(statistic.lastCommit.date);
    const achievementsList = [
      ...achievements[ACHIEVEMENT_TYPE.GOOD],
      ...achievements[ACHIEVEMENT_TYPE.NORMAL],
      ...achievements[ACHIEVEMENT_TYPE.BAD],
    ].map((type: string) => (
      <Achievement
        key={type}
        type={type}
      />
    ));

    return (
      <div key={statistic.author}>
        <Title title={statistic.author}/>
        <Description text={`Всего коммитов: ${statistic.commits}`} />
        <Description text={`Работал с ${from} по ${to} (${statistic.allDaysInProject} дней)`} />
        <PageWrapper>
          <div className={style.quiz_achievements}>
            {achievementsList}
          </div>
        </PageWrapper>
      </div>
    );
  });

  return (
    <>
      <Title title="Скорость закрытия задач"/>
      <Races tracks={tracks} />
      <Title title="Максимальная длинна подписи коммита"/>
      <Tv100And1 rows={maxMessageLength} />
      {authors}
      <PageWrapper>
        <div style={{ whiteSpace: 'normal' }} >
          {extensions}
        </div>
      </PageWrapper>
    </>
  );
});

export default Top;
