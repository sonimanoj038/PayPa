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
  Modal,
  View,
  Platform,
 PermissionsAndroid,Text,
  StatusBar,Image,
  ImageBackground ,Alert,BackHandler
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
import Geolocation from '@react-native-community/geolocation';


export default class App extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      location:false,
      checkedSignIn: false,
      msg:'Open setting and gives permission to the App in order to use the app',
      Alert_Visibility:false

    };
  }

  
  componentDidMount=async()=>{
   
      SplashScreen.hide()
     this.getAdreess()
  }

  componentWillUnmount = () => {
    
    Geolocation.clearWatch(this.watchID);
   }
   getAdreess = async()=>{
    this.setState({loadingLocation:true})
    var that =this;
    
    if(Platform.OS === 'ios'){
      this.callLocation(that);
    }else{
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            // @ts-ignore
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
              'title': 'Location Access Required',
              'message': 'This App needs to Access your location'
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
           
            that.callLocation(that);
          } else {
that.setState({Alert_Visibility:true})
           
          }
        } catch (err) {
          // @ts-ignore
        
          console.warn(err)
        }
      }
      requestLocationPermission();
    }    
   }
     callLocation(that){
    //alert("callLocation Called");
    Geolocation.getCurrentPosition(
        //Will give you the current location
         (position) => {
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            AsyncStorage.setItem('lat', currentLatitude)
            AsyncStorage.setItem('long', currentLongitude)
           
         },
         (error) =>  {

        
          AsyncStorage.setItem('gps', 'true')
           },
         { enableHighAccuracy: true, timeout:3600000, maximumAge: 1000 }
      );
      that.watchID = Geolocation.watchPosition((position) => {
        //Will give you the location on location change
          console.log(position);
          const currentLongitude = JSON.stringify(position.coords.longitude);
          //getting the Longitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);
          AsyncStorage.setItem('lat', currentLatitude)
          AsyncStorage.setItem('long', currentLongitude)
      })
  }
  
  render(){
    
      return<Fragment>
      
     
      <Root>
      <StatusBar barStyle="light-content" hidden = {false} backgroundColor="#1c4478"/>
      <Modal
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          visible={this.state.Alert_Visibility}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () =>BackHandler.exitApp() } >
            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0.2, 0.7)'}}>
                <View style={styles.Alert_Main_View}>
                    <Text style={styles.Alert_Title}>Location Required</Text>
                    <Text style={styles.Alert_Message}> {this.state.msg} </Text>
                  </View>
                {/* <View style={{flexDirection: 'row',height:'10%',width:'70%'}}>
 <TouchableOpacity 
     style={styles.buttonStyle} 
     onPress={this.ok_Button} 
     activeOpacity={0.7} 
     >
     <Text style={styles.TextStyle}> OK</Text>
 </TouchableOpacity>
         </View> */}
            </View>
        </ Modal >
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
 
  },
  inputitem:{

    backgroundColor:'#23528b',width:'80%',
  },
  Alert_Main_View:{
 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : "white",
     
    height: 200 ,
    width: '70%',
    borderWidth: 1,
    borderColor: '#1c4478',
    borderRadius:7,
    
   
  },
   
  Alert_Title:{
   
    fontSize: 25, 
    color: "black",
    textAlign: 'center',
    padding: 5,
    height: '28%',
    fontFamily:'Roboto-Medium'
   
  },
   
  Alert_Message:{
   
      fontSize: 18, 
      color: "black",
      textAlign: 'center',
      padding: 10,
      height: '42%',
      fontFamily:'Roboto-Light'
    },
   
  buttonStyle: {
      
    width:'100%',
    backgroundColor:'#1c4478',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
   marginVertical:5,
   
   
    borderRadius:7,
  },
     
  TextStyle:{
      color:'white',
      textAlign:'center',
      fontSize: 23,
      marginTop: -5, fontFamily:'Roboto-Medium'
      
  },
 
 
});


