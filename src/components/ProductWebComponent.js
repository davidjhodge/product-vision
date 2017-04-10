import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  WebView
} from 'react-native';

import NavigationBar from 'react-native-navbar';

class ProductWebComponent extends Component {

  back() {
    this.props.navigator.pop();
  }

  render() {
    const { url } = this.props;

    const leftButtonConfig = {
      title: 'Back',
      handler: () => this.back()
    };

    return (
      <View style={styles.container}>
        <NavigationBar
          style={styles.navBar}
          title={{ title: 'Product Webpage' }}
          leftButton={leftButtonConfig} />
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
  navBar: {
    width: '100%',
  },
  webView: {

  }
});


ProductWebComponent.propTypes = {
  url: React.PropTypes.string.isRequired
};

export default ProductWebComponent;
