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

        <View style={styles.placesBox}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Places')}
          >
            <Text style={styles.upperButton}>Places</Text>
          </TouchableOpacity>



          <View style={styles.boxesInside}>

          <TouchableOpacity style={styles.box}>
            <Text style={styles.placeBoxText}>Villa Victor</Text>
            <Text style={styles.boxDistance}>325m</Text>
            <Image
              source={require('../assets/Ikonit/Markkerit/Marker_1-01.png')}
              style={styles.boxImage}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.box}>
            <Text style={styles.placeBoxText}>Kaupunginteatteri</Text>
            <Text style={styles.boxDistance}>650m</Text>
            <Image
              source={require('../assets/Ikonit/Markkerit/Marker_1-01.png')}
              style={styles.boxImage}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.box}>
            <Text style={styles.placeBoxText}>Coffee House</Text>
            <Text style={styles.boxDistance}>875m</Text>
            <Image
              source={require('../assets/Ikonit/Markkerit/Marker_1-01.png')}
              style={styles.boxImage}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.box}>
            <Text style={styles.placeBoxText}>Kaupungin kirjasto</Text>
            <Text style={styles.boxDistance}>1000m</Text>
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



          
          <View style={styles.historyCounter}>
          <Text style={styles.historyBoxText}>Places visited: 5</Text>
          <Text style={styles.boxDate}>Times used: 16</Text>
          </View>

          
              
            
          
              
            

          <View style={styles.historyVisitedPlaces}>
          <TouchableOpacity style={styles.box}>
            <Text style={styles.historyBoxText}>Subway Tuira</Text>
            <Text style={styles.boxDate}>21.01.2020</Text>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('History')}
          >
            <Text style={styles.lowerButton}>Show more</Text>
          </TouchableOpacity>
          
          
          
          </View>
          </View>


       
          <Text style={styles.bottomUpper}></Text>
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
  
  historyCounter:{
    flex:1,
    flexDirection: 'row'
  },

  historyVisitedPlaces:{
    flex: 3
  },

  boxDate:{
    flex: 1,
    flexDirection: 'row',
    color: '#043353',
    fontSize: hp('2.5%'),
    textAlignVertical: "center"
  },

  boxesInside:{
    flex: 1,
    flexDirection: "column"
    
  },

  boxDistance:{
    flex: 1,
    color: '#043353',
    textAlignVertical: 'center',
    fontSize: hp('2.5%')
  },

  boxImage: {
    
    height: hp('5%'),
    flex: 1,
    alignSelf:'center',
    resizeMode: 'contain'
  },

  placeBoxText: {
    flex: 3,
    color: '#043353',
    alignSelf:'center',
    marginLeft: wp('2%'),
    
    fontSize: hp('2.5%')
  },

  historyBoxText: {
    flex: 1.5,
    color: '#043353',
    alignSelf:'center',
    marginLeft: wp('2%'),
    fontSize: hp('2.5%')
    
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
    textAlign: 'center'
    
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

  placesBox: {
    flex: 2,
    backgroundColor: '#F7F7F7',
    borderColor: '#043353',
    borderRadius: 30,
    borderWidth: 3,
    
    width: wp('90%'),
    
    
    overflow: 'hidden'
  },
  history: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderColor: '#043353',
    borderRadius: 30,
    borderWidth: 3,
   
    width: wp('90%'),
    
    
    overflow: 'hidden',
    top: '2%'
  },

  bottomUpper:{
    height: hp('4%')
  }
})

export default HomeScreen
