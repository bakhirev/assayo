import React from 'react';

import Title from 'ts/components/Title';
import localization from 'ts/helpers/Localization';

import style from '../styles/table-of-contents.module.scss';

interface ITableOfContents {
  titles?: string[];
}

function TableOfContents({ titles }: ITableOfContents) {
  const items = (titles || []).map((title) => (
    <li
      key={title}
      className={style.table_of_contents_item}
    >
      {localization.get(title || '')}
    </li>
  ));

  return (
    <>
      <Title title="page.print.tableOfContents" />
      <ul className={style.table_of_contents}>
        {items}
      </ul>
    </>
  );
}

export default TableOfContents;
