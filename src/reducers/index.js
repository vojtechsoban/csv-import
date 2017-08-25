import {combineReducers} from 'redux'
import csvImport from '../frontend/modules/csvimport/csvImportReducer';

const rootReducer = combineReducers({csvImport});

export default rootReducer
