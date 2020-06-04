// store.js
import React, { createContext, useReducer } from 'react';

// logger
import logger from 'use-reducer-logger';

import reducerFunction from './reducer';

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(logger(reducerFunction), initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
