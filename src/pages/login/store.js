import { observable, action } from 'mobx';

import AuthStore from 'stores/auth';

class LoginStore {
  @observable email = 'bob@mail.ru';
  @observable password = '123123';

  login() {
    this.auth.login(this);
  }

  @action
  updateValues({ name, value }) {
    this[name] = value;
  }

  get auth() {
    return AuthStore;
  }
}

export default new LoginStore();
