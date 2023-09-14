import React from 'react';

import SideBarMenuItem from './MenuItem';
import SideBarMenuGap from './MenuGap';

interface ISideBarProps {
  page?: string;
}

function SideBarTeam({ page }: ISideBarProps) {
  return (
    <>
      <SideBarMenuItem
        id="total"
        link="/team/total"
        title="sidebar.team.total"
        icon="./assets/menu/team_common.svg"
        isSelected={page === 'total' || !page}
      />
      <SideBarMenuItem
        id="scope"
        link="/team/scope"
        title="sidebar.team.scope"
        icon="./assets/menu/team_feat.svg"
        isSelected={page === 'scope'}
      />
      <SideBarMenuItem
        id="author"
        link="/team/author"
        title="sidebar.team.author"
        icon="./assets/menu/team_work.svg"
        isSelected={page === 'author'}
      />
      <SideBarMenuItem
        id="type"
        link="/team/type"
        title="sidebar.team.type"
        icon="./assets/menu/team_type.svg"
        isSelected={page === 'type'}
      />
      <SideBarMenuItem
        id="type"
        link="/team/pr"
        title="sidebar.team.pr"
        icon="./assets/menu/pull_request.svg"
        isSelected={page === 'pr'}
      />
      <SideBarMenuGap/>
      <SideBarMenuItem
        id="day"
        link="/team/day"
        title="sidebar.team.day"
        icon="./assets/menu/team_week.svg"
        isSelected={page === 'day'}
      />
      <SideBarMenuItem
        id="week"
        link="/team/week"
        title="sidebar.team.week"
        icon="./assets/menu/team_week.svg"
        isSelected={page === 'week'}
      />
      <SideBarMenuItem
        id="month"
        link="/team/month"
        title="sidebar.team.month"
        icon="./assets/menu/team_date_1.svg"
        isSelected={page === 'month'}
      />
      <SideBarMenuItem
        id="hours"
        link="/team/hours"
        title="sidebar.team.hours"
        icon="./assets/menu/team_date_2.svg"
        isSelected={page === 'hours'}
      />
      <SideBarMenuGap/>
      <SideBarMenuItem
        id="tree"
        link="/team/tree"
        title="sidebar.team.tree"
        icon="./assets/menu/team_files.svg"
        isSelected={page === 'tree'}
      />
      <SideBarMenuItem
        id="commits"
        link="/team/commits"
        title="sidebar.team.commits"
        icon="./assets/menu/pull-request.svg"
        isSelected={page === 'commits'}
      />
      <SideBarMenuItem
        id="changes"
        link="/team/changes"
        title="sidebar.team.changes"
        icon="./assets/menu/branch.svg"
        isSelected={page === 'changes'}
      />
      <SideBarMenuItem
        id="words"
        link="/team/words"
        title="sidebar.team.words"
        icon="./assets/menu/team_words.svg"
        isSelected={page === 'words'}
      />
      {/*<SideBarMenuGap/>*/}
      {/*<SideBarMenuItem*/}
      {/*  id="top"*/}
      {/*  link="/team/top"*/}
      {/*  title="sidebar.team.top"*/}
      {/*  icon="./assets/menu/team_words.svg"*/}
      {/*  isSelected={page === 'top'}*/}
      {/*/>*/}
    </>
  );
}

export default SideBarTeam;
