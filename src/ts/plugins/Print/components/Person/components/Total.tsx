import React from 'react';
import { observer } from 'mobx-react-lite';

import { useTranslation } from 'ts/components/Translation';
import { CardWithIcon, Title, Section, SectionColumn } from 'ts/components/Layout';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';

import style from '../index.module.scss';

const Total = observer(({ user }: PageOptions): React.ReactElement => {
  const { t } = useTranslation();
  const statistic = user;
  const taskNumber = statistic.tasks.length;

  return (
    <Section>
      <SectionColumn>
        <CardWithIcon
          value=""
          icon="./assets/cards/work_days.png"
          title="page.person.print.photo.title"
        />
        <div className={style.place_for_photo}>
          {t('page.person.print.photo.description')}
        </div>
      </SectionColumn>
      <SectionColumn>
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
      </SectionColumn>
    </Section>
  );
});

export default Total;
