import React from 'react';

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
  const buttons = options.map((item: any) => (
    <div
      key={item?.title}
      className={`${style.switch_item} ${value === item?.id ? style.selected : ''}`}
      onClick={() => {
        if (onChange) onChange(item?.id);
      }}
    >
      <img
        className={style.switch_item_icon}
        src={item?.icon || ''}
        alt={item?.title || ''}
        title={item?.title || ''}
      />
      <span className={style.switch_item_title}>
        {item?.title || ''}
      </span>
    </div>
  ));

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
