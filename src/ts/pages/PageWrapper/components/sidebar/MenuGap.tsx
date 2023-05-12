import React from 'react';

import localization from 'ts/helpers/Localization';

import style from '../../styles/sidebar.module.scss';

interface ISideBarMenuGapProps {
  title?: string;
}

function SideBarMenuGap({
  title,
}: ISideBarMenuGapProps) {
  return (
    <div className={style.sidebar_title}>
      {localization.get(title)}
    </div>
  );
}

SideBarMenuGap.defaultProps = {
  title: '',
};

export default SideBarMenuGap;
