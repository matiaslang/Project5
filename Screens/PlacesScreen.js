import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

import { t } from '../Locales'

export default class PlacesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fi: this.props.navigation.state.params.fi
    }
  }
  static navigationOptions = ({ route, navigation }) => {
    return {}
  }

  render() {
    const { navigate } = this.props.navigation
    console.log(this.state.fi)
    return (
      <View style={styles.container}>
        <Text style={styles.upperBottom}></Text>

        <View style={styles.placesBox}>
          <View style={styles.bothButtons}>
            <TouchableOpacity onPress={() => navigate('Home')}>
              <Text style={styles.backButton}>{t('BACK', this.state.fi)}</Text>
            </TouchableOpacity>
            <Text style={styles.upperButton}>{t('PLACES', this.state.fi)}</Text>
          </View>

          <ScrollView style={styles.boxesInside}>
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

            <TouchableOpacity style={styles.box}>
              <Text style={styles.placeBoxText}>Amarillo</Text>
              <Text style={styles.boxDistance}>850m</Text>
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

            <TouchableOpacity style={styles.box}>
              <Text style={styles.placeBoxText}>Noodle Bar 9</Text>
              <Text style={styles.boxDistance}>1150m</Text>
              <Image
                source={require('../assets/Ikonit/Markkerit/Marker_1-01.png')}
                style={styles.boxImage}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.box}>
              <Text style={styles.placeBoxText}>Star Elokuvateatteri</Text>
              <Text style={styles.boxDistance}>1250m</Text>
              <Image
                source={require('../assets/Ikonit/Markkerit/Marker_1-01.png')}
                style={styles.boxImage}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.box}>
              <Text style={styles.placeBoxText}>Subway Linnanmaa</Text>
              <Text style={styles.boxDistance}>1700m</Text>
              <Image
                source={require('../assets/Ikonit/Markkerit/Marker_1-01.png')}
                style={styles.boxImage}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.box}>
              <Text style={styles.placeBoxText}>Yliopiston kirjasto</Text>
              <Text style={styles.boxDistance}>1700m</Text>
              <Image
                source={require('../assets/Ikonit/Markkerit/Marker_1-01.png')}
                style={styles.boxImage}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.box}>
              <Text style={styles.placeBoxText}>Prisma Linnanmaa</Text>
              <Text style={styles.boxDistance}>1900m</Text>
              <Image
                source={require('../assets/Ikonit/Markkerit/Marker_1-01.png')}
                style={styles.boxImage}
              />
            </TouchableOpacity>
          </ScrollView>
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

  bothButtons: {
    flexDirection: 'row',

    backgroundColor: '#043353',
    color: '#F7F7F7',

    paddingVertical: hp('0.5%'),
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },

  backButton: {
    flex: 1,
    fontSize: hp('2%'),
    color: '#F7F7F7',
    alignSelf: 'center',
    marginLeft: wp('2%'),
    textAlignVertical: 'center'
  },

  upperButton: {
    flex: 1,
    fontSize: hp('3.5%'),
    color: '#F7F7F7',
    marginLeft: wp('25%')
    //:DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
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
  box: {
    color: '#D4DDE6',
    height: hp('9%'),
    borderColor: '#D4DDE6',
    borderWidth: 2,
    flexDirection: 'row'
  },
  boxesInside: {
    flex: 1,
    flexDirection: 'column'
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

  upperBottom: {
    height: hp('6%')
  },

  bottomUpper: {
    height: hp('2%')
  }
})
