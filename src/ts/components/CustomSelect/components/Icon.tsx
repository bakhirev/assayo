import React from 'react';

import style from '../styles/icon.module.scss';

interface UiKitSelectIconProps {
  openSearch: boolean;
  setOpenSearch: Function;
}

function UiKitSelectIcon({
  openSearch,
  setOpenSearch,
}: UiKitSelectIconProps) {
  const className = [style.ui_kit_select_icon_button];
  if (openSearch) {
    className.push(style.ui_kit_select_icon_button_open);
  }

  return (
    <div className={style.ui_kit_select_icon}>
      <img
        src="./assets/list/arrow.svg"
        className={className.join(' ')}
        onClick={() => setOpenSearch(!openSearch)}
      />
    </div>
  );
}


export default UiKitSelectIcon;
