import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import Select from 'ts/components/UiKit/components/Select';
import Buttons from 'ts/pages/Settings/components/Buttons';
import settingsForm from 'ts/pages/Settings/store/Form';
import localization from 'ts/helpers/Localization';

import Title from './Title';
import Filters from './Filters';
import printStore from '../../store/Print';
import style from '../../styles/header.module.scss';

const Header = observer((): React.ReactElement | null => {
  const { t, i18n } = useTranslation();
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
          <Select
            className={style.header_lang}
            value={localization.language}
            options={[
              { id: 'ru', title: 'RU' },
              { id: 'en', title: 'EN' },
              { id: 'zh', title: 'ZH' },
              { id: 'es', title: 'ES' },
              { id: 'fr', title: 'FR' },
              { id: 'pt', title: 'PT' },
              { id: 'de', title: 'DE' },
              { id: 'ja', title: 'JA' },
            ]}
            onChange={(item: any, id: string) => {
              localization.language = id;
              i18n.changeLanguage(id);
            }}
          />
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
