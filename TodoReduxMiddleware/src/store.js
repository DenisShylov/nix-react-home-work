import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import TodoReducer from './TodoReducer.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  TodoReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
