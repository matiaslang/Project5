import React from 'react'
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native'
import MapView from 'react-native-maps'
import Permissions from 'expo'

const longitude = 65.01
const latitude = 65.011358
const latitudeDelta = 0.02
const longitudeDelta = 0.02

const marker = {
  longitude: 65.01,
  latitude: 25.466,
  title: 'Tässä on villa victor'
}
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 }

const FitMarkers = () => {
  this.map.fitToCoordinates(marker, {
    edgePadding: DEFAULT_PADDING,
    animated: true
  })
}


class mapScreen extends React.Component {
  static navigationOptions = {
    title: 'Deeetails! :)'
  }

  setMarkers() {
    const { location } = this.state

    return (
      <MapView.Marker
        key={1}
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }}
        title='Me'
        description='Current Position'
      />
    )
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => {
            this.map = ref
          }}
          style={styles.mapStyle}
          region={{
            //latitude: navigation.location.coords.latitude,
            //longitude: navigation.location.coords.longitude,
            latitude: 65.011358,
            longitude: 25.464249,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
        />
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
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
})

export default mapScreen
