import React from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  return (
    <figure
      className={style.footer_button}
      onClick={() => {
        const link = {
          team: '/team/total',
          person: '/person/total/0',
          settings: '/team/settings',
        }[id];
        if (link) navigate(link);
      }}
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
