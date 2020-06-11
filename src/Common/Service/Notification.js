import React, {Component} from "react";
import PushNotification from 'react-native-push-notification';
import firebase, { notifications } from "react-native-firebase";
import AsyncStorage from '@react-native-community/async-storage';
// import {
//     createAppContainer,
//     createSwitchNavigator,NavigationActions
//   } from 'react-navigation';
import {
 Alert,View, Text
} from 'react-native';

 class PushController extends Component{
    
  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getFcmToken();
    } else {
      this.requestPermission();
    }
   }
   requestPermission = async () => {
    try {
     await firebase.messaging().requestPermission();
     // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
   }
   getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
   
    await AsyncStorage.setItem('fcmToken',fcmToken)
   console.log(fcmToken)
 
   
    } else {
     this.showAlert("Failed", "No token received");
    }
   }

   showAlert = (title, message) => {
    Alert.alert(
     title,
     message,
     [
      {text: "OK", onPress: () => console.log("OK Pressed")},
     ],
     {cancelable: false},
    );
   }
    componentDidMount(){
        
        this.messageListener();
    }

    componentWillUnmount() {
      this.messageListener();
  }
    messageListener = async () => {
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: ()=>this.checkPermission() ,
       
        // (required) Called when a remote or local notification is opened or received
        onNotification: (notification)=> {
          AsyncStorage.setItem("notification", JSON.stringify(notification));

         console.log(notification)
        
        },
       
       
        senderID: "495398395859",
       
      
        permissions: {
          alert: true,
          badge: true,
          sound: true
        },
       
        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,
       
        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         */
        requestPermissions: true
      });
     }


    render(){
        return null
    }
}


export default PushController;