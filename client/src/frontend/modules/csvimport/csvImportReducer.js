import {CSV_FILES_CHANGED, CSV_FILES_CHANGED_ERROR, CSV_REMOVE_FILE, FILE_UPLOADING} from './csvImportActions';
import {PREVIEW, SELECT_FILE, UPLOADING} from './pageModeEnum';

export default (state = {}, action) => {

  switch (action.type) {

    case CSV_FILES_CHANGED:
      return Object.assign({}, state, {
        data: action.data,
        mode: PREVIEW
      });

    case FILE_UPLOADING:
      return Object.assign({}, state, {
        fileName: action.fileName,
        mode: UPLOADING
      });

    case CSV_FILES_CHANGED_ERROR:
      console.error(`Something went wrong: code=${action.error.code}: message=${action.error.message}`);
      return Object.assign({}, state, {
        error: action.error.message,
        fileName: null,
        mode: SELECT_FILE
      });

    case CSV_REMOVE_FILE:
      return Object.assign({}, state, {
        fileName: null,
        mode: SELECT_FILE
      });

    default:
      return state;
  }
};
