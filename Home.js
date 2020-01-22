import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const Home = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title='Go to Details'
        onPress={() => {
          this.props.navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here'
          })
        }}
      />
    </View>
  )
}
