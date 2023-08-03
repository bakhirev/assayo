import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react-lite';

import Message from './components/Message';
import IMessage from './interfaces/Message';
import notificationsStore from './store/index';
import style from './styles/index.module.scss';


const Notifications = observer(() => {
  const items = notificationsStore.messages.map((message: IMessage) => (
    <Message
      key={message.id}
      message={message}
    />
  ));

  return ReactDOM.createPortal((
    <div className={style.notifications}>
      {items}
    </div>
  ), document.body);
});

export default Notifications;
