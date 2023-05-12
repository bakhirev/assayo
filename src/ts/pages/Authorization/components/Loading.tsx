import React from 'react';
import { observer } from 'mobx-react-lite';

const Loading = observer(() => {
  return (
    <p className="authorization-sidebar-processing">
      получение токенов...
    </p>
  );
});

export default Loading;
