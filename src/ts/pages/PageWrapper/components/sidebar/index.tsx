import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import LogoWrapper from './components/LogoWrapper';
import Switch from './components/Switch';
import SideBarButtons from './components/Buttons/index';
import SideBarScrollUp from './components/ScrollUp';
import SideBarBanner from './Banner';

import style from './index.module.scss';
import { TYPES } from '../../helpers/menu';

function SideBar() {
  const { type } = useParams<any>();
  const navigate = useNavigate();
  const formattedType = type || 'team';

  return (
    <aside className={style.sidebar}>
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
    </aside>
  );
}

export default SideBar;
