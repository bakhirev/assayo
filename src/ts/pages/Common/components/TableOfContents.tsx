import React from 'react';

import Title from 'ts/components/Title';
import localization from 'ts/helpers/Localization';

import style from '../styles/table-of-contents.module.scss';

interface ITableOfContents {
  titles?: string[];
}

function TableOfContents({ titles }: ITableOfContents) {
  const items = (titles || []).map((title) => (
    <a
      key={title}
      className={style.table_of_contents_item}
      href={`#${title}`}
    >
      {localization.get(title || '')}
    </a>
  ));

  return (
    <>
      <Title title="page.print.tableOfContents" />
      <nav className={style.table_of_contents}>
        {items}
      </nav>
    </>
  );
}

export default TableOfContents;
