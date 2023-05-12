import React from 'react';
import { useNavigate } from 'react-router-dom';

import UiKitButton from 'ts/components/UiKit/components/Button';
import localization  from 'ts/helpers/Localization';

import style from '../styles/card.module.scss';

interface ICardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
}

function Card({
  icon,
  title,
  description,
  link,
}: ICardProps): React.ReactElement | null {
  const navigate = useNavigate();

  return (
    <figure className={style.card}>
      <h4 className={style.card_title}>
        {localization.get(title)}
      </h4>
      <img
        className={style.card_icon}
        src={icon}
      />
      <figcaption className={style.card_description}>
        {localization.get(description)}
      </figcaption>
      <UiKitButton
        className={style.card_button}
        onClick={() => {
          navigate(link);
        }}
      >
        Перейти в отчёт
      </UiKitButton>
    </figure>
  );
}

export default Card;
