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

  const firstItem = formattedValues[0];
  const moreItems = formattedValues.slice(1);

  return (
    <div className={style.ui_kit_tags}>
      <UiKitTag value={firstItem} />
      {moreItems.length > 0 ? (
        <UiKitTag
          title={moreItems.join(', ')}
          mode="empty"
          value={`+${moreItems.length}`}
        />
      ) : null}
    </div>
  );
}

UiKitTags.displayName = 'UiKitTags';

export default UiKitTags;
