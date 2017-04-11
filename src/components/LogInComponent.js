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

import NavigationBar from 'react-native-navbar';

// Initialize Parse
var Parse = require('parse/react-native');
var dims = Dimensions.get('window');

class LogInComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  logIn() {
    Parse.User.logIn(this.state.email, this.state.password, {
      success: (user) => {
        this.navigateToCamera();
      },
      error: function(user, error) {
        alert("Login failed, username or password is incorrect.\nUsername: " + this.state.email + "\nPassword: " + this.state.password);
      }
    });
  };

  navigateToCamera() {
    // Navigator is passed in as a prop in the App.js component
    this.props.navigator.push({
      name: 'Camera',
      type: 'None'
    });
  }

  cancel() {
    this.props.navigator.pop();
  }

  render() {
    const leftButtonConfig = {
      title: 'Cancel',
      tintColor: "white",
      handler: () => this.cancel()
    };
    return (
      <View style={styles.container}>
        <NavigationBar
          style={styles.navBar}
          title={{ title: 'Login', tintColor: "white" }}
          statusBar={{ style: "light-content" }}
          tintColor="#8ec5fc"
          leftButton={leftButtonConfig} />
        <TextInput
          id = 'Email'
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.loginInput}
          placeholder = 'Email'
          onChangeText = {(email) => this.setState({email})}
          value = {this.state.text}/>
        <TextInput
          id = 'Password'
          style={styles.loginInput}
          placeholder = 'Password'
          secureTextEntry = {true}
          onChangeText = {(password) => this.setState({password})}
          value = {this.state.password}/>
          <TouchableHighlight
            style = {styles.signUpButton}
            underlayColor="#AAAAAA"
            onPress={this.logIn.bind(this)}>
            <Text style = {styles.signUpButtonText}>Sign in</Text>
          </TouchableHighlight>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  alignItems: 'center',
  //justifyContent: 'center',
  backgroundColor: 'white',
  },
  loginInput: {
    height: 48,
    width: '100%',
    paddingLeft: 24,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.4,
    color: '#898989',
  },
  signUpButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    width: dims.width - 48,
    backgroundColor: '#c8c8c8',
    borderRadius: 4,
    marginTop: 16,
  },
  signUpButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.4,
  },
  navBar: {
    width: '100%'
  }
});

export default LogInComponent;
