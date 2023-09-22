import React from 'react';
import { observer } from 'mobx-react-lite';

import PageBreak from 'ts/pages/Common/components/PageBreak';

import Hours from './Hours';
import Money from './Money';
import PopularWords from './PopularWords';
import Speed from './Speed';
import Total from './print/Total';
import Achievements from './print/Achievements';
import Week from './Week';
import Month from './Month';

const Print = observer((): React.ReactElement => {
  return (
    <>
      <Total/>
      <Speed/>
      <Money/>
      <PageBreak/>
      <Achievements/>
      <PageBreak/>
      <Hours/>
      <Week mode="print"/>
      <PageBreak/>
      <Month/>
      <Hours/>
      <PopularWords mode="print"/>
    </>
  );
});

export default Print;
