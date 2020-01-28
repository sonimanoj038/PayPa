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




export default class ChangePassword extends React.Component {
   

    

  constructor(props){

      super(props);
 
  this.state ={

term:false,
callNo:''
  }
}
  render(){
    const {navigate} =this.props.navigation;
  return (
    <ImageBackground  source={require('../../img/common/splash.png')}  style={{ flex: 1,
      justifyContent: "center",
      width: null,
      height: null,}} >
 <View style ={{ 
      alignItems: 'center',}}>

<Image source={require('../../img/logo/login3x.png')} style={{maxHeight:200,resizeMode: 'contain'}} />




<Mytext></Mytext><Mytext></Mytext>
<Item  rounded style ={styles.InputItem} >
<Image source={require('../../img/common/call21.png')} />
<Input placeholderTextColor="#edf0ed" style = {{color:'#edf0ed',fontFamily: 'Roboto-Light',fontSize:15}}
            onChangeText={mobile => this.setState({mobile})}
            keyboardType="numeric" placeholder='Enter Call Number' maxLength={10} />
          </Item>
          <Mytext></Mytext>
          
          <Mytext></Mytext>
          <Button  rounded light style ={{paddingHorizontal:50,alignItems:'center',width:'75%'}} onPress ={()=> navigate('OtpVerifiy',{
            call:this.state.callNo,
           
            id:'1',
            type:this.props.navigation.state.params.type
            })}>
            <Mytext  style ={{color:'#1c4478',textAlign:"center",width:'100%',fontWeight:'700'}}>Submit</Mytext>
          </Button>

          <View style = {{flexDirection:'row',width: '100%',

  
justifyContent:'center',paddingVertical:30,
  alignItems: 'center',
  //Here is the trick
 }}>
  <Mytext style = {{color:'#dce0e6',fontSize:11,paddingVertical:2,paddingHorizontal:3}}> Already have an acount?</Mytext>
  <TouchableOpacity onPress ={()=> this.props.navigation.navigate('Login')}>
      <Mytext style = {{color:'#dce0e6',fontSize:13}}>Login Now</Mytext></TouchableOpacity>
</View>
<Mytext>
</Mytext>
<Mytext>
</Mytext>


  

</View>
 </ImageBackground>

  );
}
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




