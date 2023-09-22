import React from 'react';
import { observer } from 'mobx-react-lite';

import UiKitButton from 'ts/components/UiKit/components/Button';
import { Modal, Header, Body } from 'ts/components/ModalWindow';

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
          Что распечатываем?
        </div>
      </Header>
      <Body>
        <img
          src="./assets/cards/commits.png"
          className={style.page_wrapper_print_icon}
        />
        <UiKitButton
          className={style.page_wrapper_print_button}
          onClick={() => {
            printStore.printPage();
          }}
        >
          Текущую страницу
        </UiKitButton>
        <UiKitButton
          className={style.page_wrapper_print_button}
          onClick={() => {
            printStore.printSection();
          }}
        >
          Текущий раздел
        </UiKitButton>
        {false && (
          <UiKitButton
            className={style.page_wrapper_print_button}
            onClick={() => {
              printStore.printAllPages();
            }}
          >
            Всю статистику
          </UiKitButton>
        )}
        <UiKitButton
          type="second"
          className={style.page_wrapper_print_button}
          onClick={() => {
            printStore.close();
          }}
        >
          Отмена
        </UiKitButton>
      </Body>
    </Modal>
  );
});

export default Print;
