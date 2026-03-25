import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'ts/components/Translation';

import { Description, Title } from 'ts/components/Layout';
import TableOfContents from 'ts/pages/Common/components/TableOfContents';
import plugins from 'ts/helpers/Plugins';

import style from './index.module.scss';

const IGNORE_PAGE = [
  '/team/files',
  '/team/removedFiles',
  '/team/recommendations',
  '/team/building',
];

const PrintTeam = observer((): React.ReactElement => {
  const { t } = useTranslation();
  const pagesForPrint = plugins
    .getMenuItems('t')
    .filter((item: any) => item.title && !IGNORE_PAGE.includes(item.link));

  const titles = pagesForPrint.map((item: any) => item.title);
  const props = { mode: 'print' };
  const pages = pagesForPrint.map((item: any) => (
    <>
      <Title title={item.title} />
      {plugins.getPage(item.link, props)}
    </>
  ));

  return (
    <>
      <h1 className={style.plugin_print_title}>
        {t('plugin.print.title')}
      </h1>
      <h2 className={style.plugin_print_sub_title}>
        {document.title}
      </h2>
      <TableOfContents titles={titles}/>
      <Description translationId="plugin.print.description" />
      {pages}
    </>
  );
});

export default PrintTeam;
