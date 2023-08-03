import { makeObservable, observable, action } from 'mobx';

import IMessage from '../interfaces/Message';

interface INotificationsStore {
  timer: any;
  messages: IMessage[];
  show: Function;
  startClearTimer: Function;
}

class NotificationsStore implements INotificationsStore {
  timer: any = null;

  messages: IMessage[] = [];

  constructor() {
    makeObservable(this, {
      messages: observable,
      show: action,
      startClearTimer: action,
    });
  }

  show(message?: any) {
    this.messages.push({
      id: Math.random(),
      title: message?.title || message || 'Изменения сохранены',
      description: message?.description || '',
      type: message?.type || 'success',
    });
    this.startClearTimer();
  }

  startClearTimer() {
    if (this.timer) return;
    this.timer = setInterval(() => {
      this.messages.shift();
      if (this.messages.length) return;
      clearInterval(this.timer);
      this.timer = null;
    }, 3500);
  }
}

const notificationsStore = new NotificationsStore();

export default notificationsStore;
