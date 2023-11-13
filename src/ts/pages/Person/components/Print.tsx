import React from 'react';
import { observer } from 'mobx-react-lite';

import Title from 'ts/components/Title';
import Description from 'ts/components/Description';
import PageBreak from 'ts/pages/Common/components/PageBreak';
import TableOfContents from 'ts/pages/Common/components/TableOfContents';

import localization from 'ts/helpers/Localization';

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
      <Title title={localization.get('page.print.title', document.title)} />
      <Description text={localization.get('page.print.description')} />
      <br />
      <TableOfContents titles={[
        'page.team.total.titleA',
        'page.person.speed.task',
        'page.person.speed.max',
        'page.team.total.titleB',
        'page.person.achievement.title',
        'page.person.hours.title',
        'page.common.words.title',
      ]}/>
      <PageBreak/>
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
      <PopularWords mode="print"/>
    </>
  );
});

export default Print;
