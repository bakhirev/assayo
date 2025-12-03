import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { Description } from 'ts/components/Layout';
import TableOfContents from 'ts/pages/Common/components/TableOfContents';
import PageBreak from 'ts/pages/Common/components/PageBreak';
import plugins from 'ts/helpers/Plugins';

import style from './index.module.scss';

const PrintTeam = observer((): React.ReactElement => {
  const { t } = useTranslation();
  const getPage = (id: string, url: string) => (
    plugins.getById(id)?.getPage?.(url, { mode: 'print' })
  );

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
        <Description translationId="page.print.description" />
      </div>
      {getPage('PageTeamTotal', '/team/total')}
      <PageBreak/>
      {getPage('PageTeamScope', '/team/scope')}
      <PageBreak/>
      {getPage('PageTeamAuthor', '/team/author')}
      <PageBreak/>
      {getPage('PageTeamTypes', '/team/types')}
      <PageBreak/>
      {getPage('PageTeamPullRequests', '/team/pr')}
      <PageBreak/>
      {getPage('PageTeamWeeks', '/team/week')}
      <PageBreak/>
      {getPage('PageTeamMonth', '/team/month')}
      <PageBreak/>
      {getPage('PageTeamHours', '/team/hours')}
      <PageBreak/>
      {getPage('PageTeamPopularWords', '/team/words')}
    </>
  );
});

export default PrintTeam;
