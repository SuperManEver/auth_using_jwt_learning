import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Provider, inject, observer } from 'mobx-react';

import LoginStore from './store';

import css from './style.scss';

@inject('loginStore')
@observer
class LoginPage extends Component {
  handleGoBack = () => {
    const { history } = this.props;

    history.push('/');
  };

  handleSubmit = evt => {
    evt.preventDefault();

    this.store.login();
  };

  handleUpdate = ({ target }) => {
    this.store.updateValues(target);
  };

  get store() {
    return this.props.loginStore;
  }

  render() {
    const { email, password } = this.store;

    return (
      <div>
        <form className={css.formContainer} onSubmit={this.handleSubmit}>
          <h3>Login</h3>
          <input
            name="email"
            value={email}
            placeholder="chubaka3000@alliance-fleet.com"
            onChange={this.handleUpdate}
          />
          <input
            name="password"
            value={password}
            placeholder="Password"
            onChange={this.handleUpdate}
          />
          <footer>
            <button onClick={this.handleGoBack}>Back</button>
            <button type="submit">Login</button>
          </footer>

          <NavLink to="/signup">Don't have an account?</NavLink>
        </form>
      </div>
    );
  }
}

export default props => (
  <Provider loginStore={LoginStore}>
    <LoginPage {...props} />
  </Provider>
);
