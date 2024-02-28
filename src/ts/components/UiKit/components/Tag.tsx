import React from 'react';

import { IUiKitWrapperProps } from './Wrapper';
import style from '../styles/tags.module.scss';

interface IUiKitTagProps extends IUiKitWrapperProps {
  value: string | number;
}

function UiKitTag({
  value,
}: IUiKitTagProps) {
  return (
    <div className={style.ui_kit_tags_item}>
      {value}
    </div>
  );
}

UiKitTag.displayName = 'UiKitTag';

export default UiKitTag;
