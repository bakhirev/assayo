import React from 'react';
import { observer } from 'mobx-react-lite';

import PageBreak from 'ts/pages/Common/components/PageBreak';

import Author from './Author';
import Hours from './Hours';
import PopularWords from './PopularWords';
import Scope from './Scope';
import Total from './Total';
import Type from './Type';
import Week from './Week';
import Month from './Month';
import Pr from './PR';

const Print = observer((): React.ReactElement => {
  return (
    <>
      <Total/>
      <PageBreak/>
      <Scope mode="print"/>
      <PageBreak/>
      <Author mode="print"/>
      <PageBreak/>
      <Type mode="print"/>
      <PageBreak/>
      <Pr mode="print"/>
      <PageBreak/>
      <Week mode="print"/>
      <PageBreak/>
      <Month mode="print"/>
      <Hours/>
      <PopularWords/>
    </>
  );
});

export default Print;
