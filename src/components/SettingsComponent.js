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
import NavigationBar from 'react-native-navbar';

class SettingsComponent extends Component {

  logout() {
    Parse.User.logOut();
    this.props.navigator.pop();

    this.props.navigator.resetTo({
      name: 'Signup',
      type: 'None'
    })
  }

  cancel() {
    this.props.navigator.pop();
  }

  render() {
    const leftButtonConfig = {
      title: 'Cancel',
      handler: () => this.cancel()
    };

    return (
      <View style={styles.container}>
        <NavigationBar
          style={styles.navBar}
          title={{ title: 'Settings' }}
          leftButton={leftButtonConfig} />
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
  navBar: {
    width: '100%'
  },
  logout: {
    marginTop: 100,
  }
});

export default SettingsComponent;
