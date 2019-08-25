// Redux Store and Actions
import {createStore, applyMiddleware, compose} from 'redux';

// Enhancers and Middleware
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reduxReset from 'redux-reset';
import thunk from 'redux-thunk';

// Our Endpoints and Reducers
// import Endpoints from './config/Endpoints';  // TODO: Define any endpoints here
import createReducer from './rootReducer';

const postRehydrate = store => {
  // After launching app add custom code here
  // ie: if user is logged in go straight to store screen.
};

export default function configureStore(initialState = {}) {
  const persistConfig = {
    key: 'root',
    storage,
    blacklist: [],
  };

  const persistedReducer = persistReducer(persistConfig, createReducer());

  const store = createStore(
    persistedReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      reduxReset(),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );

  const persistor = persistStore(store, null, () => {
    postRehydrate(store);
  });

  return {store, persistor};
}
