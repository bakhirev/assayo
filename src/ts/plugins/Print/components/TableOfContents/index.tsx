import React from 'react';

import { useTranslation } from 'ts/components/Translation';
import { Title } from 'ts/components/Layout';

import style from './index.module.scss';

interface ITableOfContents {
  titles?: string[];
}

function TableOfContents({ titles }: ITableOfContents) {
  const { t } = useTranslation();

  const items = (titles || []).map((title) => (
    <a
      key={title}
      className={style.plugin_print_table_of_contents_item}
      href={`#${title}`}
    >
      {t(title || '')}
    </a>
  ));

  return (
    <>
      <Title
        className={style.plugin_print_table_of_contents_title}
        title="plugin.print.tableOfContents"
      />
      <nav className={style.plugin_print_table_of_contents}>
        {items}
      </nav>
    </>
  );
}

export default TableOfContents;
