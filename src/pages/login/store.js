import { observable, action } from 'mobx';

class LoginStore {
  @observable email = '';
  @observable password = '';

  login() {
    console.log('login!');
  }

  @action
  updateValues({ name, value }) {
    this[name] = value;
  }
}

export default new LoginStore();
