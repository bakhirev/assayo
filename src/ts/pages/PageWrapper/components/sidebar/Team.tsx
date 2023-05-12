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
      <SideBarMenuGap/>
      <SideBarMenuItem
        id="sprint"
        link="/team/sprint"
        title="sidebar.team.sprint"
        icon="./assets/menu/team_week.svg"
        isSelected={page === 'sprint'}
      />
      <SideBarMenuItem
        id="month"
        link="/team/month"
        title="sidebar.team.month"
        icon="./assets/menu/team_week.svg"
        isSelected={page === 'month'}
      />
      <SideBarMenuItem
        id="year"
        link="/team/year"
        title="sidebar.team.heatmap"
        icon="./assets/menu/team_date_1.svg"
        isSelected={page === 'year'}
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
        id="timestamp"
        link="/team/timestamp"
        title="sidebar.team.timestamp"
        icon="./assets/menu/pull-request.svg"
        isSelected={page === 'timestamp'}
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
    </>
  );
}

export default SideBarTeam;
