import React, { Component, Fragment, useState } from 'react'

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Navigator,
  Image,
  Dimensions,
  ScrollView,
  Button,
  AsyncStorage
} from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

import { t } from '../Locales'

const ScreenWidth = Dimensions.get('window').width
const ScreenHeight = Dimensions.get('window').height

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fi: true,
      flagUri: require('../assets/Ikonit/Kielivalinta/Lippu2-01.png')
    }
  }
  _getItem = async key => {
    try {
      await AsyncStorage.getItem(key, (err, value) => {
        if (err) {
          console.log(err)
        } else {
          value = JSON.parse(value)
          console.log('Palautusarvo on:')
          console.log(value)
          return value
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  _setItem = async (key, lang) => {
    try {
      await AsyncStorage.setItem('fi', JSON.stringify(lang))
      console.log('tallennettu arvo on')
      console.log(JSON.stringify(lang))
    } catch (error) {
      console.log('THERE HAS BEEN AN ERROR SAVING DATA')
    }
  }

  _languageChanged(event) {
    this.setState({ fi: !this.state.fi })
    this._setItem('FIN', this.state.fi)
    this.setState({
      flagUri:
        this.state.fi == true
          ? require('../assets/Ikonit/Kielivalinta/Lippu1-01.png')
          : require('../assets/Ikonit/Kielivalinta/Lippu2-01.png')
    })
    //this._getItem('FIN')
  }
  static navigationOptions = ({ navigation }) => {
    return {}
  }

  render() {
    const { fi } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => {
              this._languageChanged(this)
            }}
            //style={styles.flag}
          >
            <Image source={this.state.flagUri} style={styles.flagImage} />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../assets/Logo/Logo_2-01.png')}
          style={styles.image}
        />
        <View style={styles.placesBox}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Places', { fi: this.state.fi })
            }
          >
            <Text style={styles.upperButton}>{t('PLACES', this.state.fi)}</Text>
          </TouchableOpacity>

          <View style={styles.boxesInside}>
            <TouchableOpacity style={styles.box}>
              <Text style={styles.placeBoxText}>Crecian</Text>
              <Text style={styles.boxDistance}>100m</Text>
              <Image
                source={require('../assets/Ikonit/Markkerit/Marker_1-01.png')}
                style={styles.boxImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}>
              <Text style={styles.placeBoxText}>Villa Victor</Text>
              <Text style={styles.boxDistance}>325m</Text>
              <Image
                source={require('../assets/Ikonit/Markkerit/Marker_1-01.png')}
                style={styles.boxImage}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.box}>
              <Text style={styles.placeBoxText}>Viikinkiravintola Harald</Text>
              <Text style={styles.boxDistance}>525m</Text>
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
          </View>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Places', { fi: this.state.fi })
            }
          >
            <Text style={styles.lowerButton}>
              {t('SHOW_MORE', this.state.fi)}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.history}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('History', { fi: this.state.fi })
            }
          >
            <Text style={styles.upperButton}>
              {t('HISTORY', this.state.fi)}
            </Text>
          </TouchableOpacity>

          <View style={styles.historyCounter}>
            <Text style={styles.historyPlacesVisited}>
              {t('PLACES_VISITED', this.state.fi)}: 5
            </Text>
            <Text style={styles.boxTimesUsed}>
              {t('TIMES_USED', this.state.fi)}: 16
            </Text>
          </View>

          <View style={styles.historyVisitedPlaces}>
            <TouchableOpacity style={styles.box}>
              <Text style={styles.historyBoxText}>Subway Tuira</Text>
              <Text style={styles.boxDate}>21.01.2020</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('History', { fi: this.state.fi })
              }
            >
              <Text style={styles.lowerButton}>
                {t('SHOW_MORE', this.state.fi)}
              </Text>
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

  historyCounter: {
    flex: 1,
    flexDirection: 'row'
  },

  historyVisitedPlaces: {
    flex: 3
  },

  boxTimesUsed: {
    flex: 1,
    flexDirection: 'row',
    color: '#043353',
    fontSize: hp('2%'),
    alignSelf: 'center',
    textAlignVertical: 'center'
  },

  boxDate: {
    flex: 1,
    flexDirection: 'row',
    color: '#043353',
    fontSize: hp('2.5%'),
    alignSelf: 'center',
    textAlignVertical: 'center'
  },

  boxesInside: {
    flex: 1,
    flexDirection: 'column'
  },

  boxDistance: {
    flex: 1,
    color: '#043353',
    alignSelf: 'center',
    fontSize: hp('2%')
  },

  boxImage: {
    height: hp('5%'),
    flex: 1,
    alignSelf: 'center',
    resizeMode: 'contain'
  },

  placeBoxText: {
    flex: 3,
    color: '#043353',
    alignSelf: 'center',
    marginLeft: wp('2%'),

    fontSize: hp('2.5%')
  },

  historyBoxText: {
    flex: 1.5,
    color: '#043353',
    alignSelf: 'center',
    marginLeft: wp('2%'),
    fontSize: hp('2.5%')
  },

  historyPlacesVisited: {
    flex: 1.5,
    color: '#043353',
    alignSelf: 'center',
    fontSize: hp('2%'),
    marginLeft: wp('2%')
  },

  box: {
    flex: 1,
    color: '#D4DDE6',

    borderColor: '#D4DDE6',
    borderWidth: 2,
    flexDirection: 'row'
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

  bottomUpper: {
    height: hp('4%')
  },
  flag: {
    borderWidth: 5,
    borderColor: '#F00',
    //backgroundColor: '#213577',
    //color: '#9ACD32',
    width: 50,
    height: 50,
    left: 0
    //position: "absolute",
    //alignItems: 'flex-start'
  },
  topBar: {
    flex: 1,
    alignItems: 'center',
    //flexDirection: 'row',
    //justifyContent: 'space-between',
    borderColor: '#F00',
    backgroundColor: '#000',
    position: 'absolute',
    left: 20,
    top: 45
  },
  flagImage: {
    height: 50,
    width: 100,
    resizeMode: 'contain'

    //position: 'absolute',
    //left: 20,
    //top: 45
  }
})

export default HomeScreen
