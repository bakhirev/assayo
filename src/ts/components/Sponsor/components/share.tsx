import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { Modal, Header, Body, Footer } from 'ts/components/ModalWindow';
import UiKitButton from 'ts/components/UiKit/components/Button';
import { getTextWithStyle } from 'ts/components/Description';
import notificationsStore from 'ts/components/Notifications/store';
import localization from 'ts/helpers/Localization';
import copyInBuffer from 'ts/helpers/copyInBuffer';

import SocialLinks from './buttons';
import sponsorStore from '../store';

import style from '../styles/index.module.scss';

const Share = observer((): React.ReactElement | null  => {
  const { t } = useTranslation();
  const text = localization.get('page.sponsor.share.description');

  return (
    <Modal
      mode="halo"
      delay={10}
      onClose={() => {
        sponsorStore.close();
      }}
    >
      <Header className={style.sponsor_title}>
        {t('page.sponsor.share.title')}
      </Header>
      <Body className={style.sponsor_body}>
        <p className={style.sponsor_text}>
          {getTextWithStyle(text)}
        </p>
        <SocialLinks/>
      </Body>
      <Footer className={style.sponsor_footer}>
        <UiKitButton
          mode={['primary', 'full_size']}
          onClick={() => {
            copyInBuffer('https://github.com/bakhirev/assayo');
            notificationsStore.show(localization.get('uiKit.console.notification'));
          }}
        >
          {t('page.sponsor.share.button')}
        </UiKitButton>
      </Footer>
    </Modal>
  );
});

export default Share;
