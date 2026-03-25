import React from 'react';

import { useTranslation } from 'ts/components/Translation';
import { SmallCardWithIcon, Section, SectionColumn } from 'ts/components/Layout';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import { getDuration } from 'ts/helpers/formatter';
import statisticStore from 'ts/store/Statistics';

function SmallCards({ user }: PageOptions): React.ReactElement {
  const { t } = useTranslation();
  const scoring = statisticStore.statisticsByCommits.scoring.totalInfoByName[user.author];
  const scoringTotal = statisticStore.statisticsByCommits.scoring.total;
  const [works, dismissed, staff] = [
    'plugin.person_total.small.status.work',
    'plugin.person_total.small.status.dismissed',
    'plugin.person_total.small.status.staff',
  ];

  let status = works;
  if (user.isStaff) status = staff;
  if (user.isDismissed) status = dismissed;
  // вклад в фичи
  // вклад в релизы
  // задачи
  // дней без коммитов

  // первый и последний рабочий день
  // устройство
  // список емайл адресов
  // когда и в каких компаниях работал
  return (
    <Section>
      <SectionColumn>
        <SmallCardWithIcon
          value={t(status)}
          icon="./assets/cards/commits.svg"
          title="plugin.person_total.small.status.title"
        />
        <SmallCardWithIcon
          value={getDuration(user.totalDays)}
          icon="./assets/cards/work_days2.svg"
          title="plugin.person_total.small.totalDays"
          scoring={{
            value: scoring.totalDays,
            total: scoringTotal.totalDays,
          }}
        />
      </SectionColumn>
      <SectionColumn>
        <SmallCardWithIcon
          value={user.lastCountry}
          icon="./assets/cards/location.svg"
          title="plugin.person_total.small.country"
        />
        <SmallCardWithIcon
          value={user.emails[user.emails.length - 1]}
          icon="./assets/cards/mail.svg"
          title="plugin.person_total.small.email"
        />
      </SectionColumn>
    </Section>
  );
}

export default SmallCards;
