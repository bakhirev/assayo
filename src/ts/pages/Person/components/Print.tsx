import React from 'react';
import { observer } from 'mobx-react-lite';

import Description from 'ts/components/Description';
import PageBreak from 'ts/pages/Common/components/PageBreak';
import TableOfContents from 'ts/pages/Common/components/TableOfContents';

import localization from 'ts/helpers/Localization';
import style from 'ts/pages/Team/styles/cover.module.scss';

import Hours from './Hours';
import Money from './Money';
import PopularWords from './PopularWords';
import Speed from './Speed';
import Total from './print/Total';
import Achievements from './print/Achievements';
import Week from './Week';
import Month from './Month';

import IPersonCommonProps from '../interfaces/CommonProps';

const Print = observer(({
  user,
}: IPersonCommonProps): React.ReactElement => {
  return (
    <>
      <div className={style.cover}>
        <h1 className={style.cover_title}>
          {localization.get('page.print.title')}
        </h1>
        <h2 className={style.cover_sub_title}>
          {user.author}
        </h2>
        <TableOfContents titles={[
          'page.team.total.titleA',
          'page.person.speed.task',
          'page.person.speed.max',
          'page.team.total.titleB',
          'page.person.achievement.title',
          'page.person.hours.title',
          'page.common.words.title',
        ]}/>
        <Description text={localization.get('page.print.description')}/>
      </div>
      <PageBreak/>
      <Total user={user}/>
      <Speed user={user}/>
      <Money user={user}/>
      <PageBreak/>
      <Achievements user={user}/>
      <PageBreak/>
      <Hours user={user}/>
      <Week
        user={user}
        mode="print"
      />
      <PageBreak/>
      <Month user={user}/>
      <PopularWords
        user={user}
        mode="print"
      />
    </>
  );
});

export default Print;
