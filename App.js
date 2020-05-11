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
  ImageBackground ,Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { isSignedIn } from "./src/Routing/RoutingScreen";
import SplashScreen from 'react-native-splash-screen'
import WelcomeAgain from './src/Common/Screens/WelcomeAgain'
import RoutingScreen from './src/Routing/RoutingScreen';
import {pushNotifications} from './src/Common/Service/index';
import { Root } from "native-base";
import firebase, { notifications } from 'react-native-firebase';
import { NavigationContainer } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import PushController from './src/Common/Service/Notification';


export default class App extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      
      checkedSignIn: false
    };
  }

  
  componentDidMount=async()=>{
   
      SplashScreen.hide()
    
  }

  
  render(){
    
      return<Fragment>
      
     
      <Root>
      <StatusBar barStyle="light-content" hidden = {false} backgroundColor="#1c4478"/>
      <RoutingScreen/>
      <PushController/>
   
  </Root>
 
    </Fragment> 
    
  }
 
  
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


