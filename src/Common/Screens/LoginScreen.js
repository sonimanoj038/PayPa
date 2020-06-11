// @ts-nocheck
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
  View,PermissionsAndroid,
  TouchableOpacity, Modal,
  StatusBar,Image,Easing,
   Animated,ImageBackground,ActivityIndicator,Alert,Dimensions
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Radio,Right,Text, Left,Input,Item ,Button, Toast, Content} from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import Mytext from '../Component/Mytext';
import {pushNotifications} from '../Service/index';
import firebase, { notifications } from "react-native-firebase";
import {onSignIn} from '../../Routing/RoutingScreen'
import { FlatList } from 'react-native-gesture-handler';
const USER_KEY = "true";
const { height } = Dimensions.get('window');
const newBaseUrl = "https://www.markupdesigns.org/paypa/api/"
 export default class LoginScreen extends React.Component {
  
  constructor(props){

    super(props);

this.state ={

type:0,
selected1:true,
selected:false,
loading:false,
mobile:'',
pin:'',
verifyInput:true,
verifyInput2:true,
mydata:[],
errormsg:'',
showToast:false,
Alert_Visibility: false,
msg:'',
token:'',
status:'',
session_id:'',
location:false

}

this.getIsLogin();

}


validateInput = ()=>{
  const {pin }  = this.state ;
  const { mobile }  = this.state ;
  const {type} = this.state;
  const {location} = this.state;

 if(mobile ===""){

toastr.showToast("Enter Cell Number")
return false;
}
else if(mobile.length<10){

  toastr.showToast("Enter  Valid Cell Number")
  return false;
}
else if (pin ==="")
{
  toastr.showToast("Enter Pin Number")
  return false;

}

else
this.setState({loading:true,disabled:false})
return true;
}

getIsLogin(){
  let that = this;
  try {
    AsyncStorage.getItem('USER_KEY').then(function(val){
      console.log("this is value from prefrence", val);
      if(JSON.parse(val)){
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
        });
        that.props.navigation.dispatch(resetAction);
   
      }
    
    });
   } catch (error) {
     console.log("error", error);
     // Error retrieving data
   }
}

getFcmToken = async () => {
  const fcmToken = await firebase.messaging().getToken();
  if (fcmToken) {
 
  await AsyncStorage.setItem('fcmToken',fcmToken)
 this.setState({token:fcmToken})

 
  } else {
   this.showAlert("Failed", "No token received");
  }
 }
componentDidMount = async () => {

 this.getFcmToken()
 await this.GetText()
  // console.log("token",token)
  // this.setState({ token: token })
  
}

GetText = async()=>{
  this.setState({loadiing:true})
  let data = "disclaimer"
    
  await fetch(`${newBaseUrl}getStaticContent?val=${data}`).then((response) => response.json())
        .then((responseJson) => {
         this.setState({loading:false})
          console.log("data" + JSON.stringify(responseJson))
         
         this.setState({status:responseJson.msg})
           
        }).catch((error) => {
          console.error(error);
        });  
   }


  
