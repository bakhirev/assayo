import React from 'react';
import { observer } from 'mobx-react-lite';

import UiKitInputNumber from 'ts/components/UiKit/components/InputNumber';
import PageBox from 'ts/components/Page/Box';
import Title from 'ts/components/Title';

import formStore from '../store/Form';

const Common = observer((): React.ReactElement | null => {
  return (
    <>
      <Title title="Другие данные"/>
      <PageBox>
        <UiKitInputNumber
          title="Ссылка на таск-трекер"
          value={formStore.state.linksPrefixForTasks}
          onChange={(jiraLink: number) => {
            formStore.updateState('linksPrefixForTasks', jiraLink);
          }}
        />
      </PageBox>
    </>
  );
});

export default Common;
