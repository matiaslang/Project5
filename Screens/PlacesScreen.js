import React, { Component } from 'react'
import { Button, StyleSheet, Text, View, Image } from 'react-native'

export default class PlacesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Tähän tulee näkymä "places nearby"</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d12a2a',
    alignItems: 'center',
    justifyContent: 'center'
  },
  placesNearby: {
    flex: 1,
    backgroundColor: '#bfcfff',
    borderColor: '#043353',
    borderRadius: 10,
    paddingVertical: 50,
    paddingHorizontal: 20
  },

  header: {}
})
