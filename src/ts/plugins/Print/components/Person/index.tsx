import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { Description } from 'ts/components/Layout';
import PageBreak from 'ts/pages/Common/components/PageBreak';
import TableOfContents from 'ts/pages/Common/components/TableOfContents';

import style from '../Team/index.module.scss';

import Total from './components/Total';
import Achievements from './components/Achievements';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import plugins from 'ts/helpers/Plugins';

const PrintPerson = observer(({ user }: PageOptions): React.ReactElement => {
  const { t } = useTranslation();
  const getPage = (id: string, url: string) => (
    plugins.getById(id)?.getPage?.(url, { user, mode: 'print' })
  );

  return (
    <>
      <div className={style.cover}>
        <h1 className={style.cover_title}>
          {t('page.print.title')}
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
        <Description translationId="page.print.description" />
      </div>
      <PageBreak/>
      <Total user={user}/>
      {getPage('PagePersonSpeed', '/person/speed')}
      {getPage('PagePersonMoney', '/person/money')}
      <PageBreak/>
      <Achievements user={user}/>
      <PageBreak/>
      {getPage('PagePersonHours', '/person/hours')}
      {getPage('PagePersonWeek', '/person/week')}
      <PageBreak/>
      {getPage('PagePersonMonth', '/person/month')}
      {getPage('PagePersonPopularWords', '/person/words')}
    </>
  );
});

export default PrintPerson;
