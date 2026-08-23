import React from 'react';
import { useTranslation } from 'ts/components/Translation';

import { IUiKitWrapperProps } from './Wrapper';
import style from '../styles/tags.module.scss';

interface IUiKitTagProps extends IUiKitWrapperProps {
  value: string | number;
  title?: string;
  mode?: string;
}

export const UiKitTagMode = {
  ERROR: 'error',
  WARNING: 'warning',
  SUCCESS: 'success',
};

const REF_MODE_CLASS_NAME = {
  [UiKitTagMode.ERROR]: style.ui_kit_tags_item_error,
  [UiKitTagMode.WARNING]: style.ui_kit_tags_item_warning,
  [UiKitTagMode.SUCCESS]: style.ui_kit_tags_item_success,
  empty: style.ui_kit_tags_item_empty,
};

function UiKitTag({
  value,
  title,
  mode,
}: IUiKitTagProps) {
  const { t } = useTranslation();
  const className = mode
    ? `${style.ui_kit_tags_item} ${REF_MODE_CLASS_NAME[mode] || ''}`
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
