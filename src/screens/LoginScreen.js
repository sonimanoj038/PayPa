/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
  
} from 'react-native/Libraries/NewAppScreen';
import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer, Content} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Mytext from '../component/Mytext';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignupScreen from '../screens/SignupScreen';
import ForgotPassScreen from '../screens/ForgotPaassScreen';
import TimelineScreen from '../screens/TimelineScreen';
import TimelineView from '../screens/TimelineView';
import RegistrationScreen from '../screens/RegistrationScreen'
const LoginScreen= ({ navigation })=> {
    
  return (
    <ImageBackground  source={require('../img/splash.png')}  style={{ flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      width: null,
      height: null,}} >
 <View style = {{alignItems:'center',justifyContent:'center'}}>
  
 <Image source={require('../img/logo.png')} />

   
   <Image source={require('../img/paya-text.png')} style ={{}}/>
<View style ={{flexDirection:"row",paddingVertical:20}}>
<Radio selected={true} style ={{paddingHorizontal:5,fontSize:5}} color="white" selectedColor	="#dce0e6"/>
<Mytext style = {{color:'#dce0e6',paddingVertical:4}}>User</Mytext>

<Radio selected={false} style ={{paddingHorizontal:5,fontSize:5}} color="#dce0e6" />
<Mytext style = {{color:'#dce0e6',paddingVertical:4}}>Business</Mytext>

</View>

<Item  rounded style ={{backgroundColor:'#23528b',width:'80%',borderColor:'#23528b'}} >
<Image source={require('../img/call3.png')} />
            <Input placeholderTextColor="#dce0e6" style = {{color:'white'}} keyboardType="numeric" placeholder='Enter Call Number' />
          </Item>
          <Mytext></Mytext>
          <Item  rounded style ={{backgroundColor:'#23528b',width:'80%',borderColor:'#23528b'}} >
          <Image source={require('../img/login2.png')} />
            <Input placeholder='Enter Pin' placeholderTextColor="#dce0e6" secureMytextEntry style={{color:'white'}} keyboardType="numeric" />
          </Item>
          <Mytext></Mytext>
          <Mytext></Mytext>
          <Button  rounded light style ={{paddingHorizontal:50,alignItems:'center',width:'75%'}} onPress ={()=> navigation.navigate('register')}>
            <Mytext  style ={{color:'#1c4478',textAlign:"center",width:'100%',fontWeight:'700'}}>LOGIN</Mytext>
          </Button>
<Mytext>
</Mytext>
<Mytext>
</Mytext>

<View style = {{flexDirection:'row'}}>
  <Mytext style = {{color:'#dce0e6',fontSize:11,paddingVertical:3}}> Don't have an acount?</Mytext>
  <TouchableOpacity onPress ={()=> navigation.navigate('Signup')}><Mytext style = {{color:'#dce0e6',fontSize:13,padding:2}}>Sign Up Now</Mytext></TouchableOpacity>
</View>
<TouchableOpacity onPress ={()=> navigation.navigate('pass')} style={{width: '100%',
  height: 50,
  
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative', //Here is the trick
  bottom: 0,}} >
<Mytext  style = {{color:'#dce0e6',fontSize:11,
  bottom:0,paddingVertical:30}}> Forgot Password?</Mytext>

</TouchableOpacity>

 
 </View>
</ImageBackground>
  );
};

const styles = StyleSheet.create({
 
  body: {
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    fontSize:18,
    backgroundColor: Colors.white,
  },
 
});
const transitionConfig = () => {
    return {
      transitionSpec: {
        duration: 500,
        easing: Easing.out(Easing.poly(4)),
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

const routs = createStackNavigator(

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

export default createAppContainer( routs);
