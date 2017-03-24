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

class RelatedProductsComponent extends Component {
  back() {
    // Re-enable barcode Scanner
    this.props.callback();
    this.props.navigator.pop();
  }

  searchProducts(barcode) {
    // Search Amazon for this barcode
  }

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this.back.bind(this)}>Back</Text>
        <Text>RecentSearches</Text>
        <Text>{this.props.barcode}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 40, //TEMP
  }
});

RelatedProductsComponent.propTypes = {
  barcode: React.PropTypes.string.isRequired,
  callback: React.PropTypes.func
};

export default RelatedProductsComponent;
