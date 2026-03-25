import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import InputString from 'ts/components/UiKit/components/InputString';
import UiKitCheckbox from 'ts/components/UiKit/components/Checkbox';
import PageBox from 'ts/components/Page/Box';
import { Gap } from 'ts/components/Layout';
import statisticStore from 'ts/store/Statistics';
import translationStore from 'ts/components/Translation/store';
import applicationConfig from 'ts/store/ApplicationConfig';

const Common = observer((): React.ReactElement | null => {
  const [title, setTitle] = useState<string>(document.title);

  return (
    <PageBox>
      <InputString
        title="plugin.settings.document.name"
        value={title}
        placeholder={applicationConfig.config?.title}
        onChange={(value: string) => {
          setTitle(value);
        }}
        onChangeDebounce={() => {
          document.title = title;
        }}
      />
      <UiKitCheckbox
        value={statisticStore.isDepersonalized}
        title="plugin.settings.document.depersonalize"
        onChange={() => {
          statisticStore.depersonalized(!statisticStore.isDepersonalized);
        }}
      />
      <UiKitCheckbox
        value={translationStore.isEditor}
        title="plugin.settings.document.translations"
        onChange={(status: boolean) => {
          if (status) {
            translationStore.editorOn();
          } else {
            translationStore.editorOff();
          }
        }}
      />
      <Gap height="xl"/>
    </PageBox>
  );
});

export default Common;
