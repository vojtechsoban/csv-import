import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid, Button, Container, Segment} from 'semantic-ui-react'

import Files from 'react-files';
import {filesChangedAction, removeFileAction} from './csvImportActions';

const FileSelected = ({fileName, onDeleteClicked}) => (
  <Grid columns={2}>
    <Grid.Row>
      <Grid.Column>{fileName}</Grid.Column>
      <Grid.Column><Button onClick={onDeleteClicked}>Delete</Button></Grid.Column>
    </Grid.Row>
  </Grid>
);

const DropZone = ({fileName, fileSelected, handleFilesChanged}) => (
  <Files
    onChange={handleFilesChanged}
    onError={files => console.log('Files error', files)}
    accepts={['text/plain', 'text/csv']}
    multiple
    maxFiles={1}
    maxFileSize={10000000}
    minFileSize={0}
    clickable
  >
    Drop files here or click to upload
  </Files>
);

const CsvUploadDialog = ({fileSelected, fileName, handleFilesChanged, removeFile}) => (
  <Segment>
    {fileSelected ? <FileSelected fileName={fileName} onDeleteClicked={removeFile.bind(this, fileName)}/> :
      <DropZone handleFilesChanged={handleFilesChanged}/>}
  </Segment>
);


const mapStateToProps = ({csvImport: state}) => {
  const result = {};
  if (state.fileName) {
    result.fileSelected = true;
    result.fileName = state.fileName;
  } else {
    result.fileSelected = false;
  }

  return result;
};

const mapDispatchToProps = dispatch => ({
  handleFilesChanged: files => dispatch(filesChangedAction(files)),
  removeFile: file => dispatch(removeFileAction(file))
});

export default connect(mapStateToProps, mapDispatchToProps)(CsvUploadDialog);
