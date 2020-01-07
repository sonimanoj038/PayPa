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
  ImageBackground ,Animated,
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
import Mytext from '../Component/Mytext';

// @ts-ignore
import VirtualKeyboard from 'react-native-virtual-keyboard';



export default class OtpVerifyScreen extends React.Component {


    constructor(props){
  
      super(props);
  
  this.state ={
  
  type:0,
  
  mobile:'',
  otp:'',
  verifyInput:true,
  verifyInput2:true,
 
  }
  
  }
  changeText(newText) {
    this.setState({otp: newText});
}
  render(){
    
  return (
    <ImageBackground  source={require('../../img/common/splash.png')}  style={{ flex: 1,
      justifyContent: "center",
      width: null,
      height: null,}} >
 <View style ={{ 
      alignItems: 'center'}}>

 <Text style = {{color:'white',fontSize:20,fontFamily:'sans-serif-light'}}> Verify Your Number !</Text>
 <Text style = {{color:'white',fontSize:15,fontFamily:'sans-serif-light'}}> We have sent an OTP on number</Text>
 <Text style = {{color:'white',fontSize:15,fontFamily:'sans-serif-light'}}> +1 99915478555</Text>
<Mytext></Mytext>
<View   style ={styles.InputItem} >

         <Text style={{color:'white',padding:10,textAlign:'center',fontSize:20,fontWeight:'800'}}>{this.state.otp?this.state.otp:'_ _ _ _ _ _'}</Text>
          </View>
          <Mytext></Mytext>


          <Text style = {{color:'white',fontSize:15,fontFamily:'sans-serif-light'}}> RESEND OTP?</Text>
          <Mytext></Mytext>
         
<View  style = {{padding:10,backgroundColor:'#8da2c9',opacity:0.2,borderRadius:20,borderWidth:0.5,borderColor:'#23528b'}}>

<VirtualKeyboard  color ="#f7f9fc"pressMode='string' onPress={(val) => this.changeText(val)} rowStyle = {styles.rowStyle} cellStyle = {styles.cellStyle} style ={{width:'55%',height:'47%'}}/>
</View>
         
          <Mytext></Mytext>
          <Mytext></Mytext>
          <Button  rounded light style ={{paddingHorizontal:50,alignItems:'center',width:'75%'}}>
            <Mytext  style ={{color:'#1c4478',textAlign:"center",width:'100%',fontWeight:'700'}}>LOGIN</Mytext>
          </Button>

        
</View>
 </ImageBackground>

  );
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
  InputItem:{

    backgroundColor:'#23528b',
    width:'80%',
    borderColor:'#23528b',
    opacity:0.5,
    borderRadius:50,
  
   },

   rowStyle:{

    
   },
   cellStyle:{
  
    backgroundColor: '#bac3d4',
    opacity:1,
    borderWidth:1,
    borderColor:'#bac3d4',
    paddingVertical:8,paddingHorizontal:10,
    borderRadius:50,marginHorizontal:7

   },
   number: {
    fontSize: 25,
    textAlign: 'center',
    
}
});




