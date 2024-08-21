import React from 'react';

import { t } from 'ts/helpers/Localization';

import style from '../index.module.scss';

function IsStaff() {
  return (
    <>
      <p className={style.nothing_found_title}>
        {t('uiKit.nothingFound.staff.title')}
      </p>
      <p className={style.nothing_found_text}>
        {t('uiKit.nothingFound.staff.description1')}
      </p>
      <p className={style.nothing_found_text}>
        {t('uiKit.nothingFound.staff.description2')}
      </p>
    </>
  );
}

export default IsStaff;
