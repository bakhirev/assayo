import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import getAchievementByAuthor from 'ts/helpers/achievement/byAuthor';
import ACHIEVEMENT_TYPE from 'ts/helpers/achievement/constants/type';
import localization from 'ts/helpers/Localization';

import CardWithIcon from 'ts/components/CardWithIcon';
import Achievements from 'ts/components/Achievement';
import Description from 'ts/components/Description';
import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import Title from 'ts/components/Title';

import dataGripStore from 'ts/store/DataGrip';

interface IAchievementBlockProps {
  title: string;
  achievements: string[];
}

function AchievementBlock({ title, achievements }: IAchievementBlockProps) {
  if (!achievements.length) return null;
  return (
    <>
      <Description text={`# ${title}`}/>
      <Achievements list={achievements} />
    </>
  );
}

const Total = observer((): React.ReactElement => {
  const { userId } = useParams<any>();
  const statistic = dataGripStore.dataGrip.author.statistic[userId || 0];
  const taskNumber = statistic.tasks.length;
  const achievements = getAchievementByAuthor(statistic.author);

  return (
    <PageWrapper>
      <PageColumn>
        <Title title={localization.get('Основные характеристики')}/>
        <div>
          <CardWithIcon
            value={statistic.daysWorked}
            icon="./assets/cards/work_days.png"
            title="page.team.total.daysWorked.title"
            description="page.team.total.daysWorked.description"
          />
          <CardWithIcon
            value={taskNumber ? taskNumber : null}
            icon="./assets/cards/tasks.png"
            title="задач"
            description="Если коммиты правильно подписаны"
          />
          <CardWithIcon
            value={statistic.daysLosses}
            icon="./assets/cards/lazy.png"
            title="page.team.total.daysLosses.title"
            description="page.team.total.daysLosses.description"
          />
          <CardWithIcon
            value={statistic.commits}
            icon="./assets/cards/commits.png"
            title="page.team.total.commits.title"
            description="page.team.total.commits.description"
          />
        </div>
      </PageColumn>
      <PageColumn>
        <Title title={localization.get('Достижения')}/>
        <AchievementBlock
          title="Позитивные"
          achievements={achievements[ACHIEVEMENT_TYPE.GOOD]}
        />
        <AchievementBlock
          title="Нейтральные"
          achievements={achievements[ACHIEVEMENT_TYPE.NORMAL]}
        />
        <AchievementBlock
          title="Негативные"
          achievements={achievements[ACHIEVEMENT_TYPE.BAD]}
        />
        <Description text="Чем больше сотрудник набрал отрицательных достижений, тем больше вероятность, что ситуация нестандартная. Возможно, стоит изменить режим его работы, задачи или отчётность. Следует поговорить с ним и узнать, какие проблемы мешают его работе."/>
      </PageColumn>
    </PageWrapper>
  );
});

export default Total;
