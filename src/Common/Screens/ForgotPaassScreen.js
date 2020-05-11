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
  ImageBackground ,Animated,ActivityIndicator
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
import {toastr} from '../../Common/Screens/LoginScreen'



export default class ChangePassword extends React.Component {
   

    

  constructor(props){

      super(props);
 
  this.state ={

term:false,
callNo:'',
loading:false
  }
}
validateInput = ()=>{
  const {pin }  = this.state ;
  const { callNo }  = this.state ;
  const {pinConf }  = this.state ;
  const { callConf }  = this.state ;
  const {type} = this.state;
if(callNo ===null){

toastr.showToast("Enter Call Number")
return false
}
else if(callNo.length<10){

  toastr.showToast("Enter  Valid Call Number")
  return false
}

else
this.setState({loading:true})
return true;
}
ForgotPass = async() =>{
  let callNo   =  this.state.callNo ;
  const type   = this.props.navigation.state.params.type;
  let formdata = new FormData();
  formdata.append("mobile",callNo);
 
  formdata.append("type",type);
if(this.validateInput()){
  await fetch('https://www.markupdesigns.org/paypa/api/forgotPassword', {
    method: 'POST',
    headers: {
     'Content-Type': 'multipart/form-data',
    },
    body: formdata
   
  }).then((response) => response.json())
        .then((responseJson) => {
        
this.setState({loading:false})
if(responseJson.status ==="Success"){
          this.props.navigation.navigate('ForgotPin',{ msg:responseJson.msg,
            call:this.state.callNo,
            pin:this.state.pin,
            id:responseJson.uid,
            type:this.props.navigation.state.params.type
            })

          }
        
   
 
   
        }).catch((error) => {
          console.error(error);
        });
   
   
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

<Image source={require('../../img/logo/logo-login.png')} style={{maxHeight:150,resizeMode: 'contain'}} />




<Mytext></Mytext><Mytext></Mytext>
<Item  rounded style ={styles.InputItem} >
<Image source={require('../../img/common/call21.png')} />
<Input placeholderTextColor="#edf0ed" style = {{color:'#edf0ed',fontFamily: 'Roboto-Light',fontSize:15}}
            onChangeText={callNo => this.setState({callNo})}
            keyboardType="numeric" placeholder='Enter Call Number' maxLength={10} />
          </Item>
          <Mytext></Mytext>
          
          <Mytext></Mytext>
          <Button  rounded light style ={{paddingHorizontal:50,alignItems:'center',width:'75%'}} onPress ={this.ForgotPass }>
          {this.state.loading?<ActivityIndicator
               animating = {this.state.loading}
               color = '#1c4478'
               
               size={"large"}
               style ={{paddingHorizontal:50,alignItems:'center',width:'100%'}}
              />:  <Mytext  style ={{color:'#1c4478',textAlign:"center",width:'100%',fontWeight:'700'}}>Submit</Mytext>}
          
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




