import React from 'react';
import { useTranslation } from 'ts/components/Translation';

import { IUiKitWrapperProps } from './Wrapper';
import style from '../styles/tags.module.scss';

interface IUiKitTagProps extends IUiKitWrapperProps {
  value: string | number;
  title?: string;
  mode?: string;
}

function UiKitTag({
  value,
  title,
  mode,
}: IUiKitTagProps) {
  const { t } = useTranslation();
  const className = mode
    ? `${style.ui_kit_tags_item} ${style.ui_kit_tags_item_empty}`
    : style.ui_kit_tags_item;

  return (
    <div
      title={title}
      className={className}
    >
      {t(`${value}`) || value}
    </div>
  );
}

UiKitTag.displayName = 'UiKitTag';

export default UiKitTag;
