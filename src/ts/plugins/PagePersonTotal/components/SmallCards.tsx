import React, { useMemo } from 'react';

import { IPagination } from "ts/interfaces/Pagination";
import { useTranslation } from 'ts/components/Translation';
import { SmallCardWithIcon, Section, SectionColumn } from 'ts/components/Layout';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import { getDuration } from 'ts/helpers/formatter';
import { getMaxValues } from "ts/helpers/charts";
import statisticStore from 'ts/store/StatisticsByCommitsStore';

import ProgressCard from './ProgressCard';
import ProgressLine from './ProgressLine';

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

  const content = statisticStore.statisticsByCommits.author.totalInfo;
  const [
    maxTotalDays,
    maxTotalTasks,
    maxTotalTaskInDay,
    maxCommits,
    maxMiddleMessageLength,
  ] = useMemo(() => {
    return getMaxValues({ content } as IPagination<any>, [
      'totalDays',
      'totalTasks',
      'totalTaskInDay',
      'commits',
      'middleMessageLength',
    ]);
  }, [statisticStore.hash]);
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
        <ProgressCard>
          <ProgressLine
            value={user.totalDays}
            max={maxTotalDays}
            title="plugin.person_total.progress.dayWorks"
            icon="./assets/rating/days.svg"
          />
          <ProgressLine
            value={user.totalTasks}
            max={maxTotalTasks}
            title="plugin.person_total.progress.tasks"
            icon="./assets/rating/tasks.svg"
          />
          <ProgressLine
            value={user.totalTaskInDay}
            max={maxTotalTaskInDay}
            title="plugin.person_total.progress.taskInDay"
            icon="./assets/rating/speed.svg"
          />
          <ProgressLine
            value={user.commits}
            max={maxCommits}
            title="plugin.person_total.progress.commits"
            icon="./assets/rating/commit.svg"
          />
          <ProgressLine
            value={user.middleMessageLength}
            max={maxMiddleMessageLength}
            title="plugin.person_total.progress.middleMessageLength"
            icon="./assets/rating/text.svg"
          />
        </ProgressCard>
      </SectionColumn>
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
        <SmallCardWithIcon
          value={user.lastCountry}
          icon="./assets/cards/location.svg"
          title="plugin.person_total.small.country"
        />
        <SmallCardWithIcon
          value={user.emails[0]}
          icon="./assets/cards/mail.svg"
          title="plugin.person_total.small.email"
        />
      </SectionColumn>
    </Section>
  );
}

export default SmallCards;
