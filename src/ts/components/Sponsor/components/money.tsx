import React from 'react';
import { observer } from 'mobx-react-lite';

import UiKitButton from 'ts/components/UiKit/components/Button';
import { Modal, Header, Body, Footer } from 'ts/components/ModalWindow';

import sponsorStore from '../store';
import style from '../styles/index.module.scss';

const Money = observer((): React.ReactElement | null  => {
  return (
    <Modal
      mode="halo"
      onClose={() => {
        sponsorStore.close();
      }}
    >
      <Header className={style.sponsor_title}>
        Поддержите проект
      </Header>
      <Body className={style.sponsor_body}>
        <p className={style.sponsor_text}>
          Мы будем рады, если вы поддержите нас любой суммой! Все средства пойдут на дальнейшее развитие проекта.
        </p>
        <img
          className={style.sponsor_cover}
          src="./assets/sponsor/money.jpg"
        />
      </Body>
      <Footer className={style.sponsor_footer}>
        <UiKitButton
          mode={['primary', 'full_size']}
          onClick={() => {
            sponsorStore.close();
          }}
        >
          Разовый платёж (СБП)
        </UiKitButton>
        <UiKitButton
          mode={['border', 'full_size']}
          onClick={() => {
            sponsorStore.close();
          }}
        >
          Подписка GitHub Sponsor
        </UiKitButton>
      </Footer>
    </Modal>
  );
});

export default Money;
