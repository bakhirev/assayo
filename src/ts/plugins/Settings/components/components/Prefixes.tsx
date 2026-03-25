import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import InputString from 'ts/components/UiKit/components/InputString';
import PageBox from 'ts/components/Page/Box';
import applicationConfig from 'ts/store/ApplicationConfig';
import getDefaultConfig from 'ts/helpers/ApplicationConfig/getDefaultConfig';

const DEFAULT_CONFIG = getDefaultConfig();

const Prefixes = observer((): React.ReactElement | null => {
  const [task, setTask] = useState<string>('');
  const [pr, setPr] = useState<string>('');

  return (
    <PageBox>
      <InputString
        title="plugin.settings.links.task"
        value={task}
        placeholder={DEFAULT_CONFIG.prefixForTask}
        onChange={(value: string) => {
          setTask(value);
        }}
        onChangeDebounce={(value: string) => {
          applicationConfig.updateConfigProperty('prefixForTask', value || DEFAULT_CONFIG.prefixForTask);
        }}
      />
      <InputString
        title="plugin.settings.links.pr"
        value={pr}
        placeholder={DEFAULT_CONFIG.prefixForPR}
        onChange={(value: string) => {
          setPr(value);
        }}
        onChangeDebounce={(value: string) => {
          applicationConfig.updateConfigProperty('prefixForPR', value || DEFAULT_CONFIG.prefixForPR);
        }}
      />
    </PageBox>
  );
});

export default Prefixes;