UserLoginFunction = async() =>{
  
  const {pin }  = this.state ;
  let mobile  = this.state.mobile;
  const {type} = this.state
  const {token} = this.state
  let formdata = new FormData();
  formdata.append("mobile",mobile);
  formdata.append("pin",pin);
  formdata.append("type",type);
  formdata.append("device_id",token);

  if(this.validateInput()){

    await fetch('https://www.markupdesigns.org/paypa/api/login', {
   method: 'POST',
   headers: {
    'Content-Type': 'multipart/form-data',
   },
   body:formdata
  
 }).then((response) => response.json())
       .then((responseJson) => {
   console.log(responseJson)
  this.setState({loading:false,mydata:responseJson})
        if(responseJson.status === 'Success')
         {
          let data = responseJson['data']['id'];
          let Process = responseJson['data']['status']  ;
          let name = responseJson['data']['name'] 
          let mobile = responseJson['data']['mobile'] 
          let type = responseJson['data']['type'] 
          let session_id = responseJson['data']['session_id'] 
          this.setState({session_id:session_id})
          console.warn("login dsts",data,process,name,mobile,type)
          AsyncStorage.setItem('uid', data)
                  AsyncStorage.setItem('name', name)
                  AsyncStorage.setItem('mobile', mobile)
                  AsyncStorage.setItem('type', type)
                  AsyncStorage.setItem('session_id',session_id)
            if(this.state.type ===0 ){ 
              
              if(Process ===0){ 
                this.props.navigation.navigate('Uregister',{
                id:data
                })
              }
                else if(Process ===1){
                  onSignIn()
                 
                  
                  this.props.navigation.navigate('User')
                }
             
              }
 else if (this.state.type ===2){
   let staffdata = responseJson['data']
   let id= responseJson['data'][0]['id'];
   let name = responseJson['data'][0]['name'] 
   let mobile = responseJson['data'][0]['mobile'] 
   let type = responseJson['data'][0]['type'] 
   let pic = responseJson['data'][0]['pic'] 
   let pin = responseJson['data'][0]['pin'] 
   let bid = responseJson['data'][0]['bid'] 
   
   console.warn("login ",data,process,name,mobile,type)
   AsyncStorage.setItem('uid', data)
           AsyncStorage.setItem('name', name)
           AsyncStorage.setItem('mobile', mobile)
           AsyncStorage.setItem('type', type)
           AsyncStorage.setItem('pin', pin)
           AsyncStorage.setItem('pic', pic)
           AsyncStorage.setItem('id', id)
           AsyncStorage.setItem('uid', id)
           AsyncStorage.setItem('bid', bid)
         
                  this.props.navigation.navigate('Staff')
                  onSignIn()

                }
              else{
                let data = responseJson['data']['id'];
                let Process = responseJson['data']['status']  ;
                let name = responseJson['data']['name'] 
                let mobile = responseJson['data']['mobile'] 
                let type = responseJson['data']['type'] 
                
                console.warn("login dsts",data,process,name,mobile,type)
                AsyncStorage.setItem('uid', data)
                        AsyncStorage.setItem('name', name)
                        AsyncStorage.setItem('mobile', mobile)
                        AsyncStorage.setItem('type', type)
                if(Process ===0){
                  this.props.navigation.navigate('Bregister')
               
                }else if(Process ===1){
                  onSignIn()
                  this.props.navigation.navigate('Business')

                }
               
                else
                this.props.navigation.navigate('UploadBusiness',{
                  id:data
              
                  })

              }
           

         }
  else{
    this.Show_Custom_Alert(responseJson.msg);
         }
  
       }).catch((error) => {
         console.error(error);
       });
  
  
   }
  }
 
  
  Show_Custom_Alert(data) {
 
    this.setState({Alert_Visibility: true,msg:data});
    
  }
  ok_Button=()=>{
 
    this.setState({Alert_Visibility: false});
 
  }

  handleOnPress =()=>{
   let msg = "Your  Paypa wallet is credit with R 100 sent from Max";
   let title = "You have recieved R 100 "
    pushNotifications.localNotification(msg ,title);
  };

    render(){
      const {navigate} =this.props.navigation;
  return (
   
      <ImageBackground  source={require('../../img/common/splash.png')}  style={{ 
      flex:1,
      width: null,
      height: null}} >
         <ScrollView>
        <Modal
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          visible={this.state.Alert_Visibility}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } >
            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0.2, 0.7)'}}>
                <View style={styles.Alert_Main_View}>
                <Image source={require('../../img/common/oops.png')} style={{maxHeight:50,resizeMode: 'contain'}} />
                    <Text style={styles.Alert_Title}>Oops..</Text>
                    <Text style={styles.Alert_Message}> {this.state.msg} </Text>
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


     <Text style= {{marginVertical:40}}></Text>
 <Image source={require('../../img/logo/logo-login.png')} style={{maxHeight:170,resizeMode: 'contain',alignSelf:'center'}} />

<View style ={{flexDirection:"row",paddingVertical:20,alignSelf:'center'}}>
<Radio selected={this.state.selected1} style ={{paddingHorizontal:5,fontSize:5}} color="#acafb5" selectedColor	="#a8ada9"
onPress ={()=>this.setState({type:0,selected2:false,selected1:true,selected3:false})}

/>
<Mytext style = {{color:'#edf0ed',paddingVertical:4,fontSize:13}}>User</Mytext>
<Text style={{paddingHorizontal:5}}></Text>
<Radio radioBtnSize={15} selected={this.state.selected2} style ={{paddingHorizontal:5}} radioBtnSize={5} color="#acafb5" selectedColor	="#a8ada9" onPress ={()=>this.setState({type:1,selected1:false,selected3:false,selected2:true})}/>

<Mytext style = {{color:'#edf0ed',paddingVertical:4,fontSize:13}}>Business</Mytext>
<Text style={{paddingHorizontal:5}}></Text>
<Radio radioBtnSize={15} selected={this.state.selected3} style ={{paddingHorizontal:5}} radioBtnSize={5} color="#acafb5" selectedColor	="#a8ada9" onPress ={()=>this.setState({type:2,selected1:false,selected2:false,selected3:true})}/>

