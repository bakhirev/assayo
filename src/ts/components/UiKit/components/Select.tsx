import React, { ChangeEvent } from 'react';

import Wrapper, { IUiKitWrapperProps } from './Wrapper';
import style from '../styles/index.module.scss';
import styleSelect from '../styles/select.module.scss';

interface IUiKitSelectProps extends IUiKitWrapperProps {
  value: any;
  options: any[];
  onChange: Function;
}

function UiKitSelect({
  title,
  description,
  help,
  error,
  className,

  value,
  options,
  onChange,
}: IUiKitSelectProps) {
  const items = (options || [])
    .map((option: any, index: number) => {
      const formattedOption = typeof option !== 'object'
        ? ({ id: option, title: option })
        : option;

      return (
        <option
          key={`${formattedOption?.id}_${index}`}
          value={formattedOption?.id ?? null}
          selected={value === formattedOption?.id}
        >
          {formattedOption?.title ?? formattedOption?.id ?? ''}
        </option>
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
      <select
        className={`${style.ui_kit_common} ${styleSelect.ui_kit_select} ${className || ''}`}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
          const selectedValue = event.target.value;
          const formattedValue = selectedValue !== 'null'
            ? (parseInt(selectedValue, 10) || 0)
            : null;
          if (onChange) onChange(formattedValue, selectedValue);
        }}
      >
        {items}
      </select>
    </Wrapper>
  );
}

export default UiKitSelect;
