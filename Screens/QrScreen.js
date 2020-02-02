'use string';

import React, {Component, useState,useEffect} from 'react'
import { Button, StyleSheet, Text, 
        View, LayoutAnimation, Dimensions, 
        StatusBar, TouchableOpacity, Alert, 
        Linking, 
        Vibration} from 'react-native'
import ReactDome from 'react-dom'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Modal } from 'react-native-router-flux'

import { Camera } from 'expo-camera'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Permissions  from 'expo-permissions'


/* funktio Qrcamera Qr koodi lukemiseen
  variables:
  constants
  hasPermission, setHasPermission 
  scanned, setScanner
  handleBarCodeScanned


  hooks:
  useEffect( )

  TODO 
  Input ikkunan 

*/
function Qrcamera() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Luin tyypin ${type} ja datan ${data}!`);
  };

  if (hasPermission === null) {
    return <Text> Anna kamera oikeudet</Text>;
  }
  if (hasPermission === false) {
    return <Text> Ei ilmeisesti toimi Suomessa </Text>;
  }

  return (
    <View
      style = {
        {
        flex : 4,
        flexDirection : 'column',
        justifyContent : 'flex-end',
      }}>
      <BarCodeScanner
           onBarCodeScanned = { scanned ? undefined : handleBarCodeScanned }
           style = { styles.qrcamera }
      ></BarCodeScanner>
      { scanned && <Button title = {"Paina minua jos haluta skannata uudelleen "} onPress={ () => setScanned( false ) } /> }
    </View>
  );
}


class QrScreen extends React.Component{
  constructor( props ){
    super( props );
    this.state = {
      tookprettypicture : null,

    }
  }
  render( ){
    return (
      <View style={styles.container}>
        <Qrcamera></Qrcamera>
        <Text> Qr componentti on ylhäällä ja toivottavasti kuvakin </Text>
      </View>
      ) 
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  qrcamera : {
    flex : 6,
    flexDirection : 'row', 
    marginTop : '50%',
    marginBottom : '50%',
    width : 200,
    height : 200,
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