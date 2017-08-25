import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import CsvImportPage from '../frontend/modules/csvimport/CsvImportPage'
import DevTools from './DevTools';

export default class Root extends Component {

  static propTypes = {store: PropTypes.object.isRequired};

  render() {
    const {store} = this.props;
    return (
      <Provider store={store}>
        <div>
          <CsvImportPage />
          <DevTools />
        </div>
      </Provider>
    );
  }
}
