import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Modal } from 'react-native-router-flux'
import mapScreen from './MapScreen'
import QrScreen from './QrScreen'
import HomeScreen from './Home'

/* 
class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./spiro.png')}
        style={{ width: 30, height: 30 }}
      />
    )
  }
}
 */
///dfffsdfsddf

class PlacesScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Tähän tulee näkymä "places nearby"</Text>
      </View>
    )
  }
}

class HistoryScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Tähän tulee näkymä "History"</Text>
      </View>
    )
  }
}

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state
  let IconComponent = Ionicons
  let iconName
  if (routeName === 'Home') {
    iconName = `ios-information-circle${focused ? '' : '-outline'}`
  } else if (routeName === 'Map') {
    iconName = `ios-map`
  } else if (routeName === 'QRcode') {
    iconName = `ios-camera`
  }

  return <IconComponent name={iconName} size={25} color={tintColor} />
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

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Places: { screen: PlacesScreen },
    History: { screen: HistoryScreen }
  },
  {
    mode: 'modal'
  }
)

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01
  }
}

export default createAppContainer(
  createBottomTabNavigator(
    {
      Map: { screen: mapScreen },
      Home: { screen: HomeStack },
      QRcode: { screen: QrScreen }
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor)
      }),
      tabBarOptions: {
        activeTintColor: '#043353',
        inactiveTintColor: '#cad4db'
      }
    }
  )
)
