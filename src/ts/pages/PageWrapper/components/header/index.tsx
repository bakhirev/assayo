import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Buttons from 'ts/pages/Settings/components/Buttons';
import settingsForm from 'ts/pages/Settings/store/Form';
import style from '../../styles/header.module.scss';

import Title from './Title';
import Filters from './Filters';
import printStore from '../../store/Print';

const Header = observer((): React.ReactElement | null => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className={style.header}>
      <Title/>
      {settingsForm.isEdited ? (
        <Buttons/>
      ) : (
        <>
          <Filters/>
          <img
            title="Печать"
            className={style.header_print}
            src="./assets/menu/print.svg"
            onClick={() => {
              printStore.open(navigate, location.pathname);
            }}
          />
          <img
            title="Настройки"
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
