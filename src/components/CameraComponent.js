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
      barcodeDetected: false,
      barcodeId: "",
      barcodeType: "",
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
      var barcodeType = event.type;

      this.setState({
        barcodeId: barcodeId,
        barcodeType: barcodeType,
      });

      console.log("Barcode: " + JSON.stringify(barcodeId));
      // var bounds = event.bounds;

      this.takePicture();
      }
  }

  takePicture() {
    this.camera.capture({metadata: {}})
    .then((data) => {
      const imageData = data.data;
      this.executeBarcodeSearch(this.state.barcodeId, imageData);
    })
    .catch(err => console.error(err));
  }

  // TEMP
  dummySearch() {
    this.onBarcodeDetection({ data: "0022000159342" });
  }

  executeBarcodeSearch(barcodeId, imageData) {
    this.props.navigator.push({
      name: "RelatedProducts",
      type: "Normal",
      passProps: {
        barcode: barcodeId,
        barcodeType: this.state.barcodeType,
        imageData: imageData,
        callback: this.enableBarcodeDetection.bind(this),
        isNew: true,
      }
    });

    // Reset state
    this.setState({
      barcodeId: "",
      barcodeType: "",
    });
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
          captureTarget={Camera.constants.CaptureTarget.memory}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <View style={styles.navButtonsContainer}>
            <TouchableHighlight
              underlayColor="transparent"
              style={styles.recentSearchesButton}
              onPress={this.showRecentSearches.bind(this)}>
              <Text style={styles.leftButtonText}>Recent</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="transparent"
              style={styles.settingsButton}
              onPress={this.showSettings.bind(this)}>
              <Text style={styles.rightButtonText}>Settings</Text>
            </TouchableHighlight>
          </View>
          <TouchableHighlight
            underlayColor="transparent"
            style={styles.capture}
            onPress={this.dummySearch.bind(this) }>
            <Image
              style={{ height: 72, width: 72 }}
              source={require('../../resources/whiteCircle.png')} />
          </TouchableHighlight>
        </Camera>
      </View>
    );
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
  },
  recentSearchesButton: {
    width: 80,
    height: 30,
    flex: 0,
  },
  settingsButton: {
    width: 80,
    height: 30,
    flex: 0
  },
  leftButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left'
  },
  rightButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'right'
  }
});

// Specify the types of props this component will recieve (for type checking)
CameraComponent.propTypes = {

};

export default CameraComponent;
