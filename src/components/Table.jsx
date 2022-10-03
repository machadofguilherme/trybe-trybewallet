import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { reloadAsk, reloadExpenses } from '../redux/actions';

class Table extends Component {
  render() {
    const { expense, reload, newAsk } = this.props;

    const getValue = (value) => Number(value).toFixed(2);

    const getAsk = (currency, value) => {
      const expenseValues = Object.values(expense);
      const exchangeInfo = expenseValues.find((a) => a).exchangeRates;

      const x1 = Array(exchangeInfo).find((a) => a);
      const x2 = Object.values(x1);
      const x3 = x2.find((a) => a.code === currency).ask;

      const result = Number(x3) * Number(value);
      return Number(result).toFixed(2);
    };

    const getName = (currency) => {
      const expenseValues = Object.values(expense);
      // const currencyName = expenseValues.find((a) => a).currency;
      const exchangeInfo = expenseValues.find((a) => a).exchangeRates;

      const x1 = Array(exchangeInfo).find((a) => a);
      const x2 = Object.values(x1);
      const x3 = x2.find((a) => a.code === currency).name;

      return x3;
    };

    const handleClick = (data) => {
      const newList = expense.filter((item) => item.id !== data.id);
      const value = getAsk(data.currency, data.value);

      reload(newList);
      newAsk(value);
    };

    return (
      <table className='wallet-table'>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Moeda de conversão</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody className='wallet-table-content'>
          {
            expense.map((info) => (
              <tr key={ info.id }>
                <td>{ info.description }</td>
                <td>{ info.method }</td>
                <td>{ getValue(info.value) } $</td>
                <td>{ getName(info.currency) }</td>
                <td>{ getAsk(info.currency, info.value) }</td>
                <td classsName='xablau'>
                  <button
                  className='wallet-table-delete'
                    onClick={ () => handleClick(info) }
                    type="button"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expense: PropTypes.arrayOf.isRequired,
  reload: PropTypes.arrayOf.isRequired,
  newAsk: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  expense: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  reload: (state) => dispatch(reloadExpenses(state)),
  newAsk: (state) => dispatch(reloadAsk(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
