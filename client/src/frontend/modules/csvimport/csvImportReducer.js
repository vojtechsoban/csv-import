import {
  CSV_FILES_CHANGED,
  CSV_FILES_CHANGED_ERROR,
  CSV_REMOVE_FILE,
  FILE_UPLOADING,
  COLUMN_CHANGE
} from './csvImportActions';
import {PREVIEW, SELECT_FILE, UPLOADING} from './pageModeEnum';
import {getAvailableColumns, getAssignedColumnTypes} from '../../../backend/columnService';

export default (state = {}, action) => {
  
  switch (action.type) {
    
    case CSV_FILES_CHANGED: {
      
      const {preview, columns, analysis} = action.data;
      const availableColumns = getAvailableColumns(columns);
      const assignedColumns = analysis.map((column, index) => ({type: null, options: availableColumns}));
      
      return Object.assign({}, state, {
        preview,
        assignedColumns,
        allColumns: columns,
        mode: PREVIEW
      });
    }
    
    case COLUMN_CHANGE: {
      const {columnType, columnIndex} = action;
      if (columnType === 'remove' || columnType !== state.assignedColumns[columnIndex].type) {
        state.assignedColumns[columnIndex].type = null;
      }
      
      const assignedColumnTypes = getAssignedColumnTypes(state.assignedColumns);
      if (columnType !== 'remove') {
        assignedColumnTypes.push(columnType);
      }
      const availableColumns = getAvailableColumns(state.allColumns, assignedColumnTypes);
      
      const unsetColumn = {
        text: 'Unset',
        value: 'remove'
      };
      
      const assignedColumns = state.assignedColumns.map((column, index) => {
        if (index === columnIndex && columnType !== 'remove') {
          return {
            type: columnType,
            options: [unsetColumn, ...availableColumns]
          };
        } else if (column.type) {
          
          return Object.assign({}, column, {
            options: [unsetColumn, ...availableColumns]
          });
        } else {
          return Object.assign({}, column, {
            options: availableColumns
          });
        }
      });
      
      return Object.assign({}, state, {assignedColumns});
    }
    
    case FILE_UPLOADING:
      return Object.assign({}, state, {
        fileName: action.fileName,
        mode: UPLOADING
      });
    
    case CSV_FILES_CHANGED_ERROR:
      console.error(`Something went wrong: code=${action.error.code}: message=${action.error.message}`, action.error);
      return Object.assign({}, state, {
        error: action.error.message,
        fileName: null,
        availableColumns: null,
        assignedColumns: null,
        preview: null,
        allColumns: null,
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
