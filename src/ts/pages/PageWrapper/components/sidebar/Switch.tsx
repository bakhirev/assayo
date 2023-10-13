import React from 'react';

import localization from 'ts/helpers/Localization';

import style from '../../styles/switch.module.scss';

interface ISwitchProps {
  value?: any;
  options: any;
  onChange?: Function;
}

function Switch({
  value,
  options,
  onChange,
}: ISwitchProps) {
  const buttons = options.map((item: any) => {
    const title = localization.get(item?.title);
    return (
      <div
        key={title}
        className={`${style.switch_item} ${value === item?.id ? style.selected : ''}`}
        onClick={() => {
          if (onChange) onChange(item?.id);
        }}
      >
        <img
          className={style.switch_item_icon}
          src={item?.icon || ''}
          alt={title || ''}
          title={title || ''}
        />
        <span className={style.switch_item_title}>
          {title || ''}
        </span>
      </div>
    );
  });

  return (
    <div className={style.switch}>
      {buttons}
    </div>
  );
}

Switch.defaultProps = {
  value: '',
  onChange: undefined,
};

export default Switch;
