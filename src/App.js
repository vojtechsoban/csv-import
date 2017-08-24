// Import bundled CSS files globally
import 'semantic-ui-css/semantic.min.css';
import {Grid, Button, Container, Segment} from 'semantic-ui-react'
import React, {Component} from 'react';

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

export default class App extends Component {
  
  render() {
    return (
      <Container>
        <Segment.Group>
          <Segment>
            segment 1
          </Segment>
          <Segment>
            segment 2
          </Segment>
        </Segment.Group>
        
        <Grid.Row>
          <Grid.Column>
            column 1
          </Grid.Column>
        </Grid.Row>
      </Container>
    );
  }
}
