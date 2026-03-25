import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'ts/components/Translation';

import { Description, Title } from 'ts/components/Layout';
import TableOfContents from 'ts/pages/Common/components/TableOfContents';

import style from '../Team/index.module.scss';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import plugins from 'ts/helpers/Plugins';

const PrintPerson = observer(({ user }: PageOptions): React.ReactElement => {
  const { t } = useTranslation();
  const pagesForPrint = plugins
    .getMenuItems('p')
    .filter((item: any) => item.title);

  const titles = pagesForPrint.map((item: any) => item.title);
  const props = { user, mode: 'print' };
  const pages = pagesForPrint.map((item: any) => (
    <>
      <Title title={item.title} />
      {plugins.getPage(item.link.substring(0, item.link.length - 1), props)}
    </>
  ));

  return (
    <>
      <h1 className={style.plugin_print_title}>
        {t('plugin.print.title')}
      </h1>
      <h2 className={style.plugin_print_sub_title}>
        {user.author}
      </h2>
      <TableOfContents titles={titles}/>
      <Description translationId="plugin.print.description" />
      {pages}
    </>
  );
});

export default PrintPerson;
