import React from 'react';

import style from '../../styles/logo.module.scss';

function Logo() {
  return (
    <figure className={style.logo}>
      <img
        src="./assets/logo.svg"
        className={style.logo_icon}
      />
    </figure>
  );
}

export default Logo;
