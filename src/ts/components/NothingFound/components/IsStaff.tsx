import React from 'react';
import { useTranslation } from 'react-i18next';

import style from '../index.module.scss';

function IsStaff() {
  const { t } = useTranslation();
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
