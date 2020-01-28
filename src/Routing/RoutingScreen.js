// @ts-nocheck


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
  import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import SignupScreen from '../Common/Screens/SignupScreen';
import WelcomeAgain from '../Common/Screens/WelcomeAgain';
import ForgotPassScreen from '../Common/Screens/ForgotPaassScreen';
import ChangePin from '../Common/Screens/ChangePin';
import OtpVerifiyScreen from '../Common/Screens/OtpVerifyScreen';
import LoginScreen from '../Common/Screens/LoginScreen';
import TimelineScreen from '../User/Screens/TimelineScreen';
import TimelineView from '../User/Screens/TimelineView';
import UserRegistrationScreen from '../User/Screens/UserRegistrationScreen'
import UAddPost from '../User/Screens/UAddPost';
import UNotification from '../User/Screens/UNotification';
import UserSetting from '../User/Screens/UserSetting';
import AfterPayScreen from '../User/Screens/AfterPayScreen';
import PaymentScreen from '../User/Screens/PaymentScreen';
import UserEditProfile from '../User/Screens/UserEditProfile';
import UWallet from '../User/Screens/UWallet';
import UserTimeline from '../User/Screens/UserTimeline';
import ScannerScreen from '../User/Screens/ScannerScreen';
import BAddPost from '../Business/Screens/BAddPost';
import EditBusinessProfile from '../Business/Screens/EditBusinessProfile';
import BNotification from '../Business/Screens/BNotification'
import BusinessSetting from '../Business/Screens/BusinessSetting'
import BusinessEditProfile from '../Business/Screens/BusinessEditProfile'
import BPassbook from '../Business/Screens/BPassbook'
import BusinessRegistrationScreen from '../Business/BusinessRegistrationScreen'
import BusinessTimeline from '../Business/Screens/BusinessTimeline';
import UploadBusiness from '../Business/Screens/UploadBusiness';
import QrCodeScreen from '../Business/Screens/QRCode';
import BChangePin from '../Common/Screens/ChangePassword';

