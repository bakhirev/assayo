import React from 'react';
import { useTranslation } from 'ts/components/Translation';

import style from './styles/index.module.scss';

interface ExamplesProps {
  example: string[];
  onClick: (value: string) => void;
}

function Examples({ example, onClick }: ExamplesProps) {
  const { t } = useTranslation();

  const links = example.map((text) => (
    <span
      key={text}
      className={style.team_commit_search_example_item_title}
      onClick={() => onClick(text)}
    >
      {text}
    </span>
  ));

  return (
    <div className={style.team_commit_search_example_item}>
      <span className={style.team_commit_search_example_item_value}>
        {t('plugin.team_commits.example.title')}
      </span>
      <span className={style.team_commit_search_example_item_title}>
        {links}
      </span>
    </div>
  );
}

export default Examples;
