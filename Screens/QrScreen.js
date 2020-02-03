import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'


class QrScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>QR COODI TULEE täähä</Text>
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

export default QrScreen
