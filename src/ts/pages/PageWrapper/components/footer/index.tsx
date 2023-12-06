import React from 'react';

import localization from 'ts/helpers/Localization';

import Button from './Button';
import style from '../../styles/footer.module.scss';

const MENU = [
  {
    id: 'team',
    title: 'sidebar.switch.team',
    icon: './assets/switch/team.svg',
  },
  {
    id: 'person',
    title: 'sidebar.switch.person',
    icon: './assets/switch/person.svg',
  },
  {
    id: 'print',
    title: 'sidebar.buttons.print',
    icon: './assets/menu/print.svg',
  },
  {
    id: 'settings',
    title: 'sidebar.buttons.settings',
    icon: './assets/menu/setting.svg',
  },
];

function Footer() {
  // const { type, page } = useParams<any>();
  const buttons = MENU.map((config: any) => (
    <Button
      key={config.id}
      id={config.id}
      title={localization.get(config.title)}
      icon={config.icon}
    />
  ));

  return (
    <>
      <div className={style.footer_gap}></div>
      <div className={style.footer}>
        <nav className={style.footer_wrapper}>
          {buttons}
        </nav>
      </div>
    </>
  );
}

export default Footer;
