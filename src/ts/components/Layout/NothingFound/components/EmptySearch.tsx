import React from 'react';

import { t } from 'ts/helpers/Localization';

import style from '../index.module.scss';

function EmptySearch() {
  return (
    <p className={style.nothing_found_title}>
      {t('uiKit.nothingFound.common.title')}
    </p>
  );
}

export default EmptySearch;
