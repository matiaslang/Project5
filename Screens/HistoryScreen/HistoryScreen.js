import React, { Component } from 'react'
import { Button, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList
} from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import placehistory from './placehistory'

const ScreenWidth = Dimensions.get('window').width
const ScreenHeight = Dimensions.get('window').height

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
          //flex: 1
        }}
      >
        <TouchableOpacity>
          <Text style={{ fontSize: 20 }}>{props.place}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ fontSize: 20 }}>{props.date}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default class HistoryScreen extends Component {
  static navigationOptions = {
    title: 'Welcome'
  }
  constructor(props) {
    super(props)
    this.state = {
      enabled: true
    }
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <View style={styles.History}>
          <View style={styles.bluebar}>
            <TouchableOpacity
              style={styles.Backbutton}
              onPress={() => navigate('Home')}
            >
              <Text style={styles.Backbutton}>Back</Text>
            </TouchableOpacity>

            <View style={styles.HistoryText}>
              <Text style={styles.HistoryText}>History</Text>
            </View>
            <View style={styles.blank}>
              <Text></Text>
            </View>
          </View>
          <View style={styles.counteritem}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
            >
              <Text>Places visited: 5</Text>
              <Text>Times used: 16</Text>
            </View>
            <View style={styles.hairline} />
          </View>
          <FlatList
            style={{ flex: 1 }}
            data={placehistory}
            renderItem={({ item, index }) => (
              <ListItem place={item.place} date={item.date} />
            )}
            keyExtractor={item => item.key}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#000'
  },
  container: {
    flex: 1,
    //height: ScreenHeight,
    backgroundColor: '#fff',
    padding: 30,
    paddingTop: 40
  },
  History: {
    //padding: 30,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#043353',
    flex: 1,
    //height: ScreenHeight,
    bottom: 0,
    top: 0,
    overflow: 'hidden'

    //alignItems: 'center'
  },
  Backbutton: {
    alignSelf: 'flex-start',
    //flex: 1,
    fontSize: 14,
    color: '#fff'
    //position: 'absolute'
  },
  HistoryText: {
    alignSelf: 'center',
    //flex: 1,
    fontSize: 24,
    color: '#fff'
  },
  blank: {
    //flex: 1,
    fontSize: 24
  },
  bluebar: {
    flex: 0.13,
    backgroundColor: '#043353',
    padding: 10,
    paddingRight: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
    //position: 'absolute'
  },
  counteritem: {
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#000',
    flex: 0.15,

    justifyContent: 'space-around',
    flexDirection: 'column'
  },
  listItem: {
    borderWidth: 2,
    paddingVertical: 20,
    borderColor: '#D4DDE6',
    padding: 10
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 3,
    width: (ScreenWidth * 75) / 100,
    alignSelf: 'center'
  }
})
