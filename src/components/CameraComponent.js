// Import this line in every React component
import React, { Component } from 'react';
// Import different modules from the react-native package
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';
// This is the third party module being used for the camera.
// It was installed via npm.
// View the package on github here:https://github.com/lwansbrough/react-native-camera
import Camera from 'react-native-camera';


class CameraComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barcodeDetected: false
    };

    this.onBarcodeDetection = this.onBarcodeDetection.bind(this);
  }

  onBarcodeDetection(event) {
    if (!this.state.barcodeDetected) {
      // Ensure barcode logic is only executed once
      this.setState({
        barcodeDetected: true
      });

      var barcodeId = event.data;
      console.log("Barcode: " + JSON.stringify(barcodeId));
      // var bounds = event.bounds;

      this.executeBarcodeSearch(barcodeId);
    }
  }

  executeBarcodeSearch(barcodeId) {
    this.props.navigator.push({
      name: "RelatedProducts",
      type: "Normal",
      passProps: {
        barcode: barcodeId,
        callback: this.enableBarcodeDetection.bind(this)
      }
    });
    // Reset detection state
  }

  enableBarcodeDetection() {
    this.setState({
      barcodeDetected: false
    });
  }

  showRecentSearches() {
    this.props.navigator.push({
      name: 'RecentSearches',
      type: 'Modal'
    });
  }

  showSettings() {
    this.props.navigator.push({
      name: 'Settings',
      type: 'Modal'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          onBarCodeRead={this.onBarcodeDetection}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <View style={styles.navButtonsContainer}>
            <TouchableHighlight
              underlayColor="transparent"
              style={styles.recentSearchesButton}
              onPress={this.showRecentSearches.bind(this)}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Recent</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="transparent"
              style={styles.settingsButton}
              onPress={this.showSettings.bind(this)}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Settings</Text>
            </TouchableHighlight>
          </View>
          <TouchableHighlight
            underlayColor="transparent"
            style={styles.capture}
            onPress={this.takePicture.bind(this) }>
            <Image
              style={{ height: 72, width: 72 }}
              source={require('../../resources/whiteCircle.png')} />
          </TouchableHighlight>
        </Camera>
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  preview: {
    flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center'
  },
  capture: {
    flex: 0,
    padding: 10,
    margin: 40,
    width: 72,
    height: 72,
    alignSelf: 'center',
    alignItems: 'center'
  },
  navButtonsContainer: {
    height: 32,
    flex: 1,
    flexDirection: 'column',
    marginTop: 32,
    marginLeft: 12,
    marginRight: 12
  },
  recentSearchesButton: {
    alignSelf: 'flex-start',
    width: 80,
    height: 30,
    flex: 0,
  },
  settingsButton: {
    alignSelf: 'flex-end',
    width: 80,
    height: 30,
    flex: 0
  }
});

// Specify the types of props this component will recieve (for type checking)
CameraComponent.propTypes = {

};

export default CameraComponent;
