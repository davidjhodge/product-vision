// Import this line in every React component
import React, { Component } from 'react';
// Import different modules from the react-native package
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  Button
} from 'react-native';

var Parse = require('parse/react-native');

class SettingsComponent extends Component {

  logout() {
    Parse.User.logOut();
    this.props.navigator.pop();

    this.props.navigator.resetTo({
      name: 'Login',
      type: 'None'
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor="transparent"
          style={styles.logout}
          onPress={this.logout.bind(this)}>
          <Text>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  logout: {
    marginTop: 100,
  }
});

export default SettingsComponent;
