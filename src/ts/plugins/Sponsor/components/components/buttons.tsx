import React from 'react';
import { Link } from 'react-router-dom';

import getSocialLinks from '../helpers';

import style from '../styles/index.module.scss';

function SocialLinks() {
  const buttons = Object.entries(getSocialLinks())
    .map(([title, link]: string[]) => (
      <Link
        key={title}
        className={style.sponsor_button}
        to={link}
        target="_blank"
      >
        {title}
      </Link>
    ));

  return (
    <div className={style.sponsor_button_wrapper}>
      {buttons}
    </div>
  );
}

export default SocialLinks;
