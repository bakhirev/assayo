import React from 'react';

import { Logo } from 'ts/components/Layout';
import style from '../../styles/logo.module.scss';

export default function LogoWrapper() {
  return (
    <div className={style.sidebar_logo}>
      <Logo/>
    </div>
  );
}
