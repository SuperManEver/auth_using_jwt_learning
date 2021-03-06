import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import css from './style.scss';

class LoginPage extends Component {
  handleGoBack = () => {
    const { history } = this.props;

    history.push('/');
  };

  handleSubmit = evt => {
    evt.preventDefault();

    console.log('submit form!');
  };

  render() {
    return (
      <div>
        <form className={css.formContainer} onSubmit={this.handleSubmit}>
          <h3>Singup</h3>
          <input placeholder="Mark the Awesomeness" />
          <input placeholder="chubaka3000@alliance-fleet.com" />
          <input placeholder="Password" />
          <footer>
            <button onClick={this.handleGoBack}>Back</button>
            <button type="submit">Login</button>
          </footer>

          <NavLink to="/login">Already have an account?</NavLink>
        </form>
      </div>
    );
  }
}

export default LoginPage;
