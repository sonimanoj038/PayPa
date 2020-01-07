

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
    StatusBar,Image,Easing,
     Animated,ImageBackground
  } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignupScreen from '../Common/Screens/SignupScreen';
import ForgotPassScreen from '../Common/Screens//ForgotPaassScreen';
import TimelineScreen from '../User/Screens/TimelineScreen';
import TimelineView from '../User/Screens/TimelineView';
import RegistrationScreen from '../User/Screens/RegistrationScreen'

import LoginScreen from '../Common/Screens/LoginScreen';

const transitionConfig = () => {
    return {
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(3)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: sceneProps => {      
        const { layout, position, scene } = sceneProps
  
        const thisSceneIndex = scene.index
        const width = layout.initWidth
  
        const translateX = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex],
          outputRange: [width, 0],
        })
  
        return { transform: [ { translateX } ] }
      },
    }
  }



const RootStack = createStackNavigator(

    {
        Login: {
            screen: LoginScreen,

          },
          Signup: {
            screen: SignupScreen,
          },
          pass:ForgotPassScreen ,
          timeline:TimelineScreen,
          time:TimelineView,
          register:RegistrationScreen
    },{
        initialRouteName:'Login',
        transitionConfig,
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
    
)
const AppContainer = createAppContainer(RootStack);

export default class RoutingScreen extends React.Component {
  render() {
    return <AppContainer />;
  }
}