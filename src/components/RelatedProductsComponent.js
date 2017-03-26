// Import this line in every React component
import React, { Component } from 'react';
// Import different modules from the react-native package
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  Button,
  ListView
} from 'react-native';

import { productLookup } from '../api/products.js';
import ProductComponent from './ProductComponent.js';

class RelatedProductsComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([])
    };

  }

  componentDidMount() {
    this.searchProducts(this.props.barcode);
  }

  back() {
    // Re-enable barcode Scanner
    this.props.callback();
    this.props.navigator.pop();
  }

  searchProducts(barcode) {
    // Search Amazon for this barcode
    productLookup(barcode, (error, result) => {
      if (!error) {
        // Success
        // State is used here temporarily. Ideally, props should be passed in
        // from a container component
        this.setState({
          dataSource: this.ds.cloneWithRows(result)
        });
      } else {
        console.log(error);
      }
    });
  }

  openProductWebpage(url) {
    this.props.navigator.push({
      name: 'WebView',
      passProps: {
        url: url
      },
      type: 'Normal'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 24 }} onPress={this.back.bind(this)}>Back</Text>
        <Text>Recent Searches</Text>
        <Text>{this.props.barcode}</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
            return (
              <ProductComponent
                {...rowData}
                onOutboundClick={this.openProductWebpage.bind(this)} />
            );
          }}
          enableEmptySections={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(244,244,244)',
    marginTop: 40, //TEMP
  }
});

RelatedProductsComponent.propTypes = {
  barcode: React.PropTypes.string.isRequired,
  callback: React.PropTypes.func
};

export default RelatedProductsComponent;
