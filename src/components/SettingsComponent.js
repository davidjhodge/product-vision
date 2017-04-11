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

class SettingsComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([
        "Logout"
      ])
    };
  }

  logout() {
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

  render() {
    const leftButtonConfig = {
      title: 'Cancel',
      handler: () => this.cancel()
    };

    return (
      <View style={styles.container}>
        <NavigationBar
          style={styles.navBar}
          title={{ title: 'Settings' }}
          leftButton={leftButtonConfig} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
            return (
              <TouchableHighlight
                underlayColor="transparent"
                style={styles.logout}
                onPress={this.logout.bind(this)}>
                <Text style={styles.rowText}>{rowData}</Text>
              </TouchableHighlight>
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
    backgroundColor: 'rgb(239,239,244)',
    alignItems: 'center'
  },
  navBar: {
    width: '100%'
  },
  logout: {
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
