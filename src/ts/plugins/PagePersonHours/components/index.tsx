import React from 'react';
import { observer } from 'mobx-react-lite';

import { HoursChart } from 'ts/components/Charts';
import { Title, SectionWithBg } from 'ts/components/Layout';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';

const Hours = observer(({ user }: PageOptions): React.ReactElement => {
  return (
    <>
      <Title title="page.person.hours.title"/>
      <SectionWithBg>
        <HoursChart statistic={user} />
      </SectionWithBg>
    </>
  );
});

export default Hours;
