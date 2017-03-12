import React, { Component } from 'react';
import { Navigator, View, Text, TouchableHighlight, StyleSheet } from 'react-native';
// This is how you import components from one file to another.
// The reason it's CameraComponent, not { Camera Component } (Note the brackets)
// is because in CameraComponent.jsx, export default is used.
// Export default means only one item is exported.
// If multiple items were exportable in one file, you would just do "export CameraComponent"
import CameraComponent from './CameraComponent.js';

// Routes
const routes = [
  {title: 'First Scene', index: 0},
  {title: 'Second Scene', index: 1},
];

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={(route, navigator) =>
            <CameraComponent />
          }
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