<Mytext style = {{color:'#edf0ed',paddingVertical:4,fontSize:13}}>Staff</Mytext>
</View>

<Item  rounded style ={[styles.inputitem,{borderColor:this.state.verifyInput ? "#23528b":"red",alignSelf:'center'}]}   >
<Image source={require('../../img/common/call21.png')} />
            <Input placeholderTextColor="#edf0ed" style = {{color:'#edf0ed',fontFamily: 'Roboto-Light',fontSize:15}}
           onChangeText={mobile => this.setState({mobile})}
           
         
            keyboardType="numeric" placeholder='Enter Cell Number' maxLength={10} />
          </Item>
          <Mytext></Mytext>
          <Item  rounded style ={[styles.inputitem,{borderColor:this.state.verifyInput2 ? "#23528b":"red",alignSelf:'center'}]} >
          <Image source={require('../../img/common/login21.png')} />
            <Input placeholder='Enter Pin' placeholderTextColor="#edf0ed" style={{color:'#edf0ed',fontFamily: 'Roboto-Light',fontSize:15}} 
            
            onChangeText={pin => this.setState({pin})}
             secureTextEntry={true}
            keyboardType="numeric" maxLength={5} />
          </Item>
          
          <Mytext></Mytext>
          <Mytext></Mytext>
          <Button  rounded light style ={{paddingHorizontal:50,alignItems:'center',width:'75%',alignSelf:'center'}} onPress ={this.UserLoginFunction}>
            {this.state.loading?<ActivityIndicator
               animating = {this.state.loading}
               color = '#1c4478'
               size={"large"}
               style ={{paddingHorizontal:50,alignItems:'center',width:'100%'}}
              />:<Mytext  style ={{color:'#1c4478',textAlign:"center",width:'100%',fontWeight:'700',
             }}>LOGIN</Mytext>}
          </Button>
<Mytext>
</Mytext>
<Mytext>
</Mytext>

<View style = {{flexDirection:'row',alignSelf:'center'}}>
  <Mytext style = {{color:'#dce0e6',fontSize:11,paddingVertical:3}}> Don't have an acount?</Mytext>
  <TouchableOpacity onPress ={()=> navigate('Signup',{type:this.state.type,msg:this.state.status,session_id:this.state.session_id})}><Mytext style = {{color:'#dce0e6',fontSize:13,padding:2,paddingHorizontal:3}}>Sign Up Now</Mytext></TouchableOpacity>
</View>
<TouchableOpacity onPress ={()=> navigate('pass',{type:this.state.type,session_id:this.state.session_id})} style={{
  height: 50,
  
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative', //Here is the trick
  bottom: 0,}} >
<Mytext  style = {{color:'#dce0e6',fontSize:11,
  bottom:0,paddingVertical:20}}> Forgot Pin?</Mytext>

</TouchableOpacity>


</ScrollView>
{this.state.status ===""?null:<Text style = {{color:'#e26d0e',fontSize:13,textAlign:'center',alignItems:'center',
  bottom:0,paddingVertical:2}}>
    Disclaimer
    </Text>}
<Mytext  style = {{color:'#edf0ed',fontSize:12,textAlign:'center',alignItems:'center',
  bottom:0,paddingBottom:20}}> {this.state.status}</Mytext>
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
 
  },
  inputitem:{

    backgroundColor:'#23528b',width:'80%',
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


export const toastr = {
  showToast: (message) => {
    Toast.show({
      text: message,
      duration: 2000,
      position: 'bottom',
      textStyle: { textAlign: 'center' },
      
      buttonStyle: { margin:20 ,width:'75$'}
      
    });
  },
};

export const checkSession = (data) => {
  return new Promise((resolve, reject) => {
    let formdata = new FormData();
   
    formdata.append("session_id", data);
  
     fetch('https://www.markupdesigns.org/paypa/api/sessionapi', {
  
      method: 'POST',
      headers: {
       'Content-Type': 'multipart/form-data',
      },
      body: formdata
     
    }).then((response) => response.json())
          .then((responseJson) => {
            console.warn(responseJson)
            if(responseJson.status ==="Failure"){
              AsyncStorage.clear()
              resolve(false);
             
            }
            else{ 
              
              resolve(true);
          }  
          }).catch(err => reject(err));
  });
};

  
