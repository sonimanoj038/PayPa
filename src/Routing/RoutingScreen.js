// @ts-nocheck


import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  Easing,
  Animated,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import {
  createBottomTabNavigator
} from 'react-navigation-tabs';
import {
  createStackNavigator
} from 'react-navigation-stack';
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
import LocationDemo from '../Test-Screen/LocationDemo';
import UPostView from '../User/Screens/UPostView';
import UserSetting from '../User/Screens/UserSetting';
import AfterPayScreen from '../User/Screens/AfterPayScreen';
import PaymentScreen from '../User/Screens/PaymentScreen';
import UserEditProfile from '../User/Screens/UserEditProfile';
import UWallet from '../User/Screens/UWallet';
import UserTimeline from '../User/Screens/UserTimeline';
import BusinessView from '../User/Screens/BusinessView';
import ScannerScreen from '../User/Screens/ScannerScreen';
import PayWithMobile from '../User/Screens/PayWithMobile';
import BAddPost from '../Business/Screens/BAddPost';
import EditBusinessProfile from '../Business/Screens/EditBusinessProfile';
import BNotification from '../Business/Screens/BNotification'
import BusinessSetting from '../Business/Screens/BusinessSetting'
import BusinessEditProfile from '../Business/Screens/BusinessEditProfile'
import PaymetReqest from '../Business/Screens/PaymentReqest'
import BPassbook from '../Business/Screens/BPassbook'
import PostView from '../Business/Screens/PostView'
import BusinessRegistrationScreen from '../Business/BusinessRegistrationScreen'
import BusinessTimeline from '../Business/Screens/BusinessTimeline';
import UploadBusiness from '../Business/Screens/UploadBusiness';
import QrCodeScreen from '../Business/Screens/QRCode';
import BChangePin from '../Common/Screens/ChangePassword';
import ContactUs from '../Common/Screens/ContactUs';
import FaqScreen from '../Common/Screens/FaqScreen';
import PrivacyPolicy from '../Common/Screens/PrivacyPolicy';
import TermCondition from '../Common/Screens/TermCondtion';
import ShowTimelineImage from '../Common/Screens/ShowTimelineImage';
import AsyncStorage from '@react-native-community/async-storage';
import MyFavScreen from '../User/Screens/MyFavScreen';
import EditPost from '../Business/Screens/EditPost';
import AddStaff from '../Business/Screens/AddStaff';
import ViewStaff from '../Business/Screens/ViewStaff';
import EditStaff from '../Business/Screens/EditStaff';
import StaffQRCode from '../staff/screens/StaffQRCode';
import EditStaffProfile from '../staff/screens/EditStaffProfile';
import ShowStaff from '../staff/screens/ShowStaff';
import StaffPayments from '../staff/screens/StaffPayments';
import StaffSetting from '../staff/screens/StaffSetting';
import LogoutScreen from '../staff/screens/LogoutScreen';

export const USER_KEY = "true";

export const onSignIn = () => AsyncStorage.setItem('USER_KEY', "true");


const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(1)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const {
        layout,
        position,
        scene
      } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return {
        transform: [{
          translateX
        }]
      }
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
  pass: ForgotPassScreen,
  OtpVerifiy: OtpVerifiyScreen,
  ChangePin: ChangePin,
  Uregister: UserRegistrationScreen,
  Bregister: BusinessRegistrationScreen,
  UploadBusiness: UploadBusiness,
  Welcome: WelcomeAgain,
  Bset: BusinessSetting,
  paynow: PaymentScreen,
  ForgotPin: BChangePin,
  SUploadBusiness: EditBusinessProfile,
  BusinessProfile:BusinessRegistrationScreen,
  PaymetReqest:PaymetReqest,
  BusinessView:BusinessView,
  PrivacyPolicy:PrivacyPolicy
 
}, {

  // initialRouteName:'UploadBusiness',
  transitionConfig,
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,

  },
})
const UserStack = createStackNavigator({

  Timeline: TimelineScreen,
  Time: TimelineView,



}, {

  initialRouteName: 'Timeline',
  transitionConfig,
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
    tabBarIcon: ({
      tintColor
    }) => < Icon name = "ios-briefcase"
    style = {
      {
        color: tintColor,
        fontSize: 30
      }
    }
    />
  },

})
UserStack.navigationOptions = ({
  navigation
}) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if (routeName == 'Time') {
    tabBarVisible = false
  }


  return {
    tabBarVisible,

    tabBarIcon: ({
      tintColor
    }) => < Icon name = "ios-briefcase"
    style = {
      {
        color: tintColor,
        fontSize: 30
      }
    }
    />
  };
};


