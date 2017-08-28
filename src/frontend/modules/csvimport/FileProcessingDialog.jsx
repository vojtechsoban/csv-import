import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Segment, Label} from 'semantic-ui-react'

const FileProcesingDialog = ({fileName}) => (
  <Segment>
    <Label>File '{fileName}' is processing.</Label>
  </Segment>
);

FileProcesingDialog.propTypes = {
  fileName: PropTypes.string.isRequired
};

export default connect(({csvImport}) => ({fileName: csvImport.fileName}))(FileProcesingDialog);
