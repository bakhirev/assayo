import React from 'react';

import { Logo } from 'ts/components/Layout';
import style from './index.module.scss';

export default function LogoWrapper() {
  return (
    <div className={style.sidebar_logo}>
      <Logo/>
    </div>
  );
}
