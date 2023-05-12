import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Buttons from 'ts/pages/Settings/components/Buttons';
import settingsForm from 'ts/pages/Settings/store/Form';
import style from '../../styles/header.module.scss';

import Title from './Title';
import Filters from './Filters';

const Header = observer((): React.ReactElement | null => {
  const navigate = useNavigate();

  return (
    <header className={style.header}>
      <Title/>
      {settingsForm.isEdited ? (
        <Buttons/>
      ) : (
        <>
          <Filters/>
          <img
            className={style.header_setting}
            src="./assets/menu/setting.svg"
            onClick={() => {
              navigate('/settings');
            }}
          />
        </>
      )}
    </header>
  );
});

export default Header;
