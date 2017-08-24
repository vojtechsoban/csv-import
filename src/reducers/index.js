import {combineReducers} from 'redux'
import csvImport from './CsvImportReducer';

const rootReducer = combineReducers({csvImport});

export default rootReducer
