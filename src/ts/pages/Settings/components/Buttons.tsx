import React from 'react';
import { observer } from 'mobx-react-lite';

import UiKitButton from 'ts/components/UiKit/components/Button';

import formStore from '../store/Form';
import style from '../styles/index.module.scss';

const Buttons = observer((): React.ReactElement | null => {
  if (!formStore.isEdited) return null;

  return (
    <div className={style.buttons_header}>
      <UiKitButton
        type="second"
        onClick={() => {
          formStore.setInitState(formStore.initState);
        }}
      >
        Отмена
      </UiKitButton>
      <UiKitButton
        onClick={() => {
          formStore.save(formStore.state);
        }}
      >
        Сохранить
      </UiKitButton>
    </div>
  );
});

export default Buttons;
