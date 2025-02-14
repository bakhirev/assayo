import React from 'react';

import { IUiKitWrapperProps } from './Wrapper';
import UiKitTag from './Tag';
import style from '../styles/tags.module.scss';

interface IUiKitTagsProps extends IUiKitWrapperProps {
  value: any;
}

function UiKitTags({
  value,
}: IUiKitTagsProps) {
  const values = Array.isArray(value) ? value : [value];
  const formattedValues = values.filter((v) => v);
  if (!formattedValues?.length) return null;

  const items = formattedValues
    .map((tagValue: any) => (
      <UiKitTag
        key={tagValue}
        value={tagValue}
      />
    ));

  if (!items?.length) return null;

  return (
    <div className={style.ui_kit_tags}>
      {items}
    </div>
  );
}

UiKitTags.displayName = 'UiKitTags';

export default UiKitTags;
