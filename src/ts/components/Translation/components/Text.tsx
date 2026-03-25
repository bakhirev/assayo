import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import localization from 'ts/helpers/Localization';
import translationStore from '../store';

interface TextProps {
  translationId?: string;
  args?: any;
}

const Text = observer(({ translationId, args }: TextProps): React.ReactElement => {
  const content = useMemo(() => localization.get(translationId, args), [
    translationId, args, translationStore.language,
  ]);

  return (
    <>
      {content}
    </>
  );
});

export default Text;
