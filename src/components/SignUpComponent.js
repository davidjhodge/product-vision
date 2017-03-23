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

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.mainText}>ProductVision</Text>
          <Text style = {styles.subText}>Find products by scanning barcodes.</Text>
        </View>
          <TextInput style={styles.loginInput} placeholder = 'Email'></TextInput>
          <TextInput style={styles.loginInput} placeholder = 'Password'></TextInput>
          <Button style = {styles.signUpButton} title = "Sign Up"></Button>
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
    height: 242
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
  }
});

export default SignUpComponent;
