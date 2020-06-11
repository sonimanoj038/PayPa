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
  Modal,
  View,Keyboard,
 ActivityIndicator,
  ImageBackground ,TouchableOpacity ,TouchableWithoutFeedback,Image
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
import AsyncStorage from '@react-native-community/async-storage';
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
  loading:false,
  loadingResend:false,
  Alert_Visibility:false,
  error:false,
  msg:'',
 
  }
  
  }
  changeText(newText) {
    this.setState({otp: newText});
    
}

verifyOtp = async()=>{
  this.setState({loading:true})
  const {otp }  = this.state ;
  let id = this.props.navigation.state.params.id;
  let formdata = new FormData();
  formdata.append("otp",otp);
  formdata.append("id",id);

  await fetch('https://www.markupdesigns.org/paypa/api/verifyOTP', {
    method: 'POST',
    headers: {
     'Content-Type': 'multipart/form-data',
    },
    body: formdata
   
  }).then((response) => response.json())
        .then((responseJson) => {
         
          console.log("OTP repsonse " + JSON.stringify(responseJson))
          this.setState({loading:false})
          if(responseJson.status ==="Failure"){
            this.setState({msg:responseJson.msg,error:true,Alert_Visibility:true})
          }
          else{
            this.setState({msg:responseJson.msg,Alert_Visibility:true,error:false})
         
        }
             

            }).catch((error) => {
          console.error(error);
        });
    }
    
    ok_Button=()=>{
 if(this.state.error){
  this.setState({Alert_Visibility: false})
 }
 else
 {
  this.props.navigation.navigate('Login')
 }
     
     
   
    }
    closeActivityIndicator = () => setTimeout(() => this.setState({
      loadingResend: false }), 3000)



    ResendOtp = async() =>{
 this.setState({loadingResend:true})
  this.closeActivityIndicator();
      let id = this.props.navigation.state.params.id;
      let call= this.props.navigation.state.params.call;
      let pin = this.props.navigation.state.params.pin;
      let type = this.props.navigation.state.params.type;
      let formdata = new FormData();
      formdata.append("mobile",call);
      formdata.append("pin",pin);
      formdata.append("type",type);
      formdata.append("type",id);
    
      await fetch('https://www.markupdesigns.org/paypa/api/registration', {
        method: 'POST',
        headers: {
         'Content-Type': 'multipart/form-data',
        },
        body: formdata
       
      }).then((response) => response.json())
            .then((responseJson) => {
    console.log("OTP repsonse " + JSON.stringify(responseJson))
            
    let data = responseJson['data']['id']
    let name = responseJson['data']['name'] 
    let mobile = responseJson['data']['mobile'] 
    let type =  JSON.stringify(this.props.navigation.state.params.type)
   
    if(responseJson.status === 'Success')
    {
    AsyncStorage.setItem('uid', data)
    AsyncStorage.setItem('name', name)
    AsyncStorage.setItem('mobile', mobile)
    AsyncStorage.setItem('type', type)
    }
            }).catch((error) => {
              console.error(error);
            });
      
    }


  render(){
   
  return (
    <ImageBackground  source={require('../../img/common/splash.png')}  style={{ flex: 1,
      justifyContent: "center",
      width: null,
      height: null,}} >
        <Modal
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          visible={this.state.Alert_Visibility}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } >
            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0.2, 0.7)'}}>
                <View style={styles.Alert_Main_View}>
                {this.state.error?<Image source={require('../../img/common/oops.png')} style={{maxHeight:50,resizeMode: 'contain'}} />:
                <Image source={require('../../img/common/sucess.png')} style={{maxHeight:50,resizeMode: 'contain'}} />}
                 {this.state.error? <Text style={styles.Alert_Title}>Oops..</Text>: <Text style={styles.Alert_Title}>Success</Text>}  
                 {this.state.error? <Text style={styles.Alert_Message}> {this.state.msg} </Text>:<Text style={styles.Alert_Message}> Signed Up Successfully </Text>}
                  </View>
                <View style={{flexDirection: 'row',height:'10%',width:'70%'}}>
 <TouchableOpacity 
     style={styles.buttonStyle} 
     onPress={this.ok_Button} 
     activeOpacity={0.7} 
     >
     <Text style={styles.TextStyle}> OK</Text>
 </TouchableOpacity>
         </View>
            </View>
        </ Modal >

 <View style ={{ 
      alignItems: 'center'}}>

  <Text style = {{color:'white',fontSize:20,fontFamily: 'Roboto-Light'}}> Verify Your Number !</Text>
  <Text style = {{color:'white',fontSize:15,fontFamily: 'Roboto-Light'}}> We have sent an OTP on </Text>
  <Text style = {{color:'white',fontSize:15,fontFamily: 'Roboto-Light'}}>  {this.props.navigation.state.params.call}</Text>
