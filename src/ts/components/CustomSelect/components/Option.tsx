import React from 'react';

import style from '../styles/index.module.scss';

interface UiKitSelectOptionProps {
  option: any;
  focus?: boolean;
  className?: string;
  onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

function UiKitSelectOption({
  option,
  focus,
  className,
  onClick,
}: UiKitSelectOptionProps) {
  let localClassName = [style.ui_kit_select_option];
  if (className) localClassName.push(className);
  if (focus) localClassName.push(style.ui_kit_select_option_focus);

  return (
    <li
      className={localClassName.join(' ')}
      onClick={onClick}
    >
      {option.title}
    </li>
  );
}


export default UiKitSelectOption;
