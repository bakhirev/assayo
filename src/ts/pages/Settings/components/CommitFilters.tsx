import React from 'react';
import { observer } from 'mobx-react-lite';

import InputString from 'ts/components/UiKit/components/InputString';
import PageBox from 'ts/components/Page/Box';
import { Title } from 'ts/components/Layout';

import formStore from '../store/Form';

const CommitFilters = observer((): React.ReactElement | null => {
  return (
    <>
      <Title title="page.settings.commitFilters.title"/>
      <PageBox>
        <InputString
          title="page.settings.commitFilters.author"
          value={formStore.state?.commitFilters?.author}
          placeholder=""
          onChange={(value: string) => {
            formStore.updateState('commitFilters.author', value);
          }}
        />
        <InputString
          title="page.settings.commitFilters.message"
          value={formStore.state?.commitFilters?.message}
          placeholder=""
          onChange={(value: string) => {
            formStore.updateState('commitFilters.message', value);
          }}
        />
      </PageBox>
    </>
  );
});

export default CommitFilters;
