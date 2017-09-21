

export const getMissingColumns = (requiredColumns, optionalColumns, assignedColumns) => {
  return requiredColumns.concat(optionalColumns).filter(column => !assignedColumns.includes(column));
};
