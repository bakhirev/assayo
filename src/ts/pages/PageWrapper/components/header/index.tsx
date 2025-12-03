import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import Select from 'ts/components/UiKit/components/Select';
import Buttons from 'ts/pages/Settings/components/Buttons';
import settingsForm from 'ts/pages/Settings/store/Form';
import localization from 'ts/helpers/Localization';
import { BROWSER_LANGUAGE } from 'ts/helpers/i18n';
import plugins from 'ts/helpers/Plugins';

import Title from './Title';
import Filters from './Filters';
import style from '../../styles/header.module.scss';

const Header = observer((): React.ReactElement | null => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const options = [
    { id: 'ru', title: 'Русский' },
    { id: 'en', title: 'English' },
    { id: 'zh', title: '中文' },
    { id: 'es', title: 'Español' },
    { id: 'fr', title: 'Français' },
    { id: 'pt', title: 'Português' },
    { id: 'de', title: 'Deutsch' },
    { id: 'ja', title: '日本語' },
    { id: 'ko', title: '한국어' },
  ];

  const items = plugins.getHeaderItems()
    .filter((button) => button.title)
    .map((button) => (
      <img
        key={button.id}
        alt={t(button.title || '')}
        title={t(button.title || '')}
        className={style.header_print}
        src={button.icon}
        onClick={button?.onClick?.(navigate, location)}
      />
    ));

  return (
    <header className={style.header}>
      <div className={style.header_wrapper}>
        <Title/>
        {settingsForm.isEdited ? (
          <Buttons/>
        ) : (
          <>
            <Filters/>
            <Select
              className={style.header_lang}
              value={localization.language}
              options={options}
              onChange={(item: any, id: string) => {
                localization.language = id;
                localization.updateLangAttribute();
                i18n.changeLanguage(id);
                if (id === BROWSER_LANGUAGE) {
                  localStorage.removeItem('language');
                } else {
                  localStorage.setItem('language', id);
                }
              }}
            />
            {items}
            <img
              title={t('sidebar.buttons.settings')}
              alt={t('sidebar.buttons.settings')}
              className={style.header_setting}
              src="./assets/menu/setting.svg"
              onClick={() => {
                navigate('/settings');
              }}
            />
          </>
        )}
      </div>
    </header>
  );
});

export default Header;
