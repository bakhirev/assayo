import React from 'react';
import ReactDOM from 'react-dom';

import Button from './components/Button';
import style from './index.module.scss';

function Tooltip() {
  return ReactDOM.createPortal((
    <div className={style.translation_tooltip}>
      <Button
        icon="./assets/switch/team.svg"
        title="translation.tooltip.clear"
        onClick={() => {
          console.log('clear');
        }}
      />
      <Button
        icon="./assets/switch/team.svg"
        title="translation.tooltip.list"
        onClick={() => {
          console.log('list');
        }}
      />
      <Button
        icon="./assets/switch/team.svg"
        title="translation.tooltip.import"
        onClick={() => {
          console.log('import');
        }}
      />
      <Button
        icon="./assets/switch/team.svg"
        title="translation.tooltip.export"
        onClick={() => {
          console.log('export');
        }}
      />
    </div>
  ), document.body);
}

export default Tooltip;
