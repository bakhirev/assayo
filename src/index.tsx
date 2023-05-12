import React from 'react';
import { HashRouter } from 'react-router-dom';
import { render } from 'react-dom';

import ru from './ts/config/translations/ru';
import Authorization from './ts/pages/Authorization';
import './styles/index.scss';

// eslint-disable-next-line
// @ts-ignore
if (module.hot) {
  // eslint-disable-next-line
  // @ts-ignore
  module.hot.accept();
}

// @ts-ignore
console.log(ru + '');

render(
  <React.StrictMode>
    <HashRouter>
      <Authorization/>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
