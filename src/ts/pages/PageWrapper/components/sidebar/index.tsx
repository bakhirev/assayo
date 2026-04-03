import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import LogoWrapper from './components/LogoWrapper';
import Switch from './components/Switch';
import SideBarButtons from './components/Buttons/index';
import SideBarScrollUp from './components/ScrollUp';
import SideBarBanner from './Banner';

import style from './index.module.scss';
import { TYPES } from '../../helpers/menu';

interface SideBarProps {
  onResize?: (width: number) => void;
}

function SideBar({ onResize }: SideBarProps) {
  const { type } = useParams<any>();
  const [isSmall, setIsSmall] = useState<boolean>(false);
  const [inFocus, setInFocus] = useState<boolean>(false);
  const navigate = useNavigate();
  const formattedType = type || 'team';

  const className = isSmall && !inFocus
    ? `${style.sidebar} ${style.sidebar_small}`
    : style.sidebar;

  const classNameIcon = isSmall && !inFocus
    ? style.sidebar_resize_icon
    : `${style.sidebar_resize_icon} ${style.sidebar_resize_icon_close}`;

  useEffect(() => {
    if (onResize) onResize(isSmall ? 60 : 240);
  }, [isSmall]);

  return (
    <aside className={style.sidebar_wrapper}>
      <div
        className={className}
        onMouseOver={() => {
          setInFocus(true);
        }}
        onMouseLeave={() => {
          setInFocus(false);
        }}
      >
        <LogoWrapper/>
        <Switch
          value={formattedType}
          options={TYPES}
          onChange={(newType: string) => {
            if (newType === type) return;
            if (newType === 'person') {
              navigate(`/${newType}/total/0`);
            } else {
              navigate(`/${newType}/total`);
            }
          }}
        />
        <SideBarButtons type={formattedType} />
        <SideBarBanner />
        <SideBarScrollUp />
      </div>
      <div
        className={style.sidebar_resize}
        style={{
          left: isSmall && !inFocus ? '50px' : '230px',
        }}
        onClick={() => {
          setIsSmall(!isSmall);
        }}
      >
        <div className={classNameIcon}/>
      </div>
    </aside>
  );
}

export default SideBar;
