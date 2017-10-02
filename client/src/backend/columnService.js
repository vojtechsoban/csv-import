export const getAvailableColumns = (availablColumns, assignedTypes = []) => {
  return availablColumns
    .filter(column => !assignedTypes.includes(column.type))
    .map(column => ({
      text: column.type,
      value: column.type
    }));
};

export const getAssignedColumnTypes = (assignedColumns) => (
  assignedColumns
    ? assignedColumns
    .filter(({type}) => (!!type))
    .map(({type}) => (type))
    : []
);

