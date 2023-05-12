import React from 'react';
import { observer } from 'mobx-react-lite';

import UiKitButton from 'ts/components/UiKit/components/Button';

import { Modal, Header, Footer } from './index';
import confirm from './store/Confirm';


const Confirm = observer(() => {
  if (!confirm.isOpen) return null;
  return (
    <Modal>
      <Header>
        {confirm?.title}
      </Header>
      <Footer>
        <UiKitButton
          onClick={() => {
            confirm.cancel();
          }}
        >
          {confirm.no}
        </UiKitButton>
        <UiKitButton
          type="second"
          onClick={() => {
            confirm.success();
          }}
        >
          {confirm.yes}
        </UiKitButton>
      </Footer>
    </Modal>
  );
});

export default Confirm;
