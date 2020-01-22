import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'

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
class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'HoMe', //() => <LogoTitle />,
      headerRight: () => (
        <Button
          onPress={navigation.getParam('increaseCount')}
          title='+1'
          color='#fff'
        />
      )
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button title='Tämä ei tee mitään:) ' />
      </View>
    )
  }
}

class mapScreen extends React.Component {
  static navigationOptions = {
    title: 'Deeetails! :)'
  }
  render() {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>
          itemId: {JSON.stringify(navigation.getParam('itemId', 'NO-ID'))}
        </Text>
        <Text>
          otherParam:
          {JSON.stringify(navigation.getParam('otherParam', 'default value'))}
        </Text>
        <Button
          title='Go to Details... again'
          onPress={() =>
            navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100)
            })
          }
        />
      </View>
    )
  }
}

class QrScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>QR COODI TULEE TÄHÄN</Text>
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

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d12a2a',
    alignItems: 'center',
    justifyContent: 'center'
  },

  header: {}
})

export default createAppContainer(
  createBottomTabNavigator(
    {
      Map: { screen: mapScreen },
      Home: { screen: HomeScreen },
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
