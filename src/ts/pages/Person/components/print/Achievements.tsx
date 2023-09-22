import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import getAchievementByAuthor from 'ts/helpers/achievement/byAuthor';
import ACHIEVEMENT_TYPE from 'ts/helpers/achievement/constants/type';
import localization from 'ts/helpers/Localization';

import Achievements from 'ts/components/Achievement';
import Description from 'ts/components/Description';
import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import Title from 'ts/components/Title';
import GetList from 'ts/components/GetList';

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
  const commitsWithGet = dataGripStore.dataGrip.get.getsByAuthor[statistic.author];
  const achievements = getAchievementByAuthor(statistic.author);

  return (
    <PageWrapper>
      <PageColumn>
        <Title title={localization.get('Достижения')}/>
        <AchievementBlock
          title="Позитивные"
          achievements={achievements[ACHIEVEMENT_TYPE.GOOD]}
        />
      </PageColumn>
      <PageColumn>
        <Title title={localization.get('_')}/>
        <AchievementBlock
          title="Нейтральные"
          achievements={achievements[ACHIEVEMENT_TYPE.NORMAL]}
        />
        <AchievementBlock
          title="Негативные"
          achievements={achievements[ACHIEVEMENT_TYPE.BAD]}
        />
        <br />
        <br />
        {commitsWithGet?.length ? (
          <>
            <Title title={localization.get('Взятые геты:')}/>
            <GetList
              mode="print"
              list={commitsWithGet}
            />
            <Description text="&laquo;Взять гет&raquo; в данном случае означает первым оставить коммит к&nbsp;задаче с&nbsp;&laquo;красивым&raquo; номером."/>
          </>
        ) : null}
      </PageColumn>
    </PageWrapper>
  );
});

export default Total;
