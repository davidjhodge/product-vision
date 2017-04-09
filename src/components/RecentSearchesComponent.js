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
  ScrollView
} from 'react-native';

import NavigationBar from 'react-native-navbar';

var Parse = require('parse/react-native');
var dims = Dimensions.get('window');

Parse.initialize("pqjygx3eAiWlqKGyvD58yDNOhmnb2URbAtjIAajj", "Hk5fRaxZKZYGI58bSWJnTVkEsET0ppWveAEMljIk");
Parse.serverURL = "https://parseapi.back4app.com/";
//SearchCell.defaultProps = {}
class SearchCell extends Component {
  props: {
    barcodeImage: File;
    barcodeId: String;
    barcodeType: String;
  };

  render() {
    return(
      <View style = {{width: '100%', borderColor: 'red', borderWidth: 1, flexDirection: 'row', alignItems:'center'}}>
        <Image source = {{uri: this.props.barcodeImage._url}} style = {{height: 80, width:60, margin: 16, marginLeft:34, borderColor: 'black', borderWidth: 1}}></Image>
        <View style = {{flexDirection:'column'}}>
          <Text style = {{fontSize: 16, color: '#39393a', marginLeft: 28}}>Barcode Type: {this.props.barcodeType}</Text>
          <Text style = {{fontSize: 12, color: '#898989', marginLeft: 28, marginTop: 10}}>{this.props.barcodeId}</Text>
        </View>
        <Image source = {require('../../resources/chevron_right.png')} style = {{position: 'absolute', width: 8, height: 13, right:20}}/>
      </View>
    )
  }
}

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
      for(var i = 0; i < objs.length; i++){
        parsedata.push({
          barcodeId: objs[i].get("barcodeId"),
          barcodeImage: objs[i].get("barcodeImage"),
          barcodeType: objs[i].get("barcodeType"),
          //eventually get user info
          id: objs[i].id,
        })
      }
      this.setState({
        searches: parsedata,
      });
    })
  }

  done() {
    this.props.navigator.pop();
  }

  render() {
    const rightButtonConfig = {
      title: 'Done',
      handler: () => this.done()
    };
    const list = this.state.searches.map(
        (search, index) => <SearchCell
          key = {index}
          barcodeImage = {search.barcodeImage}
          barcodeType = {search.barcodeType}
          barcodeId = {search.barcodeId}
        />
      );
    //console.log(this.state.searches[0].barcodeId);

    return (
      <ScrollView style={styles.container}>
        <NavigationBar
          style={styles.navBar}
          title={{ title: 'Recent Searches' }}
          rightButton={rightButtonConfig} />
        {list}
      </ScrollView>
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
