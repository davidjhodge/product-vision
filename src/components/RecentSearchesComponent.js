// Import this line in every React component
import React, { Component } from 'react';
// Import different modules from the react-native package
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  Button
} from 'react-native';

import NavigationBar from 'react-native-navbar';

class RecentSearchesComponent extends Component {
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
          title={{ title: 'Recent Searches' }}
          leftButton={leftButtonConfig} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  navBar: {
    width: '100%'
  },
});

export default RecentSearchesComponent;
