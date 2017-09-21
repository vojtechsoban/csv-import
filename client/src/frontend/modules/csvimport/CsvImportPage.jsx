import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// Import bundled CSS files globally
import 'semantic-ui-css/semantic.min.css';
import '../../../../assets/css/csv-import-page.css';

import {Container, Segment} from 'semantic-ui-react'
import {PREVIEW, SELECT_FILE, UPLOADING} from './pageModeEnum';
import SelectedFileDialog from './SelectedFileDialog';
import PreviewAndSetupDialog from './PrewiewAndSetupDialog';
import UploadFileDialog from './UploadFileDialog';
import FileProcessingDialog from './FileProcessingDialog';

const CsvUploadDialog = (mode) => {
  switch (mode) {
    case PREVIEW:
      return [<SelectedFileDialog key="selectedFileDialog"/>,
        <PreviewAndSetupDialog key="previewAndSetupDialog"/>
      ];
    case SELECT_FILE:
      return <UploadFileDialog/>;
    case UPLOADING:
      return <FileProcessingDialog/>;
    default:
      return <Segment>CsvUploadDialog: Unsupported mode: {mode}</Segment>
  }
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Segment.Group>
          {CsvUploadDialog(this.props.mode)}
        </Segment.Group>
      </Container>
    );
  }
}

App.propTypes = {
  mode: PropTypes.string.isRequired
};

const mapStateToProps = ({csvImport: state}) => ({mode: state.mode});

export default connect(mapStateToProps)(App);
