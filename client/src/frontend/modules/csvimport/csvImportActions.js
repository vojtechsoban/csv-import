import {uploadCsv} from './../../../backend/api';

export const CSV_FILES_CHANGED = 'CSV_FILES_CHANGED';
export const CSV_FILES_CHANGED_ERROR = 'CSV_FILES_CHANGED_ERROR';
export const CSV_REMOVE_FILE = 'CSV_REMOVE_FILE';
export const FILE_UPLOADING = 'FILE_UPLOADING';

export const filesChangedAction = files => {
  
  // react-files calls callback even if some error ocurred. So ignore the empty action.
  if (files.length === 0) {
    return {type: 'IGNORED'};
  }
  
  return dispatch => {
    const fileName = files[0].name;
    dispatch({type: FILE_UPLOADING, fileName});
    uploadCsv(files[0])
      .then(data => dispatch({type: CSV_FILES_CHANGED, fileName, data}))
      .catch(error => dispatch({type: CSV_FILES_CHANGED_ERROR, error}));
  }
};

export const filesChangedErrorAction = error => ({type: CSV_FILES_CHANGED_ERROR, error});
export const removeFileAction = fileName => ({type: CSV_REMOVE_FILE, fileName});
