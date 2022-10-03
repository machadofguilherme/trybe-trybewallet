import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AiOutlineMail } from 'react-icons/ai';
import { BsWallet2 } from 'react-icons/bs';
import { TbExchange } from 'react-icons/tb';

class Header extends Component {
  render() {
    const { email, ask } = this.props;

    return (
        <header className='wallet-header'>
          <section className='wallet-logo'>
            <span>
              Machado
              <strong>Wallet</strong>
            </span>
          </section>
          <section className='wallet-info'>
            <span className="total">
              <BsWallet2 className='excense-icon' />
                { ask.toFixed(2) } <span>R$</span>
            </span>
            <p className='exchange-default'>
              <TbExchange className='exchange-icon' /> BRL
            </p>
          </section>
          <section className="wallet-email">
              { email }
              <AiOutlineMail className='email-icon' />
          </section>
        </header>
    );
  }
}

Header.propTypes = {
  ask: PropTypes.any,
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  ask: state.wallet.ask,
});

export default connect(mapStateToProps)(Header);
