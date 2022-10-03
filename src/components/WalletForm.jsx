import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { request, addExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    coinSelected: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    id: 0,
    value: 0,
  };

  componentDidMount() {
    const { call } = this.props;
    call(request());
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const index = target.options.selectedIndex;
    const element = target.options[index];

    this.setState({ [name]: element.value });
  };

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleValueChange = ({ target }) => {
    const { value } = target;
    this.setState({ value });
  };

  handleClick = (e) => {
    e.preventDefault();

    const { coinSelected, description, id, method, tag, value } = this.state;
    const { goExpense } = this.props;
    this.setState((state) => ({ id: state.id + 1 }));

    const object = { id, value, currency: coinSelected, method, tag, description };

    Array.from(document.querySelectorAll('input'))
      .forEach((input) => { input.value = ''; });

    goExpense(object);
  };

  render() {
    const { data } = this.props;

    return (
      <form className='wallet-form'>
          <input
            type="number"
            name="value"
            placeholder="Valor"
            data-testid="value-input"
            onChange={ this.handleValueChange }
          />
          <input
            type="text"
            name="description"
            autoComplete="off"
            placeholder="Descrição"
            data-testid="description-input"
            onChange={ this.handleInputChange }
          />
        <select
          name="coinSelected"
          onChange={ this.handleChange }
          data-testid="currency-input"
        >
          {
            Array(data).join('').split(',').map((coin, i) => (
              <option key={ i } value={ coin }>
                { coin }
              </option>
            ))
          }
        </select>

        <select
          name="method"
          onChange={ this.handleChange }
          data-testid="method-input"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <button type="submit" onClick={ this.handleClick }>
          Adicionar
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  call: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  call: (state) => dispatch(request(state)),
  goExpense: (state) => dispatch(addExpense(state)),
});

const mapStateToProps = (state) => ({
  data: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
