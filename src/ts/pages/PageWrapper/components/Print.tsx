import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import UiKitButton from 'ts/components/UiKit/components/Button';
import { Modal, Header, Body } from 'ts/components/ModalWindow';

import style from '../styles/print.module.scss';
import printStore from '../store/Print';

const Print = observer(() => {
  const { t } = useTranslation();
  if (!printStore.isOpen) return null;

  return (
    <Modal onClose={() => {
      printStore.close();
    }}>
      <Header>
        <div style={{ textAlign: 'center' }}>
          {t('page.print.modal.title')}
        </div>
      </Header>
      <Body>
        <img
          src="./assets/cards/print.png"
          className={style.page_wrapper_print_icon}
        />
        <UiKitButton
          mode={['primary', 'full_size']}
          onClick={() => {
            printStore.printPage();
          }}
        >
          {t('page.print.modal.page')}
        </UiKitButton>
        <UiKitButton
          mode={['primary', 'full_size']}
          onClick={() => {
            printStore.printSection();
          }}
        >
          {t('page.print.modal.type')}
        </UiKitButton>
        <UiKitButton
          mode={['primary', 'full_size']}
          onClick={() => {
            printStore.printAllPages();
          }}
        >
          {t('page.print.modal.all')}
        </UiKitButton>
        <UiKitButton
          mode={['second', 'full_size']}
          onClick={() => {
            printStore.close();
          }}
        >
          {t('page.print.modal.cancel')}
        </UiKitButton>
      </Body>
    </Modal>
  );
});

export default Print;
