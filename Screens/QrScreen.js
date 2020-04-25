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
  Keyboard,
  KeyboardAvoidingView,
  Image
} from 'react-native'


import ReactDome from 'react-dom'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Modal } from 'react-native-router-flux'


import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

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
const STORAGE_KEY = 'Key'
const STORAGE_DELIMITER = ':'
const PASSPHRASE = 'YouShallPass'
const filePath = '../assets/Ikonit/QR/Home-01.png'


/* funktio Qrcamera Qr koodi lukemiseen
  Decsription:
      for reading qr code
      TODO decide qr code format.
  variables:
      hasPermission : tracks phone permission for app 
      setHasPermission : hook for hasPermission
      scanned :  tracks if qr value has been read.
      setScanner : hook for scanned
      window : 
      storePlace : function. 
      storePlace : function. 
      
      handleChange : callback function from QrScreen and passed by Componentrender, updates Qrscreen qrsscanned state


  hooks:
      useEffect : waits for permission from. Uses BarCodeScanner library
      handleBarCodeScanned : changes state scanned and handleChange.
      handleChange : 

*/
function Qrcamera(props) {
  const storePlace = props.storePlace
  const handleChange = props.handleChange
  const [hasPermission, setHasPermission] = useState(undefined)
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
    storePlace( data );
  }

  if (hasPermission === undefined) {
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
        storeInput : hook function from QrScreen
        text : written text. Isn't equal to value in inputfield. 
        textQuestion = defines text about inputfield
    return:
           ScrollViews : allow shutting keyboard
           returnKeyType, onKeyPress : dismisses keyboard on enter press, works in IOS.

    
*/
function Inputfield(props) {
  const [value, onChangeText] = useState(undefined)
  const storeInput = props.storeInput
  const text = props.text
  const textQuestion = props.textQuestion
  
  return (
    <View >
      <View style={styles.viewpaddingtext}/>
      <ScrollView style={styles.ScrollViewVertical}></ScrollView>
      <Text style= { {alignSelf:'center' } }> { textQuestion }</Text>
      <View style={ styles.bordercontainer }>
          <TextInput
                style= {styles.inputfield}
                multiline= {true}
                returnKeyType = "done"
                onKeyPress = {( key ) => { if( key.nativeEvent.key == "enter" ){Keyboard.dismiss( )} } }
                onChangeText= {( text => onChangeText( text ), value => storeInput( value ) )}
              />
      </View>
      
      <ScrollView style={styles.ScrollViewVertical}></ScrollView>
      <View style={ styles.viewpaddingtext }></View>
    </View>
  )
}

/* Componentrender
  Description:
        Responsible choosing component that is rendered.
  variables:
        qrsscanned : QrScreen state that tracks status of qrscanner. Used to pick right component to be rended.
        handleChange : handler function for tracking status, defined in and passed from QrScreen, further passed to Qrcamera function.
        storeInput : Check inputfield function. This function only passes hook functions down.
        screenText : Check inputfield function. This function only passes hook functions down.
        storePlace :  Check qrcamera function. This function only passes hook functions down.
        textQuestion : Check inputfield function. This function only passes variable down
  setText : Solves in which language text is shown. 
*/

function Componentrender(props) {
  const qrscanned = props.qrscanned
  const handleChange = props.handleChange
  const storeInput = props.storeInput
  const screenText = props.text;
  const storePlace = props.storePlace
  const textQuestion = props.textQuestion

  if (qrscanned === false) {
    return [
      <Qrcamera key={'qrscam'} handleChange={handleChange} storePlace={ storePlace } />
    ]
  }
  if (qrscanned === true) {
    return [
      <Inputfield key={'infield'} storeInput={storeInput} qrscanned={ qrscanned } text={screenText} textQuestion={textQuestion} />
    ]
  }
  return <Text> No bueno qrscanned is null </Text>
}
/*
  QrScreen
   Description:
          Defines screens functions 
   Variables:
       qrsscanned : tracks status of qrcamera. Passed down to qrcamera function.
       message : Tracks content of Inputfield. Passed down to inputfield function.
       newPlace : Used to save place name.
       passed : Tracks if qr code is valid
       textQuestion : check inputfield. Defines text above for inputfield.

    handleChange : callback function for Componentrender handlesChange changes value of qrsscanned
    storeInput : callback function for saving text from Inputfieeld  to message variable. 
    onPress : callback function for button "Return home page".   
    submitMessage : async function. stores time, place and message to asyncstorage
    storePlace :  stores a place to variable.
       
*/

class QrScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      qrscanned: true,
      message: undefined,
      newPlace : '',
      passed : false,
      textQuestion : 'What did you say?',
    }
    this.handleChange = this.handleChange.bind(this)
    this.storeInput = this.storeInput.bind(this)
    this.onPress = this.onPress.bind(this)
    this.submitMessage = this.submitMessage.bind( this )
    this.storePlace = this.storePlace.bind( this )
  }

  handleChange(is_scanned) {
    this.setState({ qrscanned: is_scanned })
  }

  storeInput(text) {
    this.message = text
  }

  storePlace( data ){
    var parsedData = data.split( STORAGE_DELIMITER );
    console.log( "parsedData " + parsedData )
    if( parsedData[0] == PASSPHRASE ){
      this.newPlace = parsedData[1]
      this.passed = true;
    }
    else{
      this.passed = false;
    }
  }
  //async checkLanguage( ){this.textQuestion = ""}

  async submitMessage( ){
    if( this.passed === true ){
      try{
        console.log( "You shall pass")
        var day = new Date().getDate( );
        var year = new Date().getFullYear( );
        var month = new Date().getMonth( );
        var hour = new Date().getHours( );
        var minute = new Date( ).getMinutes( );
        var date = day + "." + month + "." + year + " " + hour + "." + minute;
        let localData = await AsyncStorage.getItem( STORAGE_KEY )
        let newData = {
          place : this.newPlace,
          time : date,
          phrase : this.message
        }
        console.log( "paikka " + newData.place + " aika " + newData.time + " lause " + newData.phrase );
        if( localData == undefined ){
          await AsyncStorage.setItem( STORAGE_KEY, JSON.stringify( newData ) );
        }
        else{
          
          await AsyncStorage.setItem( STORAGE_KEY, localData += JSON.stringify( newData ));
        }
        const curData = await AsyncStorage.getItem( STORAGE_KEY )
        console.log( "Data on \n " + curData );
      }
      catch( error ){
        console.log( "fuck up in submitmessage asyncget " + error.message)
      }
    }
    else{
      console.log( "You shall't pass" )
    }
    
  }
  async setText( ){
    const language = await AsyncStorage.getItem( 'fi' );
    this.state.textQuestion = language;
  }
  onPress( ) {
    this.setState( { message : ''})
    this.setState( { qrscanned : false})
    const { navigate } = this.props.navigation
    this.submitMessage( );
    navigate('Home')
  }

  render() {
    const qrscanned = this.state.qrscanned;
    this.setText( );
    try{
      return (
      <KeyboardAvoidingView style={styles.Avoidcontainer}>
        <Componentrender
          storePlace = {this.storePlace}
          qrscanned={qrscanned}
          handleChange={this.handleChange}
          storeInput={this.storeInput}
          text={this.message}
        ></Componentrender>
        <TouchableOpacity style={styles.box} onPress={this.onPress}>
          <Image
            source={ require( filePath ) }
            style={styles.boxImage}>
          </Image>
            
        </TouchableOpacity>
      </KeyboardAvoidingView>
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

  ScrollViewVertical: {
    backgroundColor : "#0000ff",
    height : hp( "10%")
  },

  ScrollViewHorizontal:{
    backgroundColor: '#ff0000',
    flexDirection : 'column',
    alignSelf : 'flex-start',
  },

  Avoidcontainer: {
    flex: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent : 'flex-end',
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
    flex: 40,
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

  box: {
    color: '#D4DDE6',
    height: hp('9%'),
    borderColor: '#D4DDE6',
    borderWidth: 2,
    flexDirection: 'row'
  },

  boxImage: {
      width: wp('20%' ),
      height: hp('10%' ),
      justifyContent : 'center',
      alignSelf : 'center'
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
