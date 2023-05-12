import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Logo from './Logo';
import Switch from './Switch';
import SideBarPerson from './Person';
import SideBarTeam from './Team';

import style from '../../styles/sidebar.module.scss';

function SideBar() {
  const { type, page } = useParams<any>();
  const navigate = useNavigate();

  return (
    <aside className={style.sidebar}>
      <Logo/>
      <Switch
        value={type || 'team'}
        options={[
          { id: 'team', title: 'Команда', icon: './assets/switch/team.svg' },
          { id: 'person', title: 'Люди', icon: './assets/switch/person.svg' },
        ]}
        onChange={(newType: string) => {
          if (newType === type) return;
          if (newType === 'person') {
            navigate(`/${newType}/total/0`);
          } else {
            navigate(`/${newType}/total`);
          }
        }}
      />
      {type !== 'person' && (
        <SideBarTeam page={page} />
      )}
      {type === 'person' && (
        <SideBarPerson page={page} />
      )}
    </aside>
  );
}

export default SideBar;
