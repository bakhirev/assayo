import React from 'react';
import { useTranslation } from 'react-i18next';

import { IUiKitWrapperProps } from './Wrapper';
import style from '../styles/tags.module.scss';

interface IUiKitTagProps extends IUiKitWrapperProps {
  value: string | number;
}

function UiKitTag({
  value,
}: IUiKitTagProps) {
  const { t } = useTranslation();
  return (
    <div className={style.ui_kit_tags_item}>
      {t(`${value}`) || value}
    </div>
  );
}

UiKitTag.displayName = 'UiKitTag';

export default UiKitTag;
