import React from 'react';

import style from '../../styles/footer.module.scss';

interface IButtonProps {
  id: string;
  title: string;
  icon: string;
}

function Button({
  id,
  title,
  icon,
}: IButtonProps) {
  console.dir(id);
  return (
    <figure className={style.footer_button}>
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
