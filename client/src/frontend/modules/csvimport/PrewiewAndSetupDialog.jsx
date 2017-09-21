import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid, Button, Container, Segment, Table, Dropdown} from 'semantic-ui-react'

// Optimized for Ceska sporitelna, csv import, cp-1250 charset:
//
// 0 item/description
// 2 amount
// 3 counter account
// date of transaction

const columns = new Set([0, 2, 3, 4]);
// const filterColumns = (item, index) => (columns.has(index));
const filterColumns = (item, index) => true;

const PreviewAndSetupDialog = ({preview}) => (
  <Segment className="horizontalOverflow">
    <Table>
      <Table.Header>
        <Table.Row>
          {preview[0].filter(filterColumns).map((header, index) => (
            <Table.HeaderCell key={index}>{header}</Table.HeaderCell>))}
        </Table.Row>
        <Table.Row>
          {preview[0].filter(filterColumns).map((header, index) => (
            <Table.HeaderCell key={index}><Dropdown placeholder='ahoj' selection options={[{text: 't1', value: 'v1'}, {text: 't2', value: 'v2'}]}/></Table.HeaderCell>))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {preview.slice(1).map((row, index) => (
          <Table.Row key={index}>{row.filter(filterColumns).map((cell, index) => (
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
  data: PropTypes.array.isRequired
};

export default connect(
  ({csvImport}) => ({
    preview: csvImport.data.preview
  }),
)(PreviewAndSetupDialog);
