import React from 'react';
import { observer } from 'mobx-react-lite';

import UiKitButton from 'ts/components/UiKit/components/Button';
import { Modal, Header, Body } from 'ts/components/ModalWindow';
import localization from 'ts/helpers/Localization';

import style from '../styles/print.module.scss';
import printStore from '../store/Print';

const Print = observer(() => {
  if (!printStore.isOpen) return null;

  return (
    <Modal onClose={() => {
      printStore.close();
    }}>
      <Header>
        <div style={{ textAlign: 'center' }}>
          {localization.get('page.print.modal.title')}
        </div>
      </Header>
      <Body>
        <img
          src="./assets/cards/print.png"
          className={style.page_wrapper_print_icon}
        />
        <UiKitButton
          className={style.page_wrapper_print_button}
          onClick={() => {
            printStore.printPage();
          }}
        >
          {localization.get('page.print.modal.page')}
        </UiKitButton>
        <UiKitButton
          className={style.page_wrapper_print_button}
          onClick={() => {
            printStore.printSection();
          }}
        >
          {localization.get('page.print.modal.type')}
        </UiKitButton>
        {false && (
          <UiKitButton
            className={style.page_wrapper_print_button}
            onClick={() => {
              printStore.printAllPages();
            }}
          >
            {localization.get('page.print.modal.all')}
          </UiKitButton>
        )}
        <UiKitButton
          type="second"
          className={style.page_wrapper_print_button}
          onClick={() => {
            printStore.close();
          }}
        >
          {localization.get('page.print.modal.cancel')}
        </UiKitButton>
      </Body>
    </Modal>
  );
});

export default Print;
