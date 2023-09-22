import React from 'react';

import { IUiKitWrapperProps } from './Wrapper';
import UiKitButton from './Button';
import UiKitSelect from './Select';

interface IUiKitSelectWithButtonsProps extends IUiKitWrapperProps {
  className?: string;
  value: any;
  options: any[];
  onChange: Function;
}

function UiKitSelectWithButtons({
  className,
  value,
  options,
  onChange,
}: IUiKitSelectWithButtonsProps) {
  let index = options.map((item: any) => item.id).indexOf(value);
  if (index === -1) index = 0;
  return (
    <>
      <UiKitButton
        type="second"
        disabled={index <= 0}
        onClick={() => {
          onChange(options[index - 1]?.id);
        }}
      >
        «
      </UiKitButton>
      <UiKitSelect
        value={value}
        options={options}
        className={className}
        onChange={onChange}
      />
      <UiKitButton
        type="second"
        disabled={index >= (options.length - 1)}
        onClick={() => {
          onChange(options[index + 1]?.id);
        }}
      >
        »
      </UiKitButton>
    </>
  );
}

UiKitSelectWithButtons.defaultProps = {
  className: '',
};

export default UiKitSelectWithButtons;
