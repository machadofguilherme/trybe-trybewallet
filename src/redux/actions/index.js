export const sendEmail = (email) => ({
  type: 'SEND_EMAIL',
  email,
});

const apiRequest = (data) => ({
  type: 'API_REQUEST',
  data,
});

const sendExpenses = (expense) => ({
  type: 'SEND_EXPENSES',
  expense,
});

const sendAsk = (ask) => ({
  type: 'SEND_ASK',
  ask,
});

export const reloadAsk = (ask) => ({
  type: 'RELOAD_ASK',
  ask,
});

export const reloadExpenses = (expense) => ({
  type: 'RELOAD_EXPENSES',
  expense,
});

export const addExpense = (object) => {
  const expenseApi = async (dispatch) => {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const api = await fetch(url);
    const json = await api.json();
    const list = Object.keys(json);

    object.exchangeRates = json;

    const currencyValue = Array(object).find((e) => list.includes(e.currency)).currency;
    const exchangeValues = Object.values(object.exchangeRates);
    const infoCurrency = exchangeValues.find((value) => value.code === currencyValue);

    const askValue = object.value * infoCurrency.ask;

    dispatch(sendExpenses(object));
    dispatch(sendAsk(askValue));
  };
  return expenseApi;
};

export const request = () => {
  const actionApi = async (dispatch) => {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const api = await fetch(url);
    const json = await api.json();
    const list = Object.keys(json);
    const newList = list.filter((name) => name !== 'USDT');
    dispatch(apiRequest(newList));
  };
  return actionApi;
};
