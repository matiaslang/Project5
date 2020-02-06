import React, { Component, Fragment } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Navigator,
  Image
} from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/Logo/Logo_2-01.png')}
          style={styles.image}
        />

        <View style={styles.placesNearby}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Places')}
          >
            <Text style={styles.button}>Places nearby</Text>
          </TouchableOpacity>
          <Text style={styles.linePlaces}>________________________</Text>
          <View />
        </View>

        <View style={styles.history}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('History')}
          >
            <Text style={styles.button}>History</Text>
          </TouchableOpacity>
          <Text style={styles.lineHistory}>________________________</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },

  image: {
    width: 150,
    height: 150,
    top: 20
  },

  linePlaces: {
    color: '#043353',
    textAlign: 'center',
    paddingVertical: 275,
    fontSize: 20
  },

  lineHistory: {
    color: '#043353',
    textAlign: 'center',
    paddingVertical: 135,
    fontSize: 20
  },

  button: {
    backgroundColor: '#043353',
    color: '#F7F7F7',
    fontSize: 25,
    alignSelf: 'stretch',
    paddingVertical: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    textAlign: 'center'
  },

  placesNearby: {
    backgroundColor: '#F7F7F7',
    borderColor: '#043353',
    borderRadius: 30,
    borderWidth: 3,
    height: 400,
    width: 350,
    overflow: 'hidden'
  },
  history: {
    backgroundColor: '#F7F7F7',
    borderColor: '#043353',
    borderRadius: 30,
    borderWidth: 3,
    height: 260,
    width: 350,
    fontSize: 25,
    marginVertical: 15,
    overflow: 'hidden'
  }
})

export default HomeScreen
