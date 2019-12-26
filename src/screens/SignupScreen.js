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
import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Mytext from '../component/Mytext';


const SignupScreen= ({navigation})=> {
  return (
    <ImageBackground  source={require('../img/splash.png')}  style={{ flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      width: null,
      height: null,}} >
 <View style = {{alignItems:'center',justifyContent:'center'}}>
    <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
 <Image source={require('../img/logo.png')} />
   
   <Image source={require('../img/paya-text.png')} style ={{}}/>


          <Mytext></Mytext>
          
          <Item  rounded style ={styles.InputItem} >
          <Image source={require('../img/email2.png')} />
            <Input placeholder='Enter Email Id' placeholderTextColor="#dce0e6" secureMytextEntry style={{color:'white'}} keyboardType="numeric" />
          </Item>

          <Mytext></Mytext>
         
          <Item  rounded style ={styles.InputItem} >
          <Image source={require('../img/call3.png')} />
            <Input placeholder='Enter Call Number' placeholderTextColor="#dce0e6" style = {{color:'white'}} keyboardType="numeric" />
          </Item>
          <Mytext></Mytext>
          <Item  rounded style ={styles.InputItem} >
          <Image source={require('../img/call3.png')} />
            <Input placeholder='Enter Pin' placeholderTextColor="#dce0e6" style = {{color:'white'}} keyboardType="numeric" />
          </Item>

          <Mytext>
</Mytext>
<Mytext></Mytext>
          <Button  rounded light style ={{paddingHorizontal:50,alignItems:'center',width:'75%'}}>
            <Mytext  style ={{color:'#1c4478',textAlign:"center",width:'100%',fontWeight:'700'}}>SIGN UP</Mytext>
          </Button>
<Mytext>
</Mytext>
<Mytext>
</Mytext>

<View style = {{flexDirection:'row'}}>
  <Mytext style = {{color:'#dce0e6',fontSize:11,paddingVertical:2}}> Already have an acount?</Mytext>
  <TouchableOpacity onPress ={()=> navigation.navigate('Login')} style ={{}}>
      <Mytext style = {{color:'#dce0e6',fontSize:13,padding:1}}>Login Now</Mytext></TouchableOpacity>
</View>

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
 InputItem:{

  backgroundColor:'#23528b',
  width:'80%',
  borderColor:'#23528b',

 }
});

export default SignupScreen;
