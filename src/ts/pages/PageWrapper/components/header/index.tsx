import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'ts/components/Translation';
import translationStore from 'ts/components/Translation/store';
import applicationConfig from 'ts/store/ApplicationConfig';

import Select from 'ts/components/UiKit/components/Select';
import localization from 'ts/helpers/Localization';
import { BROWSER_LANGUAGE } from 'ts/helpers/i18n';
import plugins from 'ts/helpers/Plugins';

import Title from './components/Title';
import Filters from './components/Filters';
import style from './index.module.scss';

interface HeaderProps {
  sideBarWidth?: number;
}

const Header = observer(({
  sideBarWidth,
}: HeaderProps): React.ReactElement | null => {
  const { text } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const options = applicationConfig.config.languages;

  const selectedPage = plugins.getMenuItems()
    .find((button) => button?.link === location?.pathname) || {};

  const buttons = plugins.getHeaderItems()
    .filter((button) => button.title)
    .map((button) => (
      <img
        key={button.id}
        alt={text(button.title || '')}
        title={text(button.title || '')}
        className={style.header_icon}
        src={button.icon}
        onClick={button?.onClick?.(navigate, location)}
      />
    ));

  return (
    <header className={style.header}>
      <div
        className={style.header_wrapper}
        style={{
          width: `calc(100vw - ${sideBarWidth}px - 18px)`,
        }}
      >
        <Title text={selectedPage?.title}/>
        <Filters/>
        <Select
          className={style.header_language}
          value={translationStore.language || 'ru'}
          options={options}
          onChange={(item2: any, id: string) => {
            const item = options.find((i) => i.id === id) as any;
            applicationConfig.updateConfigProperty('language', item?.language);
            applicationConfig.updateConfigProperty('currency', item?.currency);

            localization.language = id;
            localization.updateLangAttribute();
            translationStore.setLanguage(localization.language);
            if (id === BROWSER_LANGUAGE) {
              localStorage.removeItem('language');
            } else {
              localStorage.setItem('language', id);
            }
          }}
        />
        <Select
          className={style.header_currency}
          value={applicationConfig.config.currency}
          options={[
            { id: 'USD', title: 'USD' },
            { id: 'EUR', title: 'EUR' },
            { id: 'RUB', title: 'RUB' },
            { id: 'CNY', title: 'CNY' },
            { id: 'ILS', title: 'ILS' },
            { id: 'JPY', title: 'JPY' },
            { id: 'KRW', title: 'KRW' },
            { id: 'INR', title: 'INR' },
          ]}
          onChange={(item: any, currency: string) => {
            applicationConfig.updateConfigProperty('currency', currency);
          }}
        />
        {buttons}
      </div>
    </header>
  );
});

export default Header;
