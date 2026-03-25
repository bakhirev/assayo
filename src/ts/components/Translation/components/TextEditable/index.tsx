import React, { ReactNode, useState } from 'react';

import localization from 'ts/helpers/Localization';

import View from './View';
import Edit from './Edit';
import translationStore from '../../store';

interface TextEditableProps {
  translationId: string;
  args?: any;
  children?: ReactNode | string | null;
}

function TextEditable({ translationId, args, children }: TextEditableProps) {
  const [height, setHeight] = useState<number>(0);

  if (!height) {
    return (
      <View onClick={setHeight}>
        {children || localization.get(translationId, args)}
      </View>
    );
  }

  const list = Array.isArray(translationId) ? translationId : [translationId];
  const subHeight = height / list.length;
  const autoClose = list.length < 2;
  const items = list.map((id) => {
    const defaultValue = localization.get(id);
    return (
      <Edit
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

export default TextEditable;

