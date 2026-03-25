import React from 'react';
import { useTranslation } from 'ts/components/Translation';

import style from '../index.module.scss';

export interface IScoringProps {
  id?: string;
  title?: string;
  value?: number;
  total?: number;
}

function Scoring({
  id,
  title,
  value,
  total,
}: IScoringProps): React.ReactElement | null {
  const { text } = useTranslation();

  if (!value) return null;

  return (
    <div className={style.card_with_icon_scoring_wrapper}>
      <div
        id={id}
        title={text(title || 'page.person.scoring.toolbar')}
        className={style.card_with_icon_scoring}
      >
        {`${value} / ${total || value}`}
      </div>
    </div>
  );
}

Scoring.defaultProps = {
  id: undefined,
  title: undefined,
  value: undefined,
  total: undefined,
};

export default Scoring;
