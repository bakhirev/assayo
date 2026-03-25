import React, { ReactNode } from 'react';

import localization from 'ts/helpers/Localization';

import translationStore from './store';
import TextEditable from './components/TextEditable';
import Text from './components/Text';

export function useTranslation() {
  return {
    t(translationId: string = '', args?: any) {
      return translationStore.isEditor ? (
        <TextEditable
          translationId={translationId}
          args={args}
        />
      ) : (
        <Text
          translationId={translationId}
          args={args}
        />
      );
    },
    text(translationId: string = '', args?: any) {
      return localization.get(translationId, args);
    },
    wrapper(translationId: string = '', children?: ReactNode | string | null) {
      return translationStore.isEditor
        ? <TextEditable translationId={translationId}>{children}</TextEditable>
        : children;
    },
  };
}
