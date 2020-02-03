import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Navigator
} from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

class HomeScreen extends React.Component {
  //actionbar pitäs saada hävitettyä

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placesNearby}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Places')}
          >
            <Text style={styles.button}>Places nearby</Text>
          </TouchableOpacity>
          <Text style={styles.line}>________________________</Text>
          <View />
        </View>

        <View style={styles.history}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('History')}
          >
            <Text style={styles.button}>History</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    top: 0
  },

  line: {
    color: '#101087',
    textAlign: 'center',
    paddingVertical: 375,
    fontSize: 20
  },

  button: {
    backgroundColor: '#101087',
    color: '#ffffff',
    fontSize: 25,
    alignSelf: 'stretch',
    paddingVertical: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    textAlign: 'center'
  },

  placesNearby: {
    backgroundColor: '#ffffff',
    borderColor: '#101087',
    borderRadius: 30,
    borderWidth: 3,
    height: 500,
    width: 350
  },
  history: {
    backgroundColor: '#ffffff',
    borderColor: '#101087',
    borderRadius: 30,
    borderWidth: 3,
    height: 250,
    width: 350,
    fontSize: 25,
    marginVertical: 8
  }
})

export default HomeScreen
