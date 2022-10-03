import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FiLogIn } from 'react-icons/fi';

import { sendEmail } from '../redux/actions';
import '../styles/login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;

      const checkEmail = (
        email.trim()
        && email.toLowerCase()
        && email.includes('@')
        && email.includes('.com')
      );

      const six = 6;

      if ((checkEmail === true) && (password.length >= six)) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  };

  handleClick = (e) => {
    e.preventDefault();

    const { email } = this.state;
    const { mail, history } = this.props;

    mail(email);
    this.setState({ email: '', password: '' });

    history.push('/carteira');
  };

  render() {
    const { isDisabled } = this.state;

    return (
      <main className='login'>
        <section>
          <span className='login-logo'>
            Machado
            <strong>Wallet</strong>
          </span>
        </section>
        <form className='login-form'>
          <input
            type="email"
            name="email"
            placeholder="E-Mail"
            data-testid="email-input"
            className='email'
            onChange={ this.handleChange }
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            data-testid="password-input"
            className='password'
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            disabled={ isDisabled }
            onClick={ this.handleClick }
            className='login-button'
          >
            <span>
              Entrar
            </span>
            <i>
              <FiLogIn className='icon' />
            </i>
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  mail: PropTypes.func,
  history: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  mail: (state) => dispatch(sendEmail(state)),
});

export default connect(null, mapDispatchToProps)(Login);
