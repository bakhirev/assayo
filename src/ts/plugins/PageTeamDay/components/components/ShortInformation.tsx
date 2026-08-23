import React from 'react';
import { observer } from 'mobx-react-lite';

import { SmallCardWithIcon, Section, SectionColumn } from 'ts/components/Layout';

function getTotalInfo(days?: any[]) {
  const tasks = new Set();
  const authors = new Set();
  let hours = 0;
  days?.forEach((day) => {
    Object.keys(day?.tasks).forEach((key: string) => {
      tasks.add(key);
    });
    Object.keys(day?.tasksByAuthor).forEach((author: string) => {
      authors.add(author);
      hours += 8;
    });
  });
  return [tasks.size, authors.size, hours];
}

interface ShortInformationProps {
  days?: any[];
}

const ShortInformation = observer(({
  days,
}: ShortInformationProps): React.ReactElement | null => {
  const [totalTasks, totalAuthors, totalHours] = getTotalInfo(days);
  return (
    <Section>
      <SectionColumn>
        <SmallCardWithIcon
          value={days?.length}
          icon="./assets/cards/work_days2.svg"
          title="plugin.team_day.shortInfo.days.title"
        />
        <SmallCardWithIcon
          value={totalTasks}
          icon="./assets/cards/tasks.svg"
          title="plugin.team_day.shortInfo.tasks.title"
        />
      </SectionColumn>
      <SectionColumn>
        <SmallCardWithIcon
          value={totalAuthors}
          icon="./assets/cards/employees.svg"
          title="plugin.team_day.shortInfo.authors.title"
        />
        <SmallCardWithIcon
          value={totalHours}
          icon="./assets/cards/day.svg"
          title="plugin.team_day.shortInfo.hours.title"
        />
      </SectionColumn>
    </Section>
  );
});

export default ShortInformation;