const UserSettingStack = createStackNavigator({
  USetting: UserSetting,
  USregister: UserEditProfile,
  UChangePin: ChangePin,
  UContactUs: ContactUs,
  MyFav: MyFavScreen,
  FaqScreen:FaqScreen,
  PrivacyPolicy:PrivacyPolicy,
  TermCondition:TermCondition,
 

}, {
  headerMode: 'none',
  initialRouteName: 'USetting'
});
UserSettingStack.navigationOptions = ({
  navigation
}) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if (routeName == 'USregister') {
    tabBarVisible = false
  } else if (routeName == 'UChangePin') {
    tabBarVisible = false
  } else if (routeName == 'UContactUs') {
    tabBarVisible = false
  } else if (routeName == 'MyFav') {
    tabBarVisible = false
  }


  return {
    tabBarVisible,

    tabBarIcon: ({
      tintColor
    }) => ( <
      Icon name = "md-settings"
      style = {
        {
          color: tintColor,
          fontSize: 30
        }
      }
      />
    )
  };
};


const BusinessSettingStack = createStackNavigator({
  BSetting: BusinessSetting,
  BSregister: BusinessEditProfile,
  SUploadBusiness: EditBusinessProfile,
  BChangePin: ChangePin,
  Qrcode: QrCodeScreen,
  BContactUs: ContactUs,
  AddStaff:AddStaff,
  ViewStaff:ViewStaff,
  EditStaff:EditStaff,
  PrivacyPolicy2:PrivacyPolicy,
  FaqScreen2:FaqScreen,
  TermCondition2:TermCondition
 



}, {
  headerMode: 'none',
  initialRouteName: 'BSetting'
});
BusinessSettingStack.navigationOptions = ({
  navigation
}) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if (routeName == 'BSregister') {
    tabBarVisible = false
  } else if (routeName == 'SUploadBusiness') {

    tabBarVisible = false
  } else if (routeName == 'BChangePin') {

    tabBarVisible = false
  } else if (routeName == 'Qrcode') {

    tabBarVisible = false
  } else if (routeName == 'BContactUs') {

    tabBarVisible = false
  } else if (routeName == 'EditPost') {

    tabBarVisible = false
  }
  else if (routeName == 'ViewStaff') {

    tabBarVisible = false
  }
  else if (routeName == 'AddStaff') {

    tabBarVisible = false
  }
  else if (routeName == 'EditStaff') {

    tabBarVisible = false
  }
  
  return {
    tabBarVisible,

    tabBarIcon: ({
      tintColor
    }) => ( <
      Icon name = "md-settings"
      style = {
        {
          color: tintColor,
          fontSize: 30
        }
      }
      />
    )
  };
};


const ScannerStack = createStackNavigator({
  scaner: ScannerScreen,
  pay: PaymentScreen,
  afterPay: AfterPayScreen,
  PayWithMobile:PayWithMobile

}, {
  headerMode: 'none',
});
ScannerStack.navigationOptions = ({
  navigation
}) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if (routeName == 'scaner') {
    tabBarVisible = false
  } else if (routeName == 'pay') {
    tabBarVisible = false
  } else if (routeName == 'afterPay') {
    tabBarVisible = false
  }
 else if (routeName == 'PayWithMobile') {
  tabBarVisible = false
}



  return {
    tabBarVisible,

    tabBarIcon: < Image source = {
      require('../img/user/ScanPay3.png')
    }
    style = {
      {
        height: 32,
        resizeMode: 'contain'
      }
    }
    />
  };
};


const AddPostStack = createStackNavigator({

  BAddPost: BAddPost



}, {
  headerMode: 'none',
});
AddPostStack.navigationOptions = ({
  navigation
}) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if (routeName == 'UAddPost') {
    tabBarVisible = false
  } else if (routeName == 'BAddPost') {
    tabBarVisible = false
  }

  return {
    tabBarVisible,

    tabBarIcon: < Icon name = "md-add-circle-outline"
    style = {
      {
        color: '#1c4478',
        fontSize: 30
      }
    }
    />
  };
};

