// import PushNotification from 'react-native-push-notification';
// import { PushNotificationIOS } from 'react-native';
// import firebase from 'react-native-firebase';
// import AsyncStorage from '@react-native-community/async-storage';
// const checkPermission =()=> {
//   const enabled =  firebase.messaging().hasPermission();
//   if (enabled) {
//      getToken();
//   } else {
//      requestPermission();
//   }
// }

// const getToken = async()=> {
//   let fcmToken = await AsyncStorage.getItem('fcmToken');
//   if (!fcmToken) {
//       fcmToken = await firebase.messaging().getToken();
//       if (fcmToken) {
//           // user has a device token
//           await AsyncStorage.setItem('fcmToken', fcmToken);
//       }
//   }
//   console.log("fcmToken: ",fcmToken)
// }
// const configure = () => {
//  PushNotification.configure({

//    onRegister:function(){
//      console.log("configure function")
//    },
 
//    onNotification: function(notification) {
//      // process the notification
//      // required on iOS only
//      notification.finish(PushNotificationIOS.FetchResult.NoData);
//    },

//    permissions: {
//      alert: true,
//      badge: true,
//      sound: true
//    },

//    popInitialNotification: true,
//    requestPermissions: true,

//  });

 
// };

// const requestPermission = async()=> {
//   try {
//       await firebase.messaging().requestPermission();
//       // User has authorised
//       this.getToken();
//   } catch (error) {
//       // User has rejected permissions
//       console.log('permission rejected');
//       this.checkPermission();
//   }
// }
// const localNotification = (message,title) => {
//     PushNotification.localNotification({
//       autoCancel: true,
//       largeIcon: "ic_launcher",
//       smallIcon: "ic_notification",
//       bigText: message,
     
//       color: "green",
//       vibrate: true,
//       vibration: 300,
//       title:title,
//       message: message,
//       playSound: true,
//       soundName: 'default',
    
//     });
//    };


// export {
//  configure,localNotification ,checkPermission
// };