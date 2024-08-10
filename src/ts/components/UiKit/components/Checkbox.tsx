import React from 'react';
import { useTranslation } from 'react-i18next';

import Wrapper, { IUiKitWrapperProps } from './Wrapper';
import style from '../styles/checkbox.module.scss';

interface IUiKitCheckboxProps extends IUiKitWrapperProps {
  value: any;
  onChange: Function;
}

function UiKitCheckbox({
  title,
  description,
  help,
  error,
  className,

  value,
  onChange,
}: IUiKitCheckboxProps) {
  const { t } = useTranslation();
  const id = `checkbox-${Math.ceil(Math.random() * 10000)}`;
  return (
    <Wrapper
      description={description}
      help={help}
      error={error}
      className={className}
    >
      <div className={style.ui_kit_checkbox}>
        <input
          type="checkbox"
          id={id}
          checked={!!value}
          className={style.ui_kit_checkbox_box}
          onChange={() => {
            onChange(!value);
          }}
        />
        <label
          htmlFor={id}
          className={style.ui_kit_checkbox_title}
        >
          {t(title || '')}
        </label>
      </div>
    </Wrapper>
  );
}

export default UiKitCheckbox;
