import moment from 'moment';

// properties must match reducer names - see reducers/index.js

const start = moment().valueOf();

export const initialState = {
  csvImport: {
    fileName: null
  }
};

