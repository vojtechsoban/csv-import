import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Segment} from 'semantic-ui-react'
import Files from 'react-files';
import {filesChangedAction, filesChangedErrorAction} from './csvImportActions';

// TODO check if destroying selected/uploaded file is needed to avoid memory leaks

const DropZone = ({handleFilesChanged, handleFilesChangedError}) => (
  <Segment>
    <Files
      onChange={handleFilesChanged}
      onError={handleFilesChangedError}
      accepts={['text/csv', 'text/plain']}
      multiple={false}
      maxFiles={1}
      maxFileSize={10000000}
      minFileSize={0}
      clickable>
      Drop files here or click to upload
    </Files>
  </Segment>
);

DropZone.propTypes = {
  handleFilesChanged: PropTypes.func.isRequired,
  handleFilesChangedError: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleFilesChanged: files => dispatch(filesChangedAction(files)),
  handleFilesChangedError: error => dispatch(filesChangedErrorAction(error))
});

export default connect(() => ({}), mapDispatchToProps)(DropZone);
