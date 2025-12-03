import React, { ReactNode, useState } from 'react';

import localization from 'ts/helpers/Localization';

import ContentWrapper from './ContentWrapper';
import EditTranslation from './EditTranslation';
import translationStore from '../store';

interface TranslationWrapperProps {
  translationId: string;
  children?: ReactNode | string | null;
}

function TranslationWrapper({ translationId, children }: TranslationWrapperProps) {
  const [height, setHeight] = useState<number>(0);

  if (!height) {
    return (
      <ContentWrapper onClick={setHeight}>
        {children || localization.get(translationId)}
      </ContentWrapper>
    );
  }

  const list = Array.isArray(translationId) ? translationId : [translationId];
  const subHeight = height / list.length;
  const autoClose = list.length < 2;
  const items = list.map((id) => {
    const defaultValue = localization.get(id);
    return (
      <EditTranslation
        key={id}
        defaultValue={defaultValue}
        height={subHeight}
        autoClose={autoClose}
        onChange={(newTranslation: string) => {
          setHeight(0);
          if (defaultValue !== newTranslation) {
            translationStore.update(translationId, newTranslation);
          }
        }}
      />
    );
  });

  return (<>{items}</>);
}

export default TranslationWrapper;

