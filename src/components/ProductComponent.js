import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  PixelRatio,
} from 'react-native';

class ProductComponent extends Component {
  onOutboundClick(outboundUrl) {
    this.props.onOutboundClick(outboundUrl);
    console.log("OPEN URL: " + outboundUrl);
  }

  render() {
    const { id, title, price, imageUrl, outboundUrl } = this.props;

    return (
      <TouchableHighlight onPress={() => this.onOutboundClick(outboundUrl)}>
        <View style={styles.container}>
          <Image style={styles.image} source={{uri: imageUrl}}/>
          <View style={styles.metaContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{price}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 112,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: '#c8c8c8',
    borderBottomWidth: 1 / PixelRatio.get()
  },
  image: {
    height: 80,
    width: 80,
    marginLeft: 24
  },
  metaContainer: {
    flex: 1,
    marginLeft: 24,
    marginRight: 24
  },
  title: {
    color: '#4A4A4A',
    fontSize: 16
  },
  price: {
    color: '#D0011B',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12
  }
});

ProductComponent.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  price: React.PropTypes.string,
  imageUrl: React.PropTypes.string.isRequired,
  outboundUrl: React.PropTypes.string.isRequired,
  onOutboundClick: React.PropTypes.func.isRequired
};

export default ProductComponent;
