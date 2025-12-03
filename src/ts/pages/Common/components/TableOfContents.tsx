import React from 'react';
import { useTranslation } from 'react-i18next';

import { Title } from 'ts/components/Layout';

import style from '../styles/table-of-contents.module.scss';

interface ITableOfContents {
  titles?: string[];
}

function TableOfContents({ titles }: ITableOfContents) {
  const { t } = useTranslation();

  const items = (titles || []).map((title) => (
    <a
      key={title}
      className={style.table_of_contents_item}
      href={`#${title}`}
    >
      {t(title || '')}
    </a>
  ));

  return (
    <>
      <Title
        className={style.table_of_contents_title}
        title="page.print.tableOfContents"
      />
      <nav className={style.table_of_contents}>
        {items}
      </nav>
    </>
  );
}

export default TableOfContents;
