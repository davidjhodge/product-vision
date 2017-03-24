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

class RecentSearchesComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>RecentSearches</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default RecentSearchesComponent;
