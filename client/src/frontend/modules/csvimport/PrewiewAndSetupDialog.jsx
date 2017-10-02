import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid, Button, Container, Segment, Table, Dropdown} from 'semantic-ui-react';
import {columnChange} from './csvImportActions';

const PreviewAndSetupDialog = ({preview, assignedColumns, changeColumnType}) => (
  <Segment className="horizontalOverflow">
    <Table>
      <Table.Header>
        <Table.Row>
          {preview[0].map((header, index) => (
            <Table.HeaderCell key={index}>{header}</Table.HeaderCell>))}
        </Table.Row>
        <Table.Row>
          {preview[0].map((header, index) => (
            <Table.HeaderCell key={index}>
              <Dropdown placeholder='Plese select ...'
                        onChange={(event, {value}) => changeColumnType(index, value)}
                        options={assignedColumns[index].options}
                        selection
                        basic
                        selectOnBlur={false}
                        text={assignedColumns[index].type}
                        value={assignedColumns[index].type}
              />
            </Table.HeaderCell>))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {preview.slice(1).map((row, index) => (
          <Table.Row key={index}>{row.map((cell, index) => (
              <Table.Cell key={index}>
                {cell}
              </Table.Cell>
            )
          )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </Segment>
);

PreviewAndSetupDialog.propTypes = {
  preview: PropTypes.array.isRequired,
  assignedColumns: PropTypes.array.isRequired,
  changeColumnType: PropTypes.func.isRequired
};

export default connect(
  ({csvImport: {preview, assignedColumns, availableColumns}}) => ({
    preview, assignedColumns, availableColumns
  }),
  dispatch => ({changeColumnType: (columnIndex, columnType) => dispatch(columnChange(columnIndex, columnType))})
)(PreviewAndSetupDialog);
