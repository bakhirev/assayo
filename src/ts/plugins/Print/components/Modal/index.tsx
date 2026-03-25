import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'ts/components/Translation';

import UiKitButton from 'ts/components/UiKit/components/Button';
import { Modal, Header, Body } from 'ts/components/ModalWindow';

import style from './index.module.scss';
import printStore from '../store';

const Print = observer(() => {
  const { t } = useTranslation();
  if (!printStore.isOpen) return null;

  return (
    <Modal onClose={() => {
      printStore.close();
    }}>
      <Header>
        <div style={{ textAlign: 'center' }}>
          {t('plugin.print.modal.title')}
        </div>
      </Header>
      <Body>
        <img
          src="./assets/cards/print.svg"
          className={style.page_wrapper_print_icon}
        />
        <UiKitButton
          mode={['primary', 'full_size']}
          onClick={() => {
            printStore.printPage();
          }}
        >
          {t('plugin.print.modal.page')}
        </UiKitButton>
        <UiKitButton
          mode={['primary', 'full_size']}
          onClick={() => {
            printStore.printSection();
          }}
        >
          {t('plugin.print.modal.type')}
        </UiKitButton>
        <UiKitButton
          mode={['primary', 'full_size']}
          onClick={() => {
            printStore.printAllPages();
          }}
        >
          {t('plugin.print.modal.all')}
        </UiKitButton>
        <UiKitButton
          mode={['second', 'full_size']}
          onClick={() => {
            printStore.close();
          }}
        >
          {t('plugin.print.modal.cancel')}
        </UiKitButton>
      </Body>
    </Modal>
  );
});

export default Print;
