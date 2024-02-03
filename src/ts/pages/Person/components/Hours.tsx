import React from 'react';
import { observer } from 'mobx-react-lite';

import HoursChart from 'ts/components/HoursChart';
import Title from 'ts/components/Title';
import PageWrapper from 'ts/components/Page/wrapper';
import IPersonCommonProps from '../interfaces/CommonProps';

const Hours = observer(({ user }: IPersonCommonProps): React.ReactElement => {
  return (
    <>
      <Title title="page.person.hours.title"/>
      <PageWrapper template="table">
        <HoursChart statistic={user} />
      </PageWrapper>
    </>
  );
});

export default Hours;
