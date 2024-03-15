import React from 'react';

import { IUiKitWrapperProps } from './Wrapper';
import UiKitButton from './Button';
import UiKitSelect from './Select';

import style from '../styles/select.module.scss';

interface IUiKitSelectWithButtonsProps extends IUiKitWrapperProps {
  className?: string;
  value: any;
  options: any[];
  reverse: boolean;
  onChange: Function;
}

function UiKitSelectWithButtons({
  className,
  value,
  options,
  reverse,
  onChange,
}: IUiKitSelectWithButtonsProps) {
  let index = options.map((item: any) => item.id).indexOf(value);
  if (index === -1) index = 0;

  const disabledPrev = index <= 0;
  const disabledNext = index >= (options.length - 1);
  const newPrevValue = options[index - 1]?.id;
  const newNextValue = options[index + 1]?.id;

  return (
    <div className={`${style.ui_kit_select_with_buttons_wrapper} ${className || ''}`}>
      <UiKitButton
        mode="second"
        className={style.ui_kit_select_with_buttons_left}
        disabled={reverse ? disabledNext : disabledPrev}
        onClick={() => {
          onChange(reverse ? newNextValue : newPrevValue);
        }}
      >
        «
      </UiKitButton>
      <UiKitSelect
        value={value}
        options={options}
        onChange={onChange}
      />
      <UiKitButton
        mode="second"
        className={style.ui_kit_select_with_buttons_right}
        disabled={reverse ? disabledPrev : disabledNext}
        onClick={() => {
          onChange(reverse ? newPrevValue : newNextValue);
        }}
      >
        »
      </UiKitButton>
    </div>
  );
}

UiKitSelectWithButtons.defaultProps = {
  reverse: false,
  className: '',
};

export default UiKitSelectWithButtons;
