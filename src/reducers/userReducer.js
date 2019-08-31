// Actions
const UPDATE_EMAIL = 'UPDATE_EMAIL';

// Initial state
const initialState = {
  email: 'bobthedog@googlymoogly.com',
  first_name: 'Bob',
  last_name: 'TheDog',
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_EMAIL:
      console.log('UPDATE_EMAIL reducer hit');
      return {
        ...state,
        email: action.payload,
      };
    case 'LOG_OUT':
      return initialState;
    default:
      return state;
  }
}

// Action creators
export function addEmail(payload) {
  return {type: UPDATE_EMAIL, payload};
}

// Thunks
