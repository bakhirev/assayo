import React from 'react';
import { useParams } from 'react-router-dom';

import SideBarMenuItem from './MenuItem';
import SideBarMenuGap from './MenuGap';

interface ISideBarProps {
  page?: string;
}

function SideBarPerson({ page }: ISideBarProps) {
  const { userId } = useParams<any>();
  const formattedUserId = userId || 0;
  return (
    <>
      <SideBarMenuItem
        id="total"
        link={`/person/total/${formattedUserId}`}
        title="sidebar.person.total"
        icon="./assets/menu/team_common.svg"
        isSelected={page === 'total'}
      />
      <SideBarMenuItem
        id="money"
        link={`/person/money/${formattedUserId}`}
        title="sidebar.person.money"
        icon="./assets/menu/per_money.svg"
        isSelected={page === 'money'}
      />
      <SideBarMenuItem
        id="speed"
        link={`/person/speed/${formattedUserId}`}
        title="sidebar.person.speed"
        icon="./assets/menu/per_speed.svg"
        isSelected={page === 'speed'}
      />
      <SideBarMenuGap/>
      <SideBarMenuItem
        id="week"
        link={`/person/week/${formattedUserId}`}
        title="sidebar.person.week"
        icon="./assets/menu/team_week.svg"
        isSelected={page === 'week'}
      />
      <SideBarMenuItem
        id="month"
        link={`/person/month/${formattedUserId}`}
        title="sidebar.person.month"
        icon="./assets/menu/team_week.svg"
        isSelected={page === 'month'}
      />
      <SideBarMenuItem
        id="year"
        link={`/person/year/${formattedUserId}`}
        title="sidebar.person.frequency"
        icon="./assets/menu/team_date_1.svg"
        isSelected={page === 'year'}
      />
      <SideBarMenuItem
        id="hours"
        link={`/person/hours/${formattedUserId}`}
        title="sidebar.person.hours"
        icon="./assets/menu/team_date_2.svg"
        isSelected={page === 'hours'}
      />
      <SideBarMenuGap/>
      <SideBarMenuItem
        id="commits"
        link={`/person/commits/${formattedUserId}`}
        title="sidebar.person.commits"
        icon="./assets/menu/pull-request.svg"
        isSelected={page === 'commits'}
      />
      <SideBarMenuItem
        id="changes"
        link={`/person/changes/${formattedUserId}`}
        title="sidebar.person.changes"
        icon="./assets/menu/branch.svg"
        isSelected={page === 'changes'}
      />
      <SideBarMenuItem
        id="words"
        link={`/person/words/${formattedUserId}`}
        title="sidebar.person.words"
        icon="./assets/menu/team_words.svg"
        isSelected={page === 'words'}
      />
    </>
  );
}

export default SideBarPerson;
