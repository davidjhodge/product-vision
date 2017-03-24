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


class SignUpComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  signUp() {
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
  }

  navigateToCamera() {
    // Navigator is passed in as a prop in the App.js component
    this.props.navigator.push({
      name: 'Camera',
      passProps: {

      },
      type: 'None'
    });
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.mainText}>ProductVision</Text>
          <Text style = {styles.subText}>Find products by scanning barcodes.</Text>
        </View>
        <TextInput style={styles.loginInput} placeholder = 'Email'></TextInput>
        <TextInput style={styles.loginInput} placeholder = 'Password'></TextInput>
        <Button
          style={styles.signUpButton}
          title="Sign Up"
          onPress={this.signUp.bind(this)}>
        </Button>
        <Button
          style={styles.completionButton}
          title="Complete Login"
          onPress={this.navigateToCamera.bind(this)}>
        </Button>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8ec5fc',
    // height: 242  //**Setting the explicit height in a flex container is causing problems (I think)
  },
  mainText: {
    color: '#ffffff',
    fontSize: 24,
  },
  subText: {
    color: '#ffffff',
    fontSize: 16,
  },
  loginInput: {
    height: 48,
    width: '100%',
  },
  signUpButton:{
    height: 48,
    marginRight: 24,
    marginLeft:24,
    fontSize: 20,
    backgroundColor: '#c8c8c8'
  },
  completionButton: {
    height: 48,
    marginRight: 24,
    marginLeft:24,
    fontSize: 20,
    backgroundColor: '#c8c8c8'
  }
});

export default SignUpComponent;
