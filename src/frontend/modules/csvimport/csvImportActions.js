export const CSV_FILES_CHANGED = 'CSV_FILES_CHANGED';
export const CSV_REMOVE_FILE = 'CSV_REMOVE_FILE';

export const filesChangedAction = files => ({type: CSV_FILES_CHANGED, files});
export const removeFileAction = fileName => ({type: CSV_REMOVE_FILE, fileName});
