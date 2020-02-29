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
  AsyncStorage
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
import { Textinput } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

// for render control
import ReactDom from 'react-dom'

//For translations
import { t } from '../Locales'

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

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    handleChange(true)
    //alert(`Luin tyypin ${type} ja datan ${data}!`);
  }

  if (hasPermission === null) {
    return <Text> Camera requires a permission for camera. </Text>
  }
  if (hasPermission === false) {
    return <Text> Permission not granted. </Text>
  }

  return (
    <View style={StyleSheet.container}>
      <View style={{ alignSelf: 'center', flex: 10 }}></View>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 5, alignSelf: 'center', height: 300, width: 200 }}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
        }}
      ></Camera>
      <View style={{ alignItems: 'center', flex: 10 }}></View>
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
    <View style={styles.inputcontainer}>
      <TextInput
                style= {styles.inputfield}
                multiline= {true}
                onChangeText= {( text => onChangeText( text ), value => storeInput( value ) )}
              />
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
      <Text key={'qrtext'}> Scan a code</Text>,
      <Qrcamera key={'qrscam'} handleChange={handleChange} />
    ]
  }
  if (qrscanned === true) {
    return [
      <Text key={'intext'}> What did you say? </Text>,
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
      message: undefined
    }
    this.submitButton = this.button;
    this.handleChange = this.handleChange.bind(this)
    this.storeInput = this.storeInput.bind(this)
    this.onPress = this.onPress.bind(this)
    this.submitMessage = this.submitMessage.bind( this )
  }

  handleChange(is_scanned) {
    this.setState({ qrscanned: is_scanned })
  }

  storeInput(text) {
    this.message = text;
  }

  async submitMessage( item ){
    let nItem = JSON.stringify( item );
    let token;

    AsyncStorage.setItem( STORAGE_KEY, nItem );
    try{
      const token = await AsyncStorage.getItem( STORAGE_KEY );
      const message = JSON.parse( token );
      alert( "AsyncStorage getItem. message is " + message.words + " number is " + message.number_of );
    }
    catch( error ){
      alert( "fuck up in submitmessage asyncget " + error.message)
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
    alert( "message is " + this.message)
    navigate('Home')
  }

  render() {
    const qrscanned = this.state.qrscanned
    return (
      <View style={styles.container}>
        <Componentrender 
          qrscanned={qrscanned}
          handleChange={this.handleChange}
          storeInput={this.storeInput}
          text={this.message}
        ></Componentrender>
        <Button ref={this.submitButton} title='Return to home page' onPress={this.onPress}></Button>
      </View>
    )
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
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  qrcamera: {
    flex: 1
  },

  inputcontainer: {
    borderColor: 'black',
    backgroundColor: '#CFCFCF',
    paddingRight: 5,
    paddingLeft: 5,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },

  inputfield: {
    backgroundColor: '#CFCFCF',
    borderWidth: 5,
    height: 200,
    width: 200,
    borderColor: '#CFCFCF',
    alignItems: 'center',
    alignSelf: 'center',
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
export default QrScreen
