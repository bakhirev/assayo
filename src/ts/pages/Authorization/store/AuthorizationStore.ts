import {
  makeAutoObservable,
  observable,
} from 'mobx';

class AuthorizationStore {
  state: string = 'WAITING';

  isInitialization: boolean = true;

  constructor() {
    makeAutoObservable(this, {
      state: observable,
      isInitialization: observable,
    });
  }
}

const authorizationStore = new AuthorizationStore();

export default authorizationStore;