const BnotifcationStack = createStackNavigator({

  BNotification: BNotification,
  PostView:PostView



}, {
  initialRouteName:'BNotification',
  headerMode: 'none',
});
BnotifcationStack .navigationOptions = ({
  navigation
}) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if (routeName == 'BNotification') {
    tabBarVisible = true
  } else if (routeName == 'PostView') {
    tabBarVisible = false
  }

  return {
    tabBarVisible,
tabBarOptions:{
     
  activeTintColor: '#e46c0b',
  inactiveTintColor: '#1c4478',
},
    tabBarIcon: ({
      tintColor
    }) => (< Icon name = "md-notifications-outline"
    style = {
      {
        color: tintColor,
        fontSize: 30
      }
    }
    />)
  };
};


const UnotifcationStack = createStackNavigator({

  UNotification: UNotification,
  UPostView:UPostView



}, {
  initialRouteName:'UNotification',
  headerMode: 'none',
});
UnotifcationStack .navigationOptions = ({
  navigation
}) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if (routeName == 'UNotification') {
    tabBarVisible = true
  } else if (routeName == 'UPostView') {
    tabBarVisible = false
  }

  return {
    tabBarVisible,

    tabBarOptions:{
     
      activeTintColor: '#e46c0b',
      inactiveTintColor: '#1c4478',
    },
        tabBarIcon: ({
          tintColor
        }) => (< Icon name = "md-notifications-outline"
        style = {
          {
            color: tintColor,
            fontSize: 30
          }
        }
        />)
    
  };
};

const BTimelineStack = createStackNavigator({
  TimlineView: ShowTimelineImage,
  Business: BusinessTimeline,
  EditPost: EditPost,
  PaymetReqest:PaymetReqest

  
}, {
  headerMode: 'none',
  initialRouteName: 'Business'
});
BTimelineStack.navigationOptions = ({
  navigation
}) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if (routeName == 'TimlineView') {
    tabBarVisible = false
  }
 else if (routeName == 'EditPost') {
    tabBarVisible = false
  }
  else if (routeName == 'PaymetReqest') {
    tabBarVisible = false
  }
  return {
    tabBarVisible,

    tabBarIcon: ({
      tintColor
    }) => ( <
      Icon name = "md-home"
      style = {
        {
          color: tintColor,
          fontSize: 30
        }
      }
      />
    )
  };
};

const UTimelineStack = createStackNavigator({

  UTimlineView: ShowTimelineImage,

 User: UserTimeline,
 BusinessView:BusinessView

}, {
  headerMode: 'none',
  initialRouteName:  'User'
});
UTimelineStack.navigationOptions = ({
  navigation
}) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if (routeName == 'UTimlineView') {
    tabBarVisible = false
  }

  return {
    tabBarVisible,

    tabBarIcon: ({
      tintColor
    }) => ( <
      Icon name = "md-home"
      style = {
        {
          color: tintColor,
          fontSize: 30
        }
      }
      />
    )
  };
};
const BusinessTab = createBottomTabNavigator({

  Home: {
    screen: BTimelineStack,
  },
  Payments: {
    screen: BPassbook

  },
  Add: {
    screen: AddPostStack
  },
  Notification:BnotifcationStack,
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

const StaffSettingStack = createStackNavigator({
  StaffSetting: StaffSetting,
  EditStaffProfile:  EditStaffProfile,
 ShowStaff:ShowStaff,
 LogoutScreen:LogoutScreen
 
 



}, {
  headerMode: 'none',
  initialRouteName: 'StaffSetting'
});
StaffSettingStack.navigationOptions = ({
  navigation
}) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if (routeName == 'EditStaffProfile') {
    tabBarVisible = false
  } else if (routeName == 'ShowStaff') {

    tabBarVisible = false
  } 
  
  return {
    tabBarVisible,

    tabBarIcon: ({
      tintColor
    }) => ( <
      Icon name = "md-settings"
      style = {
        {
          color: tintColor,
          fontSize: 30
        }
      }
      />
    )
  };
};

const StaffTab = createBottomTabNavigator({

  QRCode: {
    screen: StaffQRCode,
  },
Payments: {
    screen: StaffPayments

  },
  Setting: {
    screen: StaffSettingStack

  },

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
    screen: UTimelineStack,
  },
  Providers: {
    screen: UserStack

  },
  Pay: {
    screen: ScannerStack
  },
  Notification: UnotifcationStack,
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
  Staff: {
    screen: StaffTab,
  },
  UWallet: UWallet,
 
}, {

});
const AppContainer = createAppContainer(App);

export default class RoutingScreen extends React.Component {


  render() {
    return <AppContainer />

  }


}

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};


 