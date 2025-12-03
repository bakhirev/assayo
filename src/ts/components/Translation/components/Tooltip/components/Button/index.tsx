import React from 'react';

import { useTranslation } from 'react-i18next';

import style from './index.module.scss';

interface ButtonProps {
  icon: string;
  title: string;
  onClick: () => void;
}

function Button({
  title,
  icon,
  onClick,
}: ButtonProps) {
  const { t } = useTranslation();
  return (
    <figure
      className={style.translation_tooltip_button} // @ts-ignore
      onClick={onClick}
    >
      <div
        className={style.translation_tooltip_button_icon}
        style={{ backgroundImage: `url(${icon})` }}
      />
      <figcaption className={style.translation_tooltip_button_text}>
        {t(title)}
      </figcaption>
    </figure>
  );
}

export default Button;
