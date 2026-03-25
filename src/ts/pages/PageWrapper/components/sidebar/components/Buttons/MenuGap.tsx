import React from 'react';
import { useTranslation } from 'ts/components/Translation';

import style from '../../index.module.scss';

interface ISideBarMenuGapProps {
  title?: string;
}

function SideBarMenuGap({
  title,
}: ISideBarMenuGapProps) {
  const { t } = useTranslation();
  return (
    <div className={style.sidebar_title}>
      {t(title || '')}
    </div>
  );
}

SideBarMenuGap.defaultProps = {
  title: '',
};

export default SideBarMenuGap;
