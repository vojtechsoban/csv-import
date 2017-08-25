// Import bundled CSS files globally
import 'semantic-ui-css/semantic.min.css';
import '../../../../assets/css/csv-import-page.css';

import {Grid, Button, Container, Segment} from 'semantic-ui-react'
import React, {Component} from 'react';
import CsvUploadDialog from './CsvUploadDialog';


export default class App extends Component {
  render() {
    return (
      <Container>
        <Segment.Group>
          <Segment>
            <CsvUploadDialog/>
          </Segment>
          <Segment>
          </Segment>
        </Segment.Group>
      </Container>
    );
  }
}
