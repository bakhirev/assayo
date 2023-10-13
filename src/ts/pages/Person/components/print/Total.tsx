import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import CardWithIcon from 'ts/components/CardWithIcon';
import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import Title from 'ts/components/Title';

import dataGripStore from 'ts/store/DataGrip';
import localization from 'ts/helpers/Localization';

import style from '../../styles/print.module.scss';

const Total = observer((): React.ReactElement => {
  const { userId } = useParams<any>();
  const statistic = dataGripStore.dataGrip.author.statistic[userId || 0];
  const taskNumber = statistic.tasks.length;

  return (
    <PageWrapper>
      <PageColumn>
        <CardWithIcon
          value=""
          icon="./assets/cards/work_days.png"
          title="page.person.print.photo.title"
        />
        <div className={style.place_for_photo}>
          {localization.get('page.person.print.photo.description')}
        </div>
      </PageColumn>
      <PageColumn>
        <Title title={statistic.author} />
        <div>
          <CardWithIcon
            value={statistic.daysWorked}
            icon="./assets/cards/work_days.png"
            title="page.person.total.daysWorked.title"
            description="page.person.total.daysWorked.description"
          />
          <CardWithIcon
            value={taskNumber ? taskNumber : null}
            icon="./assets/cards/tasks.png"
            title="page.person.total.tasks.title"
            description="page.person.total.tasks.description"
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
    </PageWrapper>
  );
});

export default Total;
