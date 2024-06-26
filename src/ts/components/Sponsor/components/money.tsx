import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import UiKitButton from 'ts/components/UiKit/components/Button';
import { Modal, Header, Body, Footer } from 'ts/components/ModalWindow';

import sponsorStore from '../store';
import style from '../styles/index.module.scss';

const Money = observer((): React.ReactElement | null  => {
  const { t } = useTranslation();

  return (
    <Modal
      mode="halo"
      delay={10}
      onClose={() => {
        sponsorStore.close();
      }}
    >
      <Header className={style.sponsor_title}>
        {t('page.sponsor.title')}
      </Header>
      <Body className={style.sponsor_body}>
        <p className={style.sponsor_text}>
          {t('page.sponsor.money.description')}
        </p>
        <img
          className={style.sponsor_cover}
          src="./assets/sponsor/money.jpg"
        />
      </Body>
      <Footer className={style.sponsor_footer}>
        <UiKitButton
          mode={['border', 'full_size']}
          onClick={() => {
            window.open('https://www.sberbank.com/sms/pbpn?requisiteNumber=79818413061', '_blank');
            sponsorStore.close();
          }}
        >
          {t('page.sponsor.money.qr')}
        </UiKitButton>
        <UiKitButton
          mode={['border', 'full_size']}
          onClick={() => {
            window.open('https://github.com/sponsors/bakhirev', '_blank');
            sponsorStore.close();
          }}
        >
          {t('page.sponsor.money.github')}
        </UiKitButton>
      </Footer>
    </Modal>
  );
});

export default Money;
