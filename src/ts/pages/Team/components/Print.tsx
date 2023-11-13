import React from 'react';
import { observer } from 'mobx-react-lite';

import Title from 'ts/components/Title';
import Description from 'ts/components/Description';
import TableOfContents from 'ts/pages/Common/components/TableOfContents';
import PageBreak from 'ts/pages/Common/components/PageBreak';

import localization from 'ts/helpers/Localization';

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
      <Title title={localization.get('page.print.title', document.title)} />
      <Description text={localization.get('page.print.description')} />
      <br />
      <TableOfContents titles={[
        'page.team.total.titleA',
        'page.team.total.titleB',
        'page.team.scope.title',
        'page.team.author.title',
        'page.team.type.title',
        'page.team.pr.oneTaskDays',
        'page.team.pr.statByAuthors',
        'page.team.pr.longDelay',
        'page.team.hours.title',
        'page.common.words.title',
      ]}/>
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
