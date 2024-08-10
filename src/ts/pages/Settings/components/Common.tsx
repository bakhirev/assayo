import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import InputString from 'ts/components/UiKit/components/InputString';
import UiKitSelect from 'ts/components/UiKit/components/Select';
import UiKitCheckbox from 'ts/components/UiKit/components/Checkbox';
import PageBox from 'ts/components/Page/Box';
import Title from 'ts/components/Title';
import dataGripStore from 'ts/store/DataGrip';
import localization from 'ts/helpers/Localization';
import { applicationHasCustom } from 'ts/helpers/RPC';

const Common = observer((): React.ReactElement | null => {
  const { i18n } = useTranslation();
  const [title, setTitle] = useState<string>(document.title);
  const [language, setLanguage] = useState<string>(localization.language);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <>
      <Title title="page.settings.document.title"/>
      <PageBox>
        <InputString
          title="page.settings.document.name"
          value={title}
          placeholder={localization.get('common.title')}
          onChange={(value: string) => {
            setTitle(value);
            document.title = value || localization.get('common.title');
            applicationHasCustom.title = true;
          }}
        />
        <UiKitSelect
          title="page.settings.document.language"
          value={language}
          options={[
            { id: 'ru', title: 'Русский' },
            { id: 'en', title: 'English' },
            { id: 'zh', title: '中文' },
            { id: 'es', title: 'Español' },
            { id: 'fr', title: 'Français' },
            { id: 'pt', title: 'Português' },
            { id: 'de', title: 'Deutsch' },
            { id: 'ja', title: '日本語' },
          ]}
          onChange={(item: any, id: string) => {
            localization.language = id;
            setLanguage(id);
          }}
        />
        <UiKitCheckbox
          value={dataGripStore.isDepersonalized}
          title="page.settings.document.depersonalize"
          onChange={() => {
            dataGripStore.depersonalized(!dataGripStore.isDepersonalized);
          }}
        />
      </PageBox>
    </>
  );
});

export default Common;
