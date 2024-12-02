import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import localization from 'ts/helpers/Localization';
import dataGripStore from 'ts/store/DataGrip';
import viewNameStore, { ViewNameEnum } from 'ts/store/ViewName';
import confirm from 'ts/components/ModalWindow/store/Confirm';

import Button from './Button';
import style from '../../styles/footer.module.scss';

function getMenu(navigate: Function): any[] {
  return [
    {
      id: 'team',
      title: 'sidebar.switch.team',
      icon: './assets/switch/team.svg',
      onClick() {
        navigate('/team/total');
      },
    },
    {
      id: 'person',
      title: 'sidebar.switch.person',
      icon: './assets/switch/person.svg',
      onClick() {
        navigate('/person/total/0');
      },
    },
    {
      id: 'print',
      title: 'sidebar.buttons.share',
      icon: './assets/menu/share.svg',
      onClick() {
        navigator.share({
          title: localization.get('common.title'),
          text: '',
          url: window.location.href,
        });
      },
    },
    {
      id: 'settings',
      title: 'sidebar.buttons.logout',
      icon: './assets/menu/logout.svg',
      onClick() {
        confirm.open({
          title: 'Вы уверены что хотите выйти?',
        }).then(() => {
          dataGripStore.exit();
          navigate('/');
          viewNameStore.toggle(ViewNameEnum.WELCOME);
        });
      },
    },
  ].filter(v => v);
}

function onScrollEvent(value: boolean, setValue: Function) {
  let prevScrollValue = window.scrollY;
  let prevValue = value;

  function updateScroll() {
    const canShow = prevScrollValue > window.scrollY || window.scrollY < 150;
    prevScrollValue = window.scrollY;

    if (canShow === prevValue) return;
    prevValue = canShow;
    setValue(canShow);
  }

  document.addEventListener('scroll', updateScroll);
  return () => {
    document.removeEventListener('scroll', updateScroll);
  };
}

function Footer() {
  const navigate = useNavigate();
  const { type, page } = useParams<any>();
  const [show, setShow] = useState<boolean>(true);
  const { t } = useTranslation();

  useEffect(() => {
    return onScrollEvent(show, setShow);
  }, []);

  const menu = getMenu(navigate);
  const selected = menu.find((config: any) => page === config.id)
    || menu.find((config: any) => type === config.id);

  const buttons = menu.map((config: any) => (
    <Button
      key={config.id}
      icon={config.icon}
      title={t(config.title)}
      isSelected={selected?.id === config.id}
      onClick={config.onClick}
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
