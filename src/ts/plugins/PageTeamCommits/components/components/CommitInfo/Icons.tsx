import React from 'react';

import ICommit from 'ts/interfaces/Commit';
import { SmallCardWithIcon, Section, SectionColumn, If } from 'ts/components/Layout';
import { getFullTime } from 'ts/helpers/formatter';

interface IconsProps {
  commit: ICommit;
}

function Icons({ commit }: IconsProps): React.ReactElement | null {
  return (
    <Section>
      <SectionColumn>
        <SmallCardWithIcon
          value={getFullTime(commit.date)}
          icon="./assets/cards/day.svg"
          title="plugin.team_commits.info.date"
        />
        <SmallCardWithIcon
          value={commit.country}
          icon="./assets/cards/location.svg"
          title="plugin.team_commits.info.location"
        />
      </SectionColumn>
      <SectionColumn>
        <If value={commit.device}>
          <SmallCardWithIcon
            value={commit.task}
            icon="./assets/cards/tasks.svg"
            title="plugin.team_commits.info.task"
          />
        </If>
        <If value={!commit.device}>
          <SmallCardWithIcon
            value={commit.email}
            icon="./assets/cards/mail.svg"
            title="plugin.team_commits.info.email"
          />
        </If>

        <SmallCardWithIcon
          value={commit.device}
          icon="./assets/cards/device.svg"
          title="plugin.team_commits.info.device"
        />
        <If value={!commit.device}>
          <SmallCardWithIcon
            value={commit.task}
            icon="./assets/cards/tasks.svg"
            title="plugin.team_commits.info.task"
          />
        </If>
        <If value={!commit.device && !commit.task}>
          <SmallCardWithIcon
            value={commit.company}
            icon="./assets/cards/employees.svg"
            title="plugin.team_commits.info.company"
          />
        </If>
      </SectionColumn>
    </Section>
  );
}

export default Icons;
