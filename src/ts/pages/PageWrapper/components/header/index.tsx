import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import Buttons from 'ts/pages/Settings/components/Buttons';
import settingsForm from 'ts/pages/Settings/store/Form';

import Title from './Title';
import Filters from './Filters';
import printStore from '../../store/Print';
import style from '../../styles/header.module.scss';

const Header = observer((): React.ReactElement | null => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <header className={style.header}>
      <Title/>
      {settingsForm.isEdited ? (
        <Buttons/>
      ) : (
        <>
          <Filters/>
          <img
            title={t('sidebar.buttons.print')}
            className={style.header_print}
            src="./assets/menu/print.svg"
            onClick={() => {
              printStore.open(navigate, location.pathname);
            }}
          />
          <img
            title={t('sidebar.buttons.settings')}
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
