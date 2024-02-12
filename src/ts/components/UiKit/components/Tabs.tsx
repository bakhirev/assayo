import React, { useRef } from 'react';
import localization from 'ts/helpers/Localization';

import { IUiKitWrapperProps } from './Wrapper';
import style from '../styles/tabs.module.scss';

interface IUiKitTabsProps extends IUiKitWrapperProps {
  multiple?: boolean;
  value: any;
  options: any[];
  onChange: Function;
}

function UiKitTabs({
  value,
  options,
  onChange,
}: IUiKitTabsProps) {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const hasValue = value || value === 0 || value === false;

  const items = (options || [])
    .map((option: any, index: number) => {
      const formattedOption = typeof option !== 'object'
        ? ({ id: option, title: option })
        : option;
      const isSelected = hasValue && value === formattedOption?.id;
      const title = localization.get(formattedOption?.title)
        ?? formattedOption?.id
        ?? '';

      return (
        <button
          key={`${formattedOption?.id}_${index}`}
          className={isSelected
            ? `${style.ui_kit_tabs_item} ${style.ui_kit_tabs_item_selected}`
            : style.ui_kit_tabs_item}
          onClick={(event: any) => {
            onChange(formattedOption);

            const button = event?.target;
            const parent = ref?.current;
            const padding = (parent?.offsetWidth - button?.offsetWidth) / 2;
            parent.scrollLeft = button?.offsetLeft - padding;
          }}
        >
          {title}
        </button>
      );
    });

  return (
    <div
      ref={ref}
      className={`${style.ui_kit_tabs} scroll_x`}
    >
      {items}
    </div>
  );
}

export default UiKitTabs;
