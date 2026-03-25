import React from 'react';
import { useTranslation } from 'ts/components/Translation';

import style from './styles/index.module.scss';

interface ExamplesProps {
  examples?: string[];
  onClick: (value: string) => void;
}

function Examples({ examples, onClick }: ExamplesProps) {
  const { t } = useTranslation();

  if (!examples?.length) return null;

  const links = (examples || []).map((text) => (
    <span
      key={text}
      className={style.layout_search_example_item_value}
      onClick={() => onClick(text)}
    >
      {text}
    </span>
  ));

  return (
    <div className={style.layout_search_example_item}>
      <span className={style.layout_search_example_item_title}>
        {t('common.search.example')}
      </span>
      {links}
    </div>
  );
}

export default Examples;
