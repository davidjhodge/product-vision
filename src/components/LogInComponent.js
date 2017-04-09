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
    // this.setState({
    //   username: "Jimmy"
    // });
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

    // TODO
    // 1. Add a route to the renderScene method in App.js
    // 2. Uncomment and call this logic below
    // this.props.navigator.push({
    //   name: 'WhateverYourRouteIsCalled',
    //   type: 'Modal', // Animation type. Could also be 'Normal' or 'None'
    //   passProps: {
    //     // If you needed to pass props, they would go here
    //   }
    // });


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
      handler: () => this.cancel()
    };
    return (
      <View>
      <NavigationBar
        style={styles.navBar}
        title={{ title: 'Login' }}
        leftButton={leftButtonConfig} />
        <TextInput
          id = 'Email'
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
  backgroundColor: '#ecf0f1',
},
titleBox: {
  height: 242,
  width: '100%',
  backgroundColor: '#8ec5fc',
  justifyContent: 'center',
},
titleText: {
  fontSize: 24,
  textAlign: 'center',
  color: '#ffffff',
  fontWeight: '600',
  letterSpacing: -0.4,
},
subtitleText: {
  fontSize: 16,
  textAlign: 'center',
  color: '#ffffff',
  letterSpacing: -0.4,
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
  marginLeft: 24,
  borderRadius: 4,
  marginTop: 16,
},
signUpButtonText: {
  color: '#ffffff',
  fontSize: 20,
  fontWeight: '600',
  letterSpacing: -0.4,
},
existingLoginButton: {
  backgroundColor: 'rgba(0,0,0,0)',
  marginTop: 16,
  marginBottom: 116,
  alignItems: 'center',
},
existingLoginButtonText: {
  color: '#72acfd',
  fontSize: 14,
  fontWeight: '600',
  letterSpacing: -0.4,
},
facebookConnectButton: {
  backgroundColor: '#3b5998',
  borderRadius: 4,
  width: dims.width - 48,
  marginLeft: 24,
  height: 48,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 24,
},
facebookConnectButtonText: {
  color: '#ffffff',
  fontSize: 20,
  fontWeight: '600',
},
termsText: {
  color: '#9b9b9b',
  textAlign: 'center',
},
navBar: {
  width: '100%'
}
});

export default LogInComponent;
