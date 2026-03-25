import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react-lite';

import { useTranslation } from 'ts/components/Translation';
import UiKitButton from 'ts/components/UiKit/components/Button';
import translationStore from '../../store';
import style from './index.module.scss';

const Tooltip = observer((): React.ReactElement | null => {
  const { text } = useTranslation();

  if (!translationStore.isEditor
    || !translationStore.refKeyTranslation.size) return null;

  return ReactDOM.createPortal((
    <div className={style.translation_tooltip}>
      <UiKitButton
        mode="second"
        onClick={() => {
          translationStore.show();
        }}
      >
        {text('uiKit.translation.tooltip.list')}
      </UiKitButton>
    </div>
  ), document.body);
});

export default Tooltip;
