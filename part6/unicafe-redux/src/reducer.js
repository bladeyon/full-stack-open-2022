const initialState = {
  good: 0,
  ok: 0,
  bad: 0
};

const counterReducer = (state = initialState, action) => {
  console.log('before', {...state});
  switch (action.type) {
    case 'GOOD':
      ++state.good;
      break;
    case 'OK':
      // state = {
      //   good: 0,
      //   ok: 0,
      //   bad: 0
      // };
      state.good = state.ok = state.bad = 0;
      break;
    case 'BAD':
      ++state.bad;
      break;
    default:
      break;
  }
  return state;
};

export default counterReducer;
