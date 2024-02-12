import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
  const { type, page } = useParams<any>();
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    let prevScrollValue = window.scrollY;
    let timer: any = null;
    function updateScroll() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setShow(prevScrollValue > window.scrollY || window.scrollY < 150);
        prevScrollValue = window.scrollY;
      }, 100);
    }
    document.addEventListener('scroll', updateScroll);
    return () => {
      document.removeEventListener('scroll', updateScroll);
    };
  }, []);

  const selected = MENU.find((config: any) => page === config.id)
    || MENU.find((config: any) => type === config.id);

  const buttons = MENU.map((config: any) => (
    <Button
      key={config.id}
      id={config.id}
      isSelected={selected?.id === config.id}
      title={localization.get(config.title)}
      icon={config.icon}
    />
  ));

  return (
    <>
      <div className={style.footer_gap}></div>
      <div className={`${style.footer} ${show ? '' : style.footer_hidden}`}>
        <nav className={style.footer_wrapper}>
          {buttons}
        </nav>
      </div>
    </>
  );
}

export default Footer;
