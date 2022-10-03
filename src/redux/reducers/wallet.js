const initialState = {
  currencies: [],
  expenses: [],
  ask: 0,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'API_REQUEST':
    return { ...state, currencies: action.data };
  case 'SEND_EXPENSES':
    return { ...state, expenses: [...state.expenses, action.expense] };
  case 'RELOAD_EXPENSES':
    return { ...state, expenses: action.expense };
  case 'SEND_ASK':
    return { ...state, ask: action.ask + state.ask };
  case 'RELOAD_ASK':
    return { ...state, ask: state.ask - action.ask };
  default:
    return state;
  }
};

export default wallet;