<Mytext></Mytext>
<View  >

<Item style ={[styles.InputItem,{borderColor:"#23528b"}]}>
<Text style ={{color:'transparent',textAlign:'center',alignItems:'center',alignSelf:'center',left:20}}>_  _  _ _</Text>
 <Input placeholderTextColor="#d5d7db" style = {{color:'#d5d7db',fontFamily: 'Roboto-Medium',fontSize:25,alignItems:'center',left:28}}
 value={this.state.otp}
 secureTextEntry={true}
 editable={false}
 placeholder="- - - - - -"
   keyboardType="numeric"  maxLength={6} />
    
</Item>
       
         
</View>

         
      {/* <Text style={{color:'white',padding:10,textAlign:'center',fontSize:20,fontWeight:'800'}}>{this.state.otp?this.state.otp:'_ _ _ _ _ _'}</Text> */}
          
          <Mytext></Mytext>

<TouchableOpacity onPress = {this.ResendOtp}>
{this.state.loadingResend?<ActivityIndicator
               animating = {this.state.loadingResend}
               color = 'white'
               size={"small"}
               style ={{paddingHorizontal:50,alignItems:'center',width:'100%'}}
              />:
          <Text style = {{color:'white',fontSize:14,fontFamily: 'Roboto-Light'}}> RESEND OTP?</Text>}
          </TouchableOpacity>
          <Mytext></Mytext>
         
<View  style = {{padding:10,backgroundColor:'#8da2c9',opacity:0.3,borderRadius:20,borderWidth:0.5,borderColor:'#23528b'}}>

<VirtualKeyboard  color ="#f7f9fc"pressMode='string' onPress={(val) => this.changeText(val)} rowStyle = {styles.rowStyle} cellStyle = {styles.cellStyle} style ={{width:'55%',height:'47%'}}/>
</View>
         
          <Mytext></Mytext>
          <Mytext></Mytext>
          <Button  rounded light style ={{paddingHorizontal:50,alignItems:'center',width:'75%'}} onPress = {this.verifyOtp}>
          {this.state.loading?<ActivityIndicator
               animating = {this.state.loading}
               color = '#1c4478'
               size={"large"}
               style ={{paddingHorizontal:50,alignItems:'center',width:'100%'}}
              />:<Mytext  style ={{color:'#1c4478',textAlign:"center",width:'100%',fontWeight:'700'}}>VERIFY</Mytext>}
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
alignSelf:'center',
    backgroundColor:'#23528b',
    width:'50%',
    borderColor:'#23528b',
    opacity:0.9,
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
    
},
Alert_Main_View:{
 
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor : "white",
   
  height: 200 ,
  width: '70%',
  borderWidth: 1,
  borderColor: '#1c4478',
  borderRadius:7,
  
 
},
 
Alert_Title:{
 
  fontSize: 25, 
  color: "black",
  textAlign: 'center',
  padding: 5,
  height: '28%',
  fontFamily:'Roboto-Medium'
 
},
 
Alert_Message:{
 
    fontSize: 18, 
    color: "black",
    textAlign: 'center',
    padding: 10,
    height: '42%',
    fontFamily:'Roboto-Light'
  },
 
buttonStyle: {
    
  width:'100%',
  backgroundColor:'#1c4478',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
 marginVertical:5,
 
 
  borderRadius:7,
},
   
TextStyle:{
    color:'white',
    textAlign:'center',
    fontSize: 23,
    marginTop: -5, fontFamily:'Roboto-Medium'
    
},

});




