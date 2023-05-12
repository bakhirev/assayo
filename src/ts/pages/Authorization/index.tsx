import React from 'react';
import { observer } from 'mobx-react-lite';

import authorizationStore from './store/AuthorizationStore';
import Success from './components/Success';

const Authorization = observer(() => {
  const { state, isInitialization } = authorizationStore;

  if (true || state === 'SUCCESS') return (<Success />);
  if (isInitialization) return null;

  const content = state === 'LOGIN'
    ? (<h1>login</h1>)
    : (<h1>loading</h1>);

  return (
    <div>
      {content}
    </div>
  );
});

export default Authorization;
