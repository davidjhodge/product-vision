import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  WebView
} from 'react-native';

class ProductWebComponent extends Component {

  back() {
    this.props.navigator.pop();
  }

  render() {
    const { url } = this.props;

    return (
      <View style={styles.container}>
        <Text style={{ margin: 24, marginTop: 40 }} onPress={this.back.bind(this)}>Back</Text>
        <WebView
          source={{ uri: url}}
          style={styles.webView}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webView: {

  }
});


ProductWebComponent.propTypes = {
  url: React.PropTypes.string.isRequired
};

export default ProductWebComponent;
