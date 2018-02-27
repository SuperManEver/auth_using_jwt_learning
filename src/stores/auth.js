import { observable, reaction, computed } from 'mobx';
import isNull from 'lodash/isNull';

class Auth {
  @observable token = null;

  constructor() {
    const token = localStorage.getItem('token');

    if (!isNull(token)) {
      this.token = token;
    }
  }

  async login({ email, password }) {
    const url = 'http://localhost:3001/api/users/authenticate';

    const { token } = await fetch(url, {
      method: 'post',
      body: JSON.stringify({
        user: email,
        password,
      }),
    }).then(res => res.json());

    // TODO: save to 'localStorage'
    this.token = token;
  }

  // TODO: add logout

  @computed
  get isLoggedIn() {
    return !isNull(this.token);
  }
}

const authStore = new Auth();

const onAuth = reaction(
  () => authStore.token,
  token => console.log(`new token is ${token}`),
);

export default authStore;
