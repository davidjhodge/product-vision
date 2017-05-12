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
  TextInput,
  Button,
  ListView,
  PixelRatio
} from 'react-native';

var Parse = require('parse/react-native');
import NavigationBar from 'react-native-navbar';

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;

class SettingsComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([
        "Affiliate Disclosure",
        "Privacy",
        "Logout"
      ])
    };

    this.renderRow = this.renderRow.bind(this);
  }

  logout() {
    if (Parse.User.current().attributes.authData.facebook != null) {
      LoginManager.logOut();
    }
    Parse.User.logOut();
    this.props.navigator.pop();

    this.props.navigator.resetTo({
      name: 'Signup',
      type: 'None'
    })
  }

  cancel() {
    this.props.navigator.pop();
  }

  openWebpage(url, title) {
    this.props.navigator.push({
      name: 'WebView',
      passProps: {
        url: url,
        pageTitle: title
      },
      type: 'Normal'
    });
  }

  renderRow(rowData) {

    switch(rowData) {
      case "Affiliate Disclosure":
        return (
          <TouchableHighlight
            underlayColor="#c8c8c8"
            style={styles.firstCell}
            onPress={this.openWebpage.bind(this, "https://sites.google.com/view/productvision/affiliate-disclosure", rowData)}>
            <Text style={styles.rowText}>{rowData}</Text>
          </TouchableHighlight>
        );

      case "Privacy":
        return (
          <TouchableHighlight
            underlayColor="#c8c8c8"
            style={styles.cell}
            onPress={this.openWebpage.bind(this, "https://sites.google.com/view/productvision/privacy", rowData)}>
            <Text style={styles.rowText}>{rowData}</Text>
          </TouchableHighlight>
        );

      case "Logout":
        return (
          <TouchableHighlight
            underlayColor="#c8c8c8"
            style={styles.firstCell}
            onPress={this.logout.bind(this)}>
            <Text style={styles.rowText}>{rowData}</Text>
          </TouchableHighlight>
        );
    }
  }

  render() {
    const leftButtonConfig = {
      title: 'Cancel',
      tintColor: "white",
      handler: () => this.cancel()
    };

    return (
      <View style={styles.container}>
        <NavigationBar
          style={styles.navBar}
          title={{ title: 'Settings', tintColor: "white" }}
          statusBar={{ style: "light-content" }}
          tintColor="#8ec5fc"
          leftButton={leftButtonConfig} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          enableEmptySections={true}
          removeClippedSubviews={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(239,239,244)',
    alignItems: 'center'
  },
  navBar: {
    width: '100%'
  },
  cell: {
    height: 44,
    width: '100%',
    backgroundColor: 'white',
    marginTop: 0,
    borderBottomColor: '#c8c8c8',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderTopColor: '#c8c8c8',
    borderTopWidth: 1 / PixelRatio.get(),
  },
  firstCell: {
    height: 44,
    width: '100%',
    backgroundColor: 'white',
    marginTop: 32,
    borderBottomColor: '#c8c8c8',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderTopColor: '#c8c8c8',
    borderTopWidth: 1 / PixelRatio.get(),
  },
  rowText: {
    lineHeight: 43,
    marginLeft: 24
  }
});

export default SettingsComponent;
