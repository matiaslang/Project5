import React, { Component } from 'react'
import { Button, StyleSheet, Text, View, Image } from 'react-native'

export default class HistoryScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Tähän tulee näkymä "History"</Text>
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
  }
})
