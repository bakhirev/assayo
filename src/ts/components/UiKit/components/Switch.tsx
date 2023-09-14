import React from 'react';

import Wrapper, { IUiKitWrapperProps } from './Wrapper';
import style from '../styles/switch.module.scss';

interface IUiKitSwitchProps extends IUiKitWrapperProps {
  multiple?: boolean;
  value: any;
  options: any[];
  onChange: Function;
}

function UiKitSwitch({
  title,
  description,
  help,
  error,
  className,

  value,
  options,
  onChange,
}: IUiKitSwitchProps) {
  const hasValue = value || value === 0 || value === false;
  let selectedIds = value;
  if (hasValue && !Array.isArray(value)) {
    selectedIds = [value];
  }

  const items = (options || [])
    .map((option: any, index: number) => {
      const formattedOption = typeof option !== 'object'
        ? ({ id: option, title: option })
        : option;
      const isSelected = hasValue && selectedIds.includes(formattedOption?.id);

      return (
        <button
          key={`${formattedOption?.id}_${index}`}
          className={isSelected
            ? `${style.ui_kit_switch_item} ${style.ui_kit_switch_item_selected}`
            : style.ui_kit_switch_item}
          onClick={() => {
            if (!onChange) return;

            const newSelected = isSelected
              ? selectedIds.filter((id: any) => id !== formattedOption?.id)
              : [...selectedIds, formattedOption?.id].sort();

            onChange(newSelected);
          }}
        >
          {formattedOption?.title ?? formattedOption?.id ?? ''}
        </button>
      );
    });

  return (
    <Wrapper
      title={title}
      description={description}
      help={help}
      error={error}
      className={className}
    >
      <div className={style.ui_kit_switch}>
        {items}
      </div>
    </Wrapper>
  );
}

export default UiKitSwitch;
