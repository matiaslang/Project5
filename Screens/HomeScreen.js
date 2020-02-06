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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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



          <View style={styles.boxesInside}>

          <TouchableOpacity style={styles.box}>
            <Text style={styles.boxText}>PlaceName</Text>
            <Image
              source={require('../assets/Ikonit/Markkerit/Marker_1-01.png')}
              style={styles.boxImage}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.box}>
            <Text style={styles.boxText}>PlaceName</Text>
            <Image
              source={require('../assets/Ikonit/Markkerit/Marker_1-01.png')}
              style={styles.boxImage}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.box}>
            <Text style={styles.boxText}>PlaceName</Text>
            <Image
              source={require('../assets/Ikonit/Markkerit/Marker_1-01.png')}
              style={styles.boxImage}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.box}>
            <Text style={styles.boxText}>PlaceName</Text>
            <Image
              source={require('../assets/Ikonit/Markkerit/Marker_1-01.png')}
              style={styles.boxImage}
            />
          </TouchableOpacity>

          </View>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Places')}
          >
            <Text style={styles.lowerButton}>Show more</Text>
          </TouchableOpacity>


          </View>
        

          <View style={styles.history}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('History')}
          >
            <Text style={styles.upperButton}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box}>
            <Text style={styles.boxText}>kävit merikoskessa</Text>
            <Image
              source={require('../assets/Ikonit/Markkerit/Marker_1-01.png')}
              style={styles.boxImage}
            />
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('History')}
          >
            <Text style={styles.lowerButton}>Show more</Text>
          </TouchableOpacity>

          </View>


       
          <Text></Text>
          </View>
        
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    flex: 1
    
  },
  
  boxesInside:{
    flex: 1,
    flexDirection: "column"
    
  },



  boxImage: {
    width: wp('9%'),
    height: hp('6%')
  },

  boxText: {
    color: '#043353',
    
    textAlignVertical: 'center',
    
    fontSize: hp('2.5%'),
  },

  box: {
    flex: 1,
    color: '#D4DDE6',
    
    borderColor: '#D4DDE6',
    borderWidth: 2,
    flexDirection: 'row',
    
  },

  image: {
    width: wp('20%'),
    height: hp('13%'),
    top: hp('2%')
  },
  

  lowerButton: {
    backgroundColor: '#043353',
    color: '#F7F7F7',
    fontSize: hp('3%'),
    
    paddingVertical: hp('0.1%'),
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    textAlign: 'center',
    justifyContent: 'flex-end'
    
  },

 

  upperButton: {
    
    backgroundColor: '#043353',
    color: '#F7F7F7',
    fontSize: hp('3.5%'),
    
    paddingVertical: hp('0.5%'),
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    textAlign: 'center'
  },

  placesNearby: {
    flex: 2,
    backgroundColor: '#F7F7F7',
    borderColor: '#043353',
    borderRadius: 30,
    borderWidth: 3,
    /*
    width: '90%',
    aspectRatio: 1/1,
    */
    width: wp('90%'),
    
    
    overflow: 'hidden'
  },
  history: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderColor: '#043353',
    borderRadius: 30,
    borderWidth: 3,
    /*
    width: "90%",
    aspectRatio: 1.3/1,
    */
    width: wp('90%'),
    
    
    overflow: 'hidden',
    top: '2%'
  }
})

export default HomeScreen
