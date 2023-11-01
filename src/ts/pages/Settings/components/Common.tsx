import React from 'react';
import { observer } from 'mobx-react-lite';

import InputString from 'ts/components/UiKit/components/InputString';
import Select from 'ts/components/UiKit/components/Select';
import PageBox from 'ts/components/Page/Box';
import Title from 'ts/components/Title';
import localization from 'ts/helpers/Localization';

const Common = observer((): React.ReactElement | null => {
  return (
    <>
      <Title title="page.settings.document.title"/>
      <PageBox>
        <InputString
          title="page.settings.document.name"
          value={document.title}
          placeholder="Git статистика"
          onChange={(value: string) => {
            document.title = value || 'Git статистика';
          }}
        />
        <Select
          title="page.settings.document.language"
          value={localization.language}
          options={[
            { id: 'ru', title: 'Русский' },
            { id: 'en', title: 'English' },
          ]}
          onChange={(value: string) => {
            localization.language = value;
          }}
        />
      </PageBox>
    </>
  );
});

export default Common;