const transitionConfig = () => {
    return {
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(1)),
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



  const LoginStack = createStackNavigator({

    Login: {
      screen: LoginScreen,

    },
    Signup: {
      screen: SignupScreen,
    },
    pass:ForgotPassScreen ,
OtpVerifiy:OtpVerifiyScreen,
ChangePin:ChangePin,
Uregister: UserRegistrationScreen,
Bregister: BusinessRegistrationScreen,
UploadBusiness:UploadBusiness,

Welcome:WelcomeAgain,
Bset:BusinessSetting,
paynow:PaymentScreen,
UWallet:UWallet,
Scanner:ScannerScreen




  },{
      
           initialRouteName:'Login',
             transitionConfig,
           headerMode: 'none',
            navigationOptions: {
                headerVisible: false,
                
            },
          })
  const UserStack = createStackNavigator({

      Timeline:TimelineScreen,
          Time:TimelineView,
         

          
  },
  {
      
    initialRouteName:'Timeline',
      transitionConfig,
    headerMode: 'none',
     navigationOptions: {
         headerVisible: false,
         tabBarIcon: ({ tintColor })=><Icon name="ios-briefcase" style={{ color:tintColor,fontSize:30 }} />
     },
    
   })
  
  
   const UserSettingStack = createStackNavigator({
    USetting:UserSetting,
    USregister: UserEditProfile,
    UChangePin:ChangePin,
  },
  {
    headerMode: 'none',
    initialRouteName:'USetting'
  });
  UserSettingStack.navigationOptions = ({navigation }) => {
   
    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if ( routeName == 'USregister' ) {
        tabBarVisible = false
    }else if ( routeName == 'UChangePin' ) {
      tabBarVisible = false
  }
   
   
    return {
      tabBarVisible,
     
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-settings" style={{ color: tintColor,fontSize:30 }} />
    )
    };
  };


  const BusinessSettingStack = createStackNavigator({
    BSetting:BusinessSetting,
    BSregister: BusinessEditProfile,
    SUploadBusiness:EditBusinessProfile,
    BChangePin:BChangePin,
    Qrcode:QrCodeScreen
  },
  {
    headerMode: 'none',
    initialRouteName:'BSetting'
  });
  BusinessSettingStack.navigationOptions = ({navigation }) => {
   
    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if ( routeName == 'BSregister' ) {
        tabBarVisible = false
    }else if ( routeName == 'SUploadBusiness' ) {

      tabBarVisible = false
    }else if ( routeName == 'BChangePin' ) {

      tabBarVisible = false
    }
    else if ( routeName == 'Qrcode' ) {

      tabBarVisible = false
    }
   
   
    return {
      tabBarVisible,
     
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-settings" style={{ color: tintColor,fontSize:30 }} />
    )
    };
  };


  const ScannerStack = createStackNavigator({
    scaner:ScannerScreen,
    pay:PaymentScreen,
  afterPay:AfterPayScreen
  },
  {
    headerMode: 'none',
  });
  ScannerStack.navigationOptions = ({navigation }) => {
   
    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if ( routeName == 'scaner' ) {
        tabBarVisible = false
    }else if ( routeName == 'pay' ) {
      tabBarVisible = false
  } else if ( routeName == 'afterPay' ) {
    tabBarVisible = false
}
 
   
   
    return {
      tabBarVisible,
     
      tabBarIcon:<Image source ={require('../img/user/ScanPay3.png')} style={{ color:'#1c4478',height:32,resizeMode:'contain' }} />
    };
  };





  const AddPostStack = createStackNavigator({

    BAddPost:BAddPost

   
    
  },
  {
    headerMode: 'none',
  });
  AddPostStack.navigationOptions = ({navigation }) => {
   
    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if ( routeName == 'UAddPost' ) {
        tabBarVisible = false
    }
    else if( routeName == 'BAddPost' ) {
        tabBarVisible = false
    }
   
    return {
      tabBarVisible,
     
      tabBarIcon:<Icon name="md-add-circle-outline" style={{ color:'#1c4478' ,fontSize:30 }} />
    };
  };

  const BusinessTab = createBottomTabNavigator({

    Home: {
        screen: BusinessTimeline,
    },
    Passbook: {
        screen: BPassbook

    },
    Add: {
        screen: AddPostStack
    },
    Notification:  BNotification
    ,
    Setting: {
        screen: BusinessSettingStack
    }

}, {
        animationEnabled: true,
        swipeEnabled: true,
        tabBarPosition: "bottom",
        tabBarOptions: {
            style: {
                ...Platform.select({
                    android: {
                        backgroundColor: 'white'
                    }
                })
            },
            activeTintColor: '#e46c0b',
            inactiveTintColor: '#1c4478',
            showLabel: true,
            showIcon: true
        }
    })

    const UserTab = createBottomTabNavigator({

      Home: {
          screen: UserTimeline,
      },
      Business: {
          screen: UserStack
  
      },
      Pay: {
          screen: ScannerStack
      },
      Notification: UNotification
      ,
      Setting: {
          screen: UserSettingStack
      }
  
  }, {
          animationEnabled: true,
          swipeEnabled: true,
          tabBarPosition: "bottom",
          tabBarOptions: {
              style: {
                  ...Platform.select({
                      android: {
                          backgroundColor: 'white'
                      }
                  })
              },
              activeTintColor: '#e46c0b',
              inactiveTintColor: '#1c4478',
              showLabel: true,
              showIcon: true
          }
      })
// const RootStack = createStackNavigator(

//     {
       
          
         
//          AddPost: AddPost,
//          Btime:BusinessTimeline,
//          Utime:UserTimeline
//     },{
      
//         initialRouteName:'Login',
//         transitionConfig,
//         headerMode: 'none',
//         navigationOptions: {
//             headerVisible: false,
//         },
        
//     }
    
// )



const App = createSwitchNavigator({
  Login: {
    screen: LoginStack,
  },
  User: {
    screen: UserTab,
  },
  Business: {
    screen: BusinessTab,
  },
 
});
const AppContainer = createAppContainer(App);

export default class RoutingScreen extends React.Component {
  render() {
    return <AppContainer />;
  }
}

