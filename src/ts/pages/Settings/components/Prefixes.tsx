import React from 'react';
import { observer } from 'mobx-react-lite';

import InputString from 'ts/components/UiKit/components/InputString';
import PageBox from 'ts/components/Page/Box';
import Title from 'ts/components/Title';

import formStore from '../store/Form';

const Prefixes = observer((): React.ReactElement | null => {
  return (
    <>
      <Title title="page.settings.links.title"/>
      <PageBox>
        <InputString
          title="page.settings.links.task"
          value={formStore.state?.linksPrefix?.task}
          placeholder="https://jira.com/secure/RapidBoard.jspa?task="
          onChange={(value: string) => {
            formStore.updateState('linksPrefix.task', value);
          }}
        />
        <InputString
          title="page.settings.links.pr"
          value={formStore.state.linksPrefix.pr}
          placeholder="https://bitbucket.com/projects/assayo/repos/frontend/pull-requests/"
          onChange={(value: string) => {
            formStore.updateState('linksPrefix.pr', value);
          }}
        />
      </PageBox>
    </>
  );
});

export default Prefixes;
