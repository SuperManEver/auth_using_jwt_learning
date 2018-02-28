import { observable, reaction, computed } from 'mobx';
import isNull from 'lodash/isNull';

import Notify from './notification';

const AUTH_TOKEN_STORAGE_KEY = 'authToken';

class Auth {
  @observable token = null;

  constructor() {
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

    if (!isNull(token)) {
      this.token = token;
    }
  }

  @computed
  get isLoggedIn() {
    return !isNull(this.token);
  }

  addTokenToLocalStorage = token => {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  };

  clearTokenFromStorage = () => {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  };

  async login({ email, password }) {
    const url = 'http://localhost:3001/api/users/authenticate';

    try {
      const { token } = await fetch(url, {
        method: 'post',
        body: JSON.stringify({
          user: email,
          password,
        }),
      }).then(res => res.json());

      this.token = token;
      this.addTokenToLocalStorage(token);

      Notify.showMessage({ message: "You've been logged in!" });
    } catch (err) {
      console.error(err);
    }
  }

  logout = () => {
    this.token = null;
    this.clearTokenFromStorage();

    Notify.showMessage({ message: "You've logged out!" });
  };
}

export default new Auth();
