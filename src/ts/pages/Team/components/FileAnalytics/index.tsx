import React from 'react';
import { observer } from 'mobx-react-lite';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';

import Extension from './Extension';
import Type from './Type';

const FileAnalytics = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  return (
    <>
      <Extension mode={mode} />
      <Type mode={mode} />
    </>
  );
});

export default FileAnalytics;
