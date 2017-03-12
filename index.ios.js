/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 /**
    This is the entry point for iOS.
 **/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './src/components/App.js';

export default class ProductVision extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('ProductVision', () => ProductVision);
