import React, { Component } from 'react';
import { Navigator, View, Text, TouchableHighlight, StyleSheet } from 'react-native';
// This is how you import components from one file to another.
// The reason it's CameraComponent, not { Camera Component } (Note the brackets)
// is because in CameraComponent.jsx, export default is used.
// Export default means only one item is exported.
// If multiple items were exportable in one file, you would just do "export CameraComponent"
import CameraComponent from './CameraComponent.js';
import SignUpComponent from './SignUpComponent.js';
import RecentSearchesComponent from './RecentSearchesComponent.js';
import SettingsComponent from './SettingsComponent.js';
import RelatedProductsComponent from './RelatedProductsComponent.js';
import ProductWebComponent from './ProductWebComponent.js';
import LogInComponent from './LogInComponent.js';

import Transitions from '../lib/transitions.js';

import config from '../lib/config.js';

// Initialize Parse
var Parse = require('parse/react-native');

Parse.initialize(config.ParseApplicationId, config.ParseJavaScriptKey);
Parse.masterKey = config.ParseMasterKey;
Parse.serverURL = "https://parseapi.back4app.com/";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialRoute: null
    };

    // Route to login/camera based on whether or not a user is logged in
    Parse.User.currentAsync().then(() => {
          console.log(Parse.User.current());
          if (Parse.User.current() == null) {
            this.setState({
              initialRoute: {name: 'Signup'},
            });
          } else {
            this.setState({
              initialRoute: {name: 'Camera'},
            });
            console.log("Updated to camera state");
          }
        }, (error) => {
          console.log(error);
          this.setState({
            initialRoute: {name: 'Signup'},
          });
    });
  }
  // Given a route name, renderScene selects the corresponding component
  renderScene(route, navigator) {
    if (route.name === 'Signup') {
      // Pass navigtor prop AND any props contained in the route.passProps field
      // ... is called the spread operator. It means you pass all props in the given object
      // down to the child
      return <SignUpComponent navigator={navigator} {...route.passProps} />

    } else if (route.name === 'Camera') {
      return <CameraComponent navigator={navigator} {...route.passProps} />

    } else if (route.name === 'RecentSearches') {
      return <RecentSearchesComponent navigator={navigator} {...route.passProps} />

    } else if (route.name === 'Settings') {
      return <SettingsComponent navigator={navigator} {...route.passProps} />

    } else if (route.name === 'RelatedProducts') {

      return <RelatedProductsComponent navigator={navigator} {...route.passProps} />
    } else if (route.name === 'WebView') {

      return <ProductWebComponent navigator={navigator} {...route.passProps} />
    } else if (route.name === 'Login') {

      return <LogInComponent navigator={navigator} {...route.passProps} />
    }
  }

  // Defines how the scene transitions animate
  configureScene(route, routeStack) {
    if (route.type === 'Modal') {
      return Navigator.SceneConfigs.FloatFromBottom;
    } else if (route.type === 'None') {
      return Transitions.NONE;
    }

    // Default
    return Navigator.SceneConfigs.PushFromRight;
  }

  render() {
    return (
        <View style={styles.container}>
          { this.state.initialRoute ?
            <Navigator
              style={{ flex: 1 }}
              initialRoute={this.state.initialRoute}
              renderScene={this.renderScene.bind(this)}
              configureScene={this.configureScene.bind(this)}
            />
            :
            <View></View>
          }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  }
});

export default App;