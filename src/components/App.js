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

// Initialize Parse
var Parse = require('parse/react-native');
Parse.initialize("pqjygx3eAiWlqKGyvD58yDNOhmnb2URbAtjIAajj", "Hk5fRaxZKZYGI58bSWJnTVkEsET0ppWveAEMljIk");
Parse.masterKey = "vorb886n7VBoODLtWl6GZPV0thVPHmPCi974LBL2";
Parse.serverURL = "https://parseapi.back4app.com/";

class App extends Component {
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
    // var initialRoute = {};
    // if (Parse.User.current() !== null) {
    //   initialRoute = {name: 'Camera'};
    // } else {
      initialRoute = {name: 'Signup'};
    // }

    return (
      <View style={styles.container}>
        <Navigator
          style={{ flex: 1 }}
          initialRoute={initialRoute}
          renderScene={this.renderScene.bind(this)}
          configureScene={this.configureScene.bind(this)}
          />
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
