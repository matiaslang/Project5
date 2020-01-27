import React from 'react'
import {
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Permissions from 'expo'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'
import Markers from '../Markers'

const initialRegion = {
  latitude: 65.011358,
  longitude: 25.464249,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0015
}

const marker = {
  longitude: 25.464249,
  latitude: 65.011358,
  title: 'Tässä on villa victor'
}
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 }

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      e => reject(e)
    )
  })
}

class mapScreen extends React.Component {
  static navigationOptions = {
    title: 'MAAAP'
  }

  setRegion(region) {
    if (this.state.ready) {
      setTimeout(() => this.map.mapview.animateToRegion(region), 10)
    }
    //this.setState({ region });
  }

  constructor(props) {
    super(props)
    this.state = {
      region: initialRegion
    }
  }

  handleCenter = () => {
    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    } = this.state.location
    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    })
  }

  componentDidMount() {
    return getCurrentLocation().then(position => {
      if (position) {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
          }
        })
        console.log(this.state)
      }
    })
  }

  onMapReady = e => {
    if (!this.state.ready) {
      this.setState({ ready: true })
    }
  }

  onRegionChange = region => {
    console.log('onRegionChange', region)
  }

  onRegionChangeComplete = region => {
    console.log('onRegionChangeComplete', region)
  }

  render() {
    const { navigation } = this.props
    const { region } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.Touchable}>
          <TouchableOpacity>
            <Text>Tekstiharjoittelua</Text>
          </TouchableOpacity>
        </View>
        <MapView
          ref={ref => {
            this.map = ref
          }}
          style={styles.mapStyle}
          region={this.state.region}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {Markers.map((marker, index) => (
            <Marker
              coordinate={marker.coordinates}
              title={marker.Title}
              description={marker.Description}
              key={index}
            />
          ))}
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  mapStyle: {
    flex: 3,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
    top: 20
  },
  map: {
    flex: 3,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
  },
  locationMenu: {
    width: Dimensions.get('window').width,
    height: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#bfcfff'
  },
  Touchable: {
    paddingTop: 50,
    backgroundColor: '#fff',
    opacity: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default mapScreen
