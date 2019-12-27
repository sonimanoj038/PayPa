/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
 
  StatusBar,Image,
  ImageBackground 
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import LoginScreen from './src/screens/LoginScreen'
import ChangePassword from './src/screens/ChangePassword'
import ChangePin from './src/screens/ChangePin'
import RegistrationScreen from './src/screens/RegistrationScreen'

import QRCode from './src/screens/QRCode'
import SplashScreen from 'react-native-splash-screen'
import ScannerScreen from './src/screens/ScannerScreen'

export default class App extends React.Component{



  componentDidMount=()=>{

  
      SplashScreen.hide()
    
  }

  render(){
  return (
    
  <Fragment>
    
    <StatusBar barStyle="light-content" hidden = {false} backgroundColor="#1c4478"/>
< LoginScreen/>


  </Fragment>) 
 
  
  


   


  
};
}
const styles = StyleSheet.create({
 
  body: {
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    fontSize:18,
    backgroundColor: Colors.white,
  },
 
});


