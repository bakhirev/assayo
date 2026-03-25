import React, { ReactNode } from 'react';
import { useTranslation } from 'ts/components/Translation';
import If from 'ts/components/Layout/If';

import style from './index.module.scss';

interface TitleBigProps {
  title: string;
  prefix?: string;
  children?: ReactNode | string | number | null;
}

function TitleBig({
  title,
  prefix,
  children,
}: TitleBigProps) {
  const { t } = useTranslation();
  return (
    <div className={style.title_big_wrapper}>
      <If value={prefix}>
        <div className={style.title_big_header_wrapper}>
          <h6 className={style.title_big_header}>
            {t(prefix || '')}
          </h6>
        </div>
      </If>

      <h3 className={style.title_big}>
        {t(title || '')}
      </h3>
      <div className={style.title_big_select}>
        {children}
      </div>
    </div>
  );
}

export default TitleBig;
