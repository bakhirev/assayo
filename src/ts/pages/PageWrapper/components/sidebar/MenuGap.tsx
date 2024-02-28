import React from 'react';
import { useTranslation } from 'react-i18next';

import style from '../../styles/sidebar.module.scss';

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
