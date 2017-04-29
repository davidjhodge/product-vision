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
  Image,
  Platform,
} from 'react-native';
// This is the third party module being used for the camera.
// It was installed via npm.
// View the package on github here:https://github.com/lwansbrough/react-native-camera
import Camera from 'react-native-camera';

// Push Notifications
// var PushNotification = require('react-native-push-notification');
import PushNotification from 'react-native-push-notification';
// PushNotification.localNotificationSchedule({
//   message: "My Notification Message", // (required)
//   date: new Date(Date.now() + (5 * 1000)) // in 60 secs
// });

import { registerPushInstallation } from '../api/push.js';


class CameraComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barcodeDetected: false,
      barcodeId: "",
      barcodeType: "",
    };

    this.onBarcodeDetection = this.onBarcodeDetection.bind(this);

    this.registerPushNotifications();
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

      this.takePicture();
      }
  }

  // Push Notifications
  registerPushNotifications() {
    PushNotification.configure({

      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        const deviceToken = token.token;
        // Assign device type based on OS
        var deviceType = "";
        if (Platform.OS === 'ios') {
          deviceType = 'ios';
        } else if (Platform.OS === 'android') {
          deviceType = 'android';
        }

        registerPushInstallation(deviceToken, deviceType);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('Received Notification:', notification);
        console.log('Message:', notification.message);
      },

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "655020961532",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
      requestPermissions: true,
    });
  }

  takePicture() {
    this.camera.capture({metadata: {}})
    .then((data) => {
      const imageData = data.data;
      this.executeBarcodeSearch(this.state.barcodeId, imageData);
    })
    .catch(err => console.error(err));
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
          <Text style={styles.capture}>Point the camera at a barcode!</Text>
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
    width: '100%',
    height: 30,
    marginBottom: 30,
    alignSelf: 'center',
    alignItems: 'center',
    color: 'white',
    // fontWeight: 'bold',
    textAlign: 'center'
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
