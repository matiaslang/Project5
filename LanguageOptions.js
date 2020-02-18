import React, { Component } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class LanguageOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      language: 'fi'
    }
  }

  render() {
    return (
      <View>
        {this.props.children}
        <TouchableOpacity style={styles.flag}></TouchableOpacity>
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
  flag: {
    flex: 1,
    position: 'absolute',
    top: 100,
    left: 100,
    borderWidth: 4,
    borderColor: '#000',
    backgroundColor: '#F00',
    color: '#F00'
  }
})
