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

class SearchCellComponent extends Component {
  render() {
    const barcodeId = this.props.barcodeId;
    return(
      <TouchableHighlight
        underlayColor={"#c8c8c8"}
        onPress={() => this.props.showDetailPage(barcodeId)}>
        <View style={styles.cellContainer}>
          <Image source = {{uri: this.props.barcodeImageUrl}} style={styles.barcodeImage}></Image>
          <View style = {styles.textContainer}>
            <Text
              numberOfLines={2}
              style={styles.productTitle}>{this.props.relatedProductTitle}</Text>
            <Text
              numberOfLines={1}
              style={styles.barcodeId}>Barcode: {this.props.barcodeId}</Text>
          </View>
          <Image source = {require('../../resources/chevron_right.png')} style={styles.chevron}/>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  cellContainer: {
    width: '100%',
    borderBottomColor: '#c8c8c8',
    borderBottomWidth: 1 / PixelRatio.get(),
    flexDirection: 'row',
    alignItems:'center',
  },
  barcodeImage: {
    height: 80,
    width:60,
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 24,
    marginRight: 16
  },
  textContainer: {
    flexDirection:'column',
    marginRight: 150 // This looks good on iPhone 6. But indicates that something is wrong.
  },
  productTitle: {
    fontSize: 16,
    color: '#39393a',
    marginLeft: 12
  },
  barcodeId: {
    fontSize: 12,
    color: '#898989',
    marginLeft: 12,
    marginTop: 10
  },
  chevron: {
    position: 'absolute',
    width: 8,
    height: 13,
    right: 20
  }
});

SearchCellComponent.propTypes = {
  barcodeImageUrl: React.PropTypes.string.isRequired,
  barcodeId: React.PropTypes.string.isRequired,
  relatedProductTitle: React.PropTypes.string,
};

export default SearchCellComponent;
