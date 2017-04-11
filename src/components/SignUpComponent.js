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
  Button,
} from 'react-native';

// Initialize Parse
var Parse = require('parse/react-native');
var dims = Dimensions.get('window');

class SignUpComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  signUp() {
    alert("Email: \n" + this.state.email + "\n\nPassword: \n" + this.state.password);
    //Example Parse Query
    var user = new Parse.User();
    user.set("username", this.state.email);
    user.set("password", this.state.password);
    user.set("email", this.state.email);

    user.signUp(null, {
      success: (user) => {
        this.navigateToCamera();
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }

  navigateToCamera() {
    // Navigator is passed in as a prop in the App.js component
    this.props.navigator.push({
      name: 'Camera',
      type: 'None'
    });
  }

  navigateToLogin() {
    this.props.navigator.push({
      name: 'Login',
      type: 'Modal'
    })
  }

  render() {
    return (
      <View>
        <View style = {styles.titleBox}>
          <Text style = {styles.titleText}>
            ProductVision
          </Text>
          <Text style = {styles.subtitleText}>
            Find products by scanning barcodes.
          </Text>
        </View>
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
            onPress={this.signUp.bind(this)}>
            <Text style = {styles.signUpButtonText}>Sign Up</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style = {styles.existingLoginButton}
            underlayColor="transparent"
            onPress = {this.navigateToLogin.bind(this)}>
            <Text style = {styles.existingLoginButtonText}>Login to an existing account</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style = {styles.facebookConnectButton}
            underlayColor="#2C457B"
            onPress = {this.navigateToCamera.bind(this)}>
            <Text style = {styles.facebookConnectButtonText}>Connect with Facebook</Text>
          </TouchableHighlight>
          <Text style = {styles.termsText}>By signing up, you agree to our terms</Text>
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
  marginBottom: 12
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
  color: '#898989'
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
}
});

export default SignUpComponent;
