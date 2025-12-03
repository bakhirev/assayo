import React, { ReactNode } from 'react';

import localization from 'ts/helpers/Localization';
import isMobile from 'ts/helpers/isMobile';

import TranslationWrapper from './components/TranslationWrapper';

export const TRANSLATION_MODE = false && !isMobile;

export function useTranslation() {
  return {
    t(translationId: string = '', args?: any) {
      return TRANSLATION_MODE
        ? <TranslationWrapper translationId={translationId} />
        : localization.get(translationId, args);
    },
    wrapper(translationId: string = '', children?: ReactNode | string | null) {
      return TRANSLATION_MODE
        ? <TranslationWrapper translationId={translationId}>{children}</TranslationWrapper>
        : children;
    },
  };
}
