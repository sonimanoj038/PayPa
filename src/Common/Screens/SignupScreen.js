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
  ImageBackground, 
  Alert,ActivityIndicator
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Toast} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Mytext from '../Component/Mytext';

import {toastr} from '../../Common/Screens/LoginScreen'
export default class SignupScreen extends React.Component{

  constructor(props){

    super(props);

this.state ={

type:0,
callNo:null,
callConf:null,
pin:null,
pinConf:null,
pin:'',
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
else if (callNo !== callConf)
{

  toastr.showToast("Call Number Does not Match")
  return false;
}
else if (pin ==="")
{
  toastr.showToast("Enter Pin Number")
  return false

}

else
this.setState({loading:true})
return true;
}



UserSignupFunction = async() =>{
 
  

  const {pin }  = this.state ;
  const { callNo }  = this.state ;
  const type   = this.props.navigation.state.params.type;
  let formdata = new FormData();
  formdata.append("mobile",callNo);
  formdata.append("pin",pin);
  formdata.append("type",type);
if(this.validateInput()){
  await fetch('https://www.markupdesigns.org/paypa/api/registration', {
    method: 'POST',
    headers: {
     'Content-Type': 'multipart/form-data',
    },
    body: formdata
   
  }).then((response) => response.json())
        .then((responseJson) => {
          let data = responseJson['data']['id']
          

console.log("signup Response"+ JSON.stringify(responseJson))
this.setState({loading:false})
          this.props.navigation.navigate('OtpVerifiy',{ msg:responseJson.msg,
            call:this.state.callNo,
            pin:this.state.pin,
            id:data,
            type:this.props.navigation.state.params.type
            })

           
        
   
 
   
        }).catch((error) => {
          console.error(error);
        });
   
   
    }

}
 

  render(){
    const {navigate} =this.props.navigation;

  
  return (
    <ImageBackground  source={require('../../img/common/splash.png')}  style={{ flex: 1,
  
      width: null,
      height: null,}} >
        <ScrollView style={{flex: 1}}>
 <View style = {{alignItems:'center',justifyContent:'center'}}>
    <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
 <Image source={require('../../img/logo/login3x.png')}  style={{maxHeight:200,resizeMode: 'contain'}}/>
   
 


    <Mytext></Mytext>
          
          <Item  rounded style ={styles.InputItem} >
          <Image source={require('../../img/common/call21.png')} />
          <Input placeholderTextColor="#edf0ed" style = {{color:'#edf0ed',fontFamily: 'Roboto-Light',fontSize:15}}
             onChangeText={callNo => this.setState({callNo})}
            keyboardType="numeric" placeholder='Enter Call Number' maxLength={10} />
            
          </Item>

          <Mytext></Mytext>
         
          <Item  rounded style ={styles.InputItem} >
          <Image source={require('../../img/common/call21.png')} />
            <Input placeholder='Enter Call Number' 
            placeholderTextColor="#edf0ed" style = {{color:'#edf0ed',fontFamily: 'Roboto-Light',fontSize:15}}
             onChangeText={callConf => this.setState({callConf})}
            keyboardType="numeric"  maxLength={10}/>
          </Item>
          <Mytext></Mytext>
          <Item  rounded style ={styles.InputItem} >
          <Image source={require('../../img/common/login21.png')} />
            <Input placeholder='Enter Pin' 
            placeholderTextColor="#edf0ed" style = {{color:'#edf0ed',fontFamily: 'Roboto-Light',fontSize:15}}
             onChangeText={pin => this.setState({pin})}
           keyboardType="numeric" secureTextEntry={true} maxLength={5}/>
          </Item>

          <Mytext>
</Mytext>
<Item  rounded style ={styles.InputItem} >
          <Image source={require('../../img/common/login21.png')} />
            <Input placeholder='Enter Pin' 
            placeholderTextColor="#edf0ed" style = {{color:'#edf0ed',fontFamily: 'Roboto-Light',fontSize:15}}
            onChangeText={pinConf => this.setState({pinConf})}
            keyboardType="numeric" secureTextEntry={true} maxLength={5}/>
          </Item>
<Mytext></Mytext>
          <Button  rounded light style ={{paddingHorizontal:50,alignItems:'center',width:'75%'}}
          
          onPress ={this.UserSignupFunction}
        
          >
             {this.state.loading?<ActivityIndicator
               animating = {this.state.loading}
               color = '#1c4478'
               size={"large"}
               style ={{paddingHorizontal:50,alignItems:'center',width:'100%'}}
              />:<Mytext  style ={{color:'#1c4478',textAlign:"center",width:'100%',fontWeight:'700'}}>SIGN UP</Mytext>}
          </Button>
<Mytext>
</Mytext>
<Mytext>
</Mytext>

<View style = {{flexDirection:'row',bottom:10}}>
  <Mytext style = {{color:'#dce0e6',fontSize:11,paddingVertical:2,paddingHorizontal:3}}> Already have an acount?</Mytext>
  <TouchableOpacity onPress ={()=> navigate('Login')} style ={{}}>
      <Mytext style = {{color:'#dce0e6',fontSize:13,}}>Login Now</Mytext></TouchableOpacity>
</View>

 
 </View>
 </ScrollView>
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


 }
});


