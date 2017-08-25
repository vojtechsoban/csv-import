import {CSV_FILES_CHANGED, CSV_REMOVE_FILE} from './csvImportActions';
export default (state = null, action) => {
  
  const result = Object.assign({}, state);
  
  switch (action.type) {

    case CSV_FILES_CHANGED:
      result.fileName = action.files[0].name;
      return result;

    case CSV_REMOVE_FILE:
      result.fileName = null;
      return result;

    default:
      return state;
  }
};
