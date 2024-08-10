import React from 'react';

import style from '../styles/index.module.scss';

interface UiKitSelectValueProps {
  value: any;
  options: any;
  className?: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function UiKitSelectValue({
  value,
  className,
  onClick,
}: UiKitSelectValueProps) {
  return (
    <div
      className={`${style.ui_kit_select_value} ${className || ''}`}
      onClick={onClick}
    >
      {value}
    </div>
  );
}


export default UiKitSelectValue;
