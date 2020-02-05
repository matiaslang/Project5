import React from 'react'
import { Button, StyleSheet, Text, Image, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'HoMe' //() => <LogoTitle />,
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View>
          <Button
            title='Places nearby'
            onPress={() => this.props.navigation.navigate('Places')}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{ width: 150, height: 150 }}
            source={require('../assets/Logo/Logo_2-01.png')}
          />
          <Image
            style={{ width: 200, height: 200 }}
            source={require('../assets/Logo/Logo_2-01.png')}
          />
        </View>
        <Image
          style={{ width: 250, height: 250 }}
          source={require('../assets/Logo/Logo_2-01.png')}
        />
        <View>
          <Button
            title='History'
            onPress={() => this.props.navigation.navigate('History')}
          />
        </View>
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
  demo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  header: {}
})

export default HomeScreen
