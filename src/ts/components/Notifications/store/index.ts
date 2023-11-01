import { makeObservable, observable, action } from 'mobx';

import localization from 'ts/helpers/Localization';
import IMessage from '../interfaces/Message';

interface INotificationsStore {
  timer: any;
  messages: IMessage[];
  show: Function;
  startClearTimer: Function;
}

class NotificationsStore implements INotificationsStore {
  timer: any = null;

  limit: number = 6;

  messages: IMessage[] = [];

  constructor() {
    makeObservable(this, {
      messages: observable,
      show: action,
      startClearTimer: action,
    });
  }

  static getTime() {
    return (new Date()).getTime();
  }

  show(message?: any) {
    this.messages.push({
      id: NotificationsStore.getTime(),
      title: localization.get(message?.title || message || 'common.notifications.save'),
      description: message?.description || '',
      type: message?.type || 'success',
    });
    if (this.messages.length > this.limit) {
      this.messages.shift();
    }
    this.startClearTimer();
  }

  startClearTimer() {
    if (this.timer) return;
    this.timer = setInterval(() => {
      const time = NotificationsStore.getTime() - 3500;
      this.messages = this.messages.filter((item: IMessage) => item?.id > time);
      if (this.messages.length) return;
      clearInterval(this.timer);
      this.timer = null;
    }, 500);
  }
}

const notificationsStore = new NotificationsStore();

export default notificationsStore;
