import React from 'react';

import { t } from 'ts/helpers/Localization';

import style from '../index.module.scss';

function IsStaff() {
  return (
    <>
      <p className={style.nothing_found_title}>
        {t('components.nothingFound.staff.title')}
      </p>
      <p className={style.nothing_found_text}>
        {t('components.nothingFound.staff.description')}
      </p>
    </>
  );
}

export default IsStaff;
