import React from 'react';

import style from '../../styles/footer.module.scss';

interface IButtonProps {
  icon: string;
  title: string;
  isSelected?: boolean;
  onClick: Function
}

function Button({
  title,
  icon,
  isSelected,
  onClick,
}: IButtonProps) {
  return (
    <figure
      className={`${style.footer_button} ${isSelected ? style.footer_button_selected : ''}`} // @ts-ignore
      onClick={onClick}
    >
      <div
        className={style.footer_button_icon}
        style={{ backgroundImage: `url(${icon})` }}
      />
      <figcaption className={style.footer_button_text}>
        {title}
      </figcaption>
    </figure>
  );
}

export default Button;
