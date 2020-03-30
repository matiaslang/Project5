'use string'

import React, { Component, useState, useEffect } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Alert,
  Linking,
  Vibration,
  AsyncStorage,
  useWindowDimensions,
  Keyboard
} from 'react-native'


import ReactDome from 'react-dom'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Modal } from 'react-native-router-flux'

// for Qrcamera
import { Camera } from 'expo-camera'
//import QRCodeScanner from 'react-native-qrcode-scanner'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'

// for Textinput
import { Textinput, ScrollView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'


// for render control
import ReactDom from 'react-dom'

//For translations
import { t } from '../Locales'
import { AuthSession } from 'expo'

// for asyncstorage
const STORAGE_KEY = '@words'

/* funktio Qrcamera Qr koodi lukemiseen
  Decsription:
      for reading qr code
      TODO decide qr code format.
  variables:
      hasPermission : tracks phone permission for app 
      setHasPermission : hook for hasPermission
      
      scanned :  tracks if qr value has been read.
      setScanner : hook for scanned
      
      handleChange : callback function from QrScreen and passed by Componentrender, updates Qrscreen qrsscanned state


  hooks:
      useEffect : waits for permission from. Uses BarCodeScanner library
      handleBarCodeScanned : changes state scanned and handleChange.
      handleChange : 

*/
function Qrcamera(props) {
  const handleChange = props.handleChange
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const window = Dimensions.get( 'window' )
  

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    handleChange(true)
    console.log(`Luin tyypin ${type} ja datan ${data}!`);
  }

  if (hasPermission === null) {
    return <Text> Camera requires a permission for camera. </Text>
  }
  if (hasPermission === false) {
    return <Text> Permission not granted. </Text>
  }

  return (
    <View style={ styles.qrcontainer}>
      <View style={ styles.viewpaddingcamera}></View>
      <Text> Scan a code </Text>
      <Camera
        style= {{ flex : 8,  width : window.width/1.2, height: window.height/3 }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
        }}
      ></Camera>
      <View style={ styles.viewpaddingcamera}></View>
    </View>
  )
  /*
<QRCodeScanner onRead={this.onSuccess} flashMode={QRCodeScanner.Constants.flashMode.torch}
                   bottomContent= {
                     <TouchableOpacity style={styles.buttonTouchable}>
                       <Text style={styles.buttonText}> OK! </Text>
                     </TouchableOpacity>
                   }>
    </QRCodeScanner>

    <BarCodeScanner
           onBarCodeScanned = { scanned ? undefined : handleBarCodeScanned }
           style = {StyleSheet.absoluteFill} 
      ></BarCodeScanner>
  */
}

/* inputfield 
   Description: 
      renders text input field. 
   variables: 
        value : input value
        onChangeText : handler not defined explicitly
    
*/
function Inputfield(props) {
  const [value, onChangeText] = useState(null)
  const storeInput = props.storeInput
  const qrscanned = props.qrscanned;
  const text = props.text
  
  return (
    <View >
      <View style={styles.viewpaddingtext}/>
      <ScrollView style={styles.ScrollView}></ScrollView>
      <Text style= { {alignSelf:'center' } }> What did you say?</Text>
      <View style={ styles.bordercontainer }>
          <TextInput
                style= {styles.inputfield}
                multiline= {true}
                returnKeyType = "done"
                //onKeyPress = {( key ) => { Keyboard.dismiss( ) } }
                onChangeText= {( text => onChangeText( text ), value => storeInput( value ) )}
              />
      </View>
      <ScrollView style={styles.ScrollView}></ScrollView>
      <View style={ styles.viewpaddingtext }></View>
    </View>
  )
}

/* Componentrender
  Description:
        Responsible choosing component that is rendered.
  variables:
        qrsscanned : QrScreen state that tracks status of qrscanner. Used to pick right component to be rended.
        handleChange : handler function for tracking status, defined in and passed from QrScreen, further passed to Qrcamera function 
*/

function Componentrender(props) {
  const qrscanned = props.qrscanned
  const handleChange = props.handleChange
  const storeInput = props.storeInput
  const screenText = props.text;

  if (qrscanned === false) {
    return [
      <Qrcamera key={'qrscam'} handleChange={handleChange} />
    ]
  }
  if (qrscanned === true) {
    return [
      <Inputfield key={'infield'} storeInput={storeInput} qrscanned={ qrscanned } text={screenText} />
    ]
  }
  return <Text> No bueno qrscanned is null </Text>
}
/*
  QrScreen
   Description:
      Parent component for this view. 
      Children Components:
      function Componentrender
               Button
   Variables:
       qrsscanned : tracks status of qrcamera
       message : undefined. Tracks content of Inputfield

    handleChange : callback function for Componentrender handlesChange changes value of qrsscanned
    storeInput : callback function for saving text from Inputfieeld  to message variable. 
    onPress : callback function for button "Return home page".   
       
*/

class QrScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      qrscanned: false,
      message: undefined,
      firstMessage : 0,
    }
    this.submitButton = this.button;
    this.handleChange = this.handleChange.bind(this)
    this.storeInput = this.storeInput.bind(this)
    this.onPress = this.onPress.bind(this)
    this.submitMessage = this.submitMessage.bind( this )

    this.getkeys = this.getkeys.bind( this );
  }

  handleChange(is_scanned) {
    this.setState({ qrscanned: is_scanned })
  }

  storeInput(text) {
    this.message = text;
  }

  async getkeys( ){
    try{
      const keys = await AsyncStorage.getAllKeys( );
      console.log( "keys are " + keys)
      const result = await AsyncStorage.multiGet( keys );
      console.log( "results are " + result);
    }
    catch( error ){
      console.error( error )
    }
  }

  async submitMessage( item ){
    await AsyncStorage.clear( );
    let nItem = JSON.stringify( item );
    console.log( "message is " + nItem );
    let token;
    try{
      if( this.firstMessage === 0 ){
        await AsyncStorage.clear( );
        await AsyncStorage.setItem( "phrases", nItem );
        console.log( " first message " + this.firstMessage);
        this.numOfMessage = 1;
        this.firstMessage = 1;
        console.log( "if message " + this.firstMessage );
      }
      else{
        const keyValuePair = await AsyncStorage.getItem( "phrases" );
        if( keyValuePair === null){
             await AsyncStorage.setItem( "phrases", nItem );
             console.log( "if message " + this.firstMessage );
        }
        else{
          const keys = await AsyncStorage.getAllKeys( );
          const result = await AsyncStorage.multiGet( keys );
          console.log( "keys are " + keys );
          result.map( req => JSON.parse( req ) ).forEach( console.log( ) );
          
          
          console.log( "keyValuePair is " + keyValuePair );
          value = JSON.parse( keyValuePair );
          await AsyncStorage.removeItem( keyValuePair );
          value.number_of++;
          newValue = JSON.stringify( value );
          await AsyncStorage.setItem( newValue );
        }
      }
    }
    catch( error ){
      console.log( "fuck up in submitmessage asyncget " + error.message)
    }
  
  }
  onPress() {
    let item = {
      words : this.message,
      number_of : 1,
    }
    this.setState( { message : ''})
    this.setState( { qrscanned : false})
    const { navigate } = this.props.navigation
    this.submitMessage( item );
    navigate('Home')
  }

  render() {
    const qrscanned = this.state.qrscanned
    try{
      return (
      <View style={styles.container}>
        <Componentrender
          qrscanned={qrscanned}
          handleChange={this.handleChange}
          storeInput={this.storeInput}
          text={this.message}
        ></Componentrender>
        <Button style={styles.button} ref={this.submitButton} title='Return to home page' onPress={this.onPress}></Button>
      </View>
    )
    }
    catch( error ){
      console.log( error.message )
    }
  }
  /* define button's handleclick here. We might want to use same button with different logo.
  <Button title="takaisin onClick={this.handleClick}*/
}

/* const styles
   TODO check for inconsistencies, inputfile  and qrcamera are a mess right now.
   Description: 
            for gathering different stylesheets for QrScreen.js
    
    Styles:
          container : 
          qrcamera :
          inputfield :
          placesNearby : 

*/



const styles = StyleSheet.create({

  ScrollView: {
    backgroundColor: '#0000ff'
  },
  container: {
    flex: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent : 'flex-end',
  },

  qrcontainer : {
    flex : 30,
    flexDirection : 'column',
    alignItems : 'center',
    borderColor : 'red',
  },

  qrcamera: {
    flex: 20, 
    flexDirection : 'row',
    alignSelf: 'center',
    justifyContent : 'center',
    borderColor : 'gray',
  },


  inputcontainer: {
    flex : 5,
    flexDirection : 'row',
    alignItems : 'center',
    alignSelf : 'center',
    backgroundColor : "#ffffff",
  },

  // inputfield field borders
  bordercontainer : {
    flex : 5,
    borderColor : 'gray',
    borderRadius : 10,
    borderWidth : 5,
  },
  // textinput
  inputfield: {
    width : 300,
    flex : 10,
    flexDirection : 'column',
    alignSelf : 'center',
    backgroundColor : '#ffffff',
    textAlignVertical : 'top',
  },

  // inputfield top view
  viewpaddingtext: {
    flex : 1,
    flexDirection : 'row',
    alignSelf : 'center',
    backgroundColor : '#ff0000',
  },


  viewpaddingcamera: {
    flex : 10,
    flexDirection : 'row',
    alignSelf : 'center',
    backgroundColor : '#ff0000',
  },

  button : {
    flex : 10,
    flexDirection : 'column',
    alignSelf : 'center',
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
