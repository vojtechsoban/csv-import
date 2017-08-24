import { createStore } from 'redux';
import rootReducer from '../reducers';

export const configureStore = initialState => createStore(rootReducer, initialState);
