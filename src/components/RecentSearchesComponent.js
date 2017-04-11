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
  Dimensions,
  Image,
  ScrollView,
  PixelRatio
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import SearchCellComponent from './SearchCellComponent.js';

var Parse = require('parse/react-native');
var dims = Dimensions.get('window');


class RecentSearchesComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searches: [],
    };
    console.log("this.state.searches");
  }

  componentDidMount() {
    this.loadRecentSearches();
  }

  loadRecentSearches() {
    var parsedata = [];
    var Search = Parse.Object.extend("Search");
    var query = new Parse.Query(Search);
    query.find().then((objs) => {
      objs.forEach((object) => {
        if(object.get("owner").id === Parse.User.current().id){
          // If relatedProducts exists, extract the title of the first product
          const relatedProducts = object.get("relatedProducts");
          const productTitle = (relatedProducts !== undefined && relatedProducts.length > 0) ?
            relatedProducts[0].title
            :
            "";

          parsedata.push({
            barcodeId: object.get("barcodeId"),
            barcodeImageUrl: object.get("barcodeImage")._url,
            relatedProductTitle: productTitle,
            id: object.id,
          });
        }
      });
      this.setState({
        searches: parsedata,
      });
    })
  }

  showDetailPage(barcodeId) {
    this.props.navigator.push({
      name: "RelatedProducts",
      type: "Normal",
      passProps: {
        barcode: barcodeId,
        isNew: false,
      }
    });
  }

  done() {
    this.props.navigator.pop();
  }

  render() {
    const leftButtonConfig = {
      title: 'Done',
      tintColor: "white",
      handler: () => this.done()
    };
    const list = this.state.searches.map(
        (search, index) => <SearchCellComponent
          key = {index}
          barcodeImageUrl = {search.barcodeImageUrl}
          barcodeId = {search.barcodeId}
          relatedProductTitle = {search.relatedProductTitle}
          showDetailPage = {this.showDetailPage.bind(this)}
        />
      );

    return (
      <View style={styles.container}>
        <NavigationBar
          style={styles.navBar}
          title={{ title: 'Recent Searches', tintColor: "white" }}
          statusBar={{ style: "light-content" }}
          tintColor="#8ec5fc"
          leftButton={leftButtonConfig} />
        <ScrollView style={styles.container}>
          {list}
        </ScrollView>
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
  }
});

export default RecentSearchesComponent;
