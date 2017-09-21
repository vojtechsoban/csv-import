import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import rootReducer from '../reducers';

export const configureStore = initialState => createStore(rootReducer, initialState, compose(applyMiddleware(thunkMiddleWare)));
