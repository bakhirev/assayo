import React from 'react';

import { useTranslation } from 'ts/components/Translation';

import style from './index.module.scss';

interface BannerWithInfoProps {
  title?: string;
  description?: string;
  mode?: string;
}

function BannerWithInfo({
  title,
  description,
  mode,
}: BannerWithInfoProps) {
  const { t } = useTranslation();

  const className = [style.banner_with_info];
  if (mode === 'success') className.push(style.banner_with_info_success);
  else if (mode === 'warning') className.push(style.banner_with_info_warning);
  else if (mode === 'alert') className.push(style.banner_with_info_alert);
  else className.push(style.banner_with_info_info);

  return (
    <div className={className.join(' ')}>
      {title ? (
        <div className={style.banner_with_info_title}>
          {t(title)}
        </div>
      ) : null}
      {description ? (
        <div className={style.banner_with_info_description}>
          {t(description)}
        </div>
      ) : null}
    </div>

  );
}

export default BannerWithInfo;
