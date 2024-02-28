import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import Description from 'ts/components/Description';
import TableOfContents from 'ts/pages/Common/components/TableOfContents';
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

import style from '../styles/cover.module.scss';

const Print = observer((): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <>
      <div className={style.cover}>
        <h1 className={style.cover_title}>
          {t('page.print.title')}
        </h1>
        <h2 className={style.cover_sub_title}>
          {document.title}
        </h2>
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
        <Description text={t('page.print.description')}/>
      </div>
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
      <Hours mode="print"/>
      <PopularWords mode="print"/>
    </>
  );
});

export default Print;
