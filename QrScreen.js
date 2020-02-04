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

// for Qrcamera
import { Camera } from 'expo-camera'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Permissions  from 'expo-permissions'

// for Textinput
import {Textinput} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

// for render control
import ReactDom from 'react-dom'

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
function Qrcamera( props ) {
  const scannedWindow = props.scannedWindow;
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
        styles.qrcamera}>
      <BarCodeScanner
           onBarCodeScanned = { scanned ? undefined : handleBarCodeScanned }
           style = { styles.qrcamera }
      ></BarCodeScanner>
    </View>
    //{ scanned && <Button title = {"Paina minua jos haluta skannata uudelleen "} onPress={ () => setScanned( false ) } /> }
  );
   
}

/* inputfield 
   Description: 

   variables: 
        value 
        onChangeText
   functions:
        return 
*/
function Inputfield( ){
  const [ value, onChangeText ] = useState( null );
  return (
     <TextInput style = {styles.inputfield}
       onChangeText={text => onChangeText( text ) }
       value = {value}>
        
      </TextInput>
  )
}

function Screenrender( props ){

  if( qrsscanned === false ){
    return <Qrcamera/>
  }
  if( qrsscanned === true ){
    return <Inputfield/>
  }
  return <Text> No bueno </Text>
}


class QrScreen extends React.Component{
  constructor( props ){
    super( props );
    this.state = {
      qrsscanned : false,
    };
    this.handleChange = this.handleChange.bind( this );
  }
  handleChange( e ){
    this.setState({
      qrsscanned : !e.target.qrsscanned
    })
  }
  render( ){
    const qrsscanned = this.state.qrsscanned;
    return (
      <View style={styles.container}>
        <Screenrender qrsscanned= {qrsscanned} onChange={this.handleChange}/>
        <Text> Qr componentti ja input ovat ylhäällä ja toivottavasti kuva ja kenttä </Text>
      
      </View>
    )
  }
  //<Screenrender qrsscanned= {this.state.qrsscanned}/>
  //<Screenrender qrsscanned= {qrsscanned} onChange={this.handleChange}/>
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  screenRender : {
    flex : 1,
  },
  qrcamera : {
    flex : 4,
    flexDirection : 'row', 
    marginTop : '10%',
    marginBottom : '10%',
    width : 200,
    height : 400,
  },

  inputfield : {
    backgroundColor : '#ff0000',
    flex : 2,
    flexDirection : 'row',
    alignItems : 'flex-start',
    justifyContent : 'flex-start',
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