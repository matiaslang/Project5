import React, { Component, Fragment } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Navigator,
  Image,
  Dimensions,
  ScrollView
} from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const ScreenWidth = Dimensions.get('window').width
const ScreenHeight = Dimensions.get('window').height

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
            <Text style={styles.upperButton}>Places</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box}>
            <Text style={styles.boxText}>PlaceName</Text>
            <Image
              source={require('../assets/Ikonit/Markkerit/Marker_1-01.png')}
              style={styles.boxImage}
            />
          </TouchableOpacity>

          </View>
        

          <View style={styles.history}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('History')}
          >
            <Text style={styles.upperButton}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box}>
            <Text style={styles.boxText}>PlaceName</Text>
            <Image
              source={require('../assets/Ikonit/Markkerit/Marker_1-01.png')}
              style={styles.boxImage}
            />
          </TouchableOpacity>

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
  
  boxImage: {
    width: 40,
    height: 40,
    marginRight: 100,
    justifyContent: 'flex-end'
  },

  boxText: {
    color: '#043353',
    textAlign: 'left',
    textAlignVertical: 'center',
    height: 75,
    fontSize: 16,
    marginLeft: 10
  },

  box: {
    color: '#D4DDE6',
    height: 75,
    borderColor: '#F7F7F7',
    borderWidth: 2,
    width: '90%',
    flexDirection: 'row'
  },

  image: {
    width: 150,
    height: 150,
    top: '2.5%'
  },
/*
  lowerButton: {
    backgroundColor: '#043353',
    color: '#F7F7F7',
    fontSize: 25,
    alignSelf: 'stretch',
    paddingVertical: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    textAlign: 'center'
  },
*/
 

  upperButton: {
    backgroundColor: '#043353',
    color: '#F7F7F7',
    fontSize: 25,
    alignSelf: 'stretch',
    paddingVertical: '3%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    textAlign: 'center'
  },

  placesNearby: {
    backgroundColor: '#F7F7F7',
    borderColor: '#043353',
    borderRadius: 30,
    borderWidth: 3,
    width: '90%',
    aspectRatio: 1/1,
    fontSize: 25,
    overflow: 'hidden'
  },
  history: {
    backgroundColor: '#F7F7F7',
    borderColor: '#043353',
    borderRadius: 30,
    borderWidth: 3,
    width: '90%',
    aspectRatio: 1.3/1,
    fontSize: 25,
    overflow: 'hidden',
    top: '2%'
  }
})

export default HomeScreen
