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
      if (columnType === 'remove') {
        state.assignedColumns[columnIndex].type = null;
      }
      const assignedColumnTypes = getAssignedColumnTypes(state.assignedColumns);
      const availableColumns = getAvailableColumns(state.allColumns, assignedColumnTypes);

      const assignedColumns = state.assignedColumns.map((column, index) => {
        if (index === columnIndex && columnType !== 'remove') {
          return {
            type: columnType,
            options: [{
              text: columnType,
              value: columnType
            }, {
                text: 'Remove 1',
                value: 'remove'
              },
              ...availableColumns
            ]
          };
        } else if (index === columnIndex && columnType === 'remove') {
          return {
            type: null,
            options: [{
                text: 'Remove 2',
                value: 'remove'
              },
              ...availableColumns
            ]
          };
        } else if (column.type) {
          return Object.assign({}, column, {
            options: [{
              text: column.type,
              value: column.type
            }, {
              text: 'Remove 3',
              value: 'remove'
            },
              ...availableColumns]
          });
        } else {
          return Object.assign({}, column, {
            options: [{
              text: 'Unset',
              value: 'empty'
            },
              ...availableColumns]
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
