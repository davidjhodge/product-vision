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

import NavigationBar from 'react-native-navbar';

import { productLookup } from '../api/products.js';
import ProductComponent from './ProductComponent.js';

var Parse = require('parse/react-native');

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
        // Upload this to the user's search history
        this.uploadSearch();
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

  // Uploading Search
  uploadSearch() {
    const file = { __ContentType: "image/jpeg", base64: this.props.imageData };
    var parseImageFile = new Parse.File("image.jpg", file);

    //put this inside if {
    parseImageFile.save().then(function() {
      // The file has been saved to Parse.
    }, function(error) {
      // The file either could not be read, or could not be saved to Parse.
      console.log(error);
    });

    // Be sure of ur parameters name
    // prod is extend of my class in parse from this: var prod = new products();

    var Search = Parse.Object.extend("Search");
    var search = new Search();

    // User who placed the order

    search.set("owner", Parse.User.current());
    // search.set("createdBy", "j9SLaztlLH");
    search.set("createdAt", Date.now());
    search.set("barcodeId", this.props.barcode);
    search.set("barcodeImage", parseImageFile);
    search.set("barcodeType", this.props.barcodeType);

    const relatedProducts = this.state.dataSource._dataBlob.s1;
    search.set("relatedProducts", relatedProducts);

    search.save();
  }

  render() {
    const leftButtonConfig = {
      title: 'Back',
      handler: () => this.back()
    };

    return (
      <View style={styles.container}>
        <NavigationBar
          title={{ title: 'Related Products' }}
          leftButton={leftButtonConfig} />
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
  }
});

RelatedProductsComponent.propTypes = {
  barcode: React.PropTypes.string.isRequired,
  barcodeType: React.PropTypes.string.isRequired,
  imageData: React.PropTypes.string.isRequired,
  callback: React.PropTypes.func
};

export default RelatedProductsComponent;
