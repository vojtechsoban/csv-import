import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid, Button, Container, Segment} from 'semantic-ui-react'
import {removeFileAction} from './csvImportActions';

const FileSelected = ({fileName, onDeleteClicked}) => (
  <Segment>
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column>{fileName}</Grid.Column>
        <Grid.Column><Button onClick={onDeleteClicked.bind(this, fileName)}>Delete</Button></Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

FileSelected.propTypes = {
  fileName: PropTypes.string.isRequired,
  onDeleteClicked: PropTypes.func.isRequired
};

export default connect(
  state => ({fileName: state.csvImport.fileName}),
  dispatch => ({onDeleteClicked: fileName => dispatch(removeFileAction(fileName))})
)(FileSelected);
