const initialState = {
  user: {
    email: '',
  },
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case 'SEND_EMAIL':
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default user;
