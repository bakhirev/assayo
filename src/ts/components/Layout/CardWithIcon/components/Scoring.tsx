import React from 'react';
import { useTranslation } from 'react-i18next';

import style from '../index.module.scss';

export interface IScoringProps {
  title?: string;
  value?: number;
  total?: number;
}

function Scoring({
  title,
  value,
  total,
}: IScoringProps): React.ReactElement | null {
  const { t } = useTranslation();

  if (!value) return null;

  return (
    <div className={style.card_with_icon_scoring_wrapper}>
      <div
        title={t(title || 'page.person.scoring.toolbar')}
        className={style.card_with_icon_scoring}
      >
        {`${value} / ${total || value}`}
      </div>
    </div>
  );
}

Scoring.defaultProps = {
  title: undefined,
  value: undefined,
  total: undefined,
};

export default Scoring;
