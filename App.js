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


import SplashScreen from 'react-native-splash-screen'

import RoutingScreen from './src/Routing/RoutingScreen';
import { Root } from "native-base";
export default class App extends React.Component{



  componentDidMount=()=>{

  
      SplashScreen.hide()
    
  }

  render(){
  return (
    
  <Fragment>
    
    <StatusBar barStyle="light-content" hidden = {false} backgroundColor="#1c4478"/>
    <Root>
<RoutingScreen/>
</Root>

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


