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
  View,
  TouchableOpacity, Modal,
  StatusBar,Image,Easing,
   Animated,ImageBackground,ActivityIndicator,Alert,Dimensions
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { Container, Radio,Right,Text, Left,Input,Item ,Button, Toast, Content} from 'native-base';

import Mytext from '../Component/Mytext';



const { height } = Dimensions.get('window');
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
msg:'here is my alert',
disabledMobile:false,
disablepin:false,
isDisable:true
}
this.handleMobileChange= this.handleMobileChange.bind(this)
}

handleMobileChange(e){

  
         if(e.length ===10 )
        {
          // set the state of isEnable to be true to make the button to be enable
          this.setState({disabledMobile : !this.state.disabledMobile,mobile:e,})
        }
}

handlePinChange(e){
    
         if(e.length === 5 )
        {
        
          // set the state of isEnable to be true to make the button to be enable
          this.setState({disablepin: !this.state.disablepin,pin:e})
        }
      
}
validateInput = ()=>{
  const {pin }  = this.state ;
  const { mobile }  = this.state ;
  const {type} = this.state;
if(mobile ===""){

toastr.showToast("Enter Call Number")
return false;
}
else if(mobile.length<10){

  toastr.showToast("Enter  Valid Call Number")
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
UserLoginFunction = async() =>{
  
  const {pin }  = this.state ;
  const { mobile }  = this.state ;
  const {type} = this.state
  let formdata = new FormData();
  formdata.append("mobile",mobile);
  formdata.append("pin",pin);
  formdata.append("type",type);

  if(this.validateInput()){

    await fetch('https://www.markupdesigns.org/paypa/api/login', {
   method: 'POST',
   headers: {
    'Content-Type': 'multipart/form-data',
   },
   body:formdata
  
 }).then((response) => response.json())
       .then((responseJson) => {
      console.log("dataaa" + JSON.stringify(responseJson))  
  this.setState({loading:false,mydata:responseJson})

        if(responseJson.status === 'Success')
         {
          let data = responseJson['data']['id']  
          let Process = responseJson['data']['status']  
          AsyncStorage.setItem('uid', data)

            if(this.state.type ===0 ){ 
              if(Process ===0){ this.props.navigation.navigate('Uregister',{
                id:data
            
                })}
                else if(Process ===1){
                  this.props.navigation.navigate('User')
                }
             
              }

              else{

                if(Process ===0){
                  this.props.navigation.navigate('Bregister')
                }else if(Process ===1){
                  this.props.navigation.navigate('Business')

                }
                else
                this.props.navigation.navigate('UploadBusiness',{
                  id:data
              
                  })

              }
           

         }
  else{
        alert(responseJson.msg);
         }
  
       }).catch((error) => {
         console.error(error);
       });
  
  
   }
  }
 
  
  Show_Custom_Alert(visible) {
 
    this.setState({Alert_Visibility: visible});
    
  }
  ok_Button=()=>{
 
    this.setState({Alert_Visibility: false});
 
  }

    render(){
      const {navigate} =this.props.navigation;
  return (
   
    <ImageBackground  source={require('../../img/common/splash.png')}  style={{ 
      
     
      flex:1,
    
      width: null,
      height: null}} >
        
        <Modal
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          visible={this.state.Alert_Visibility}
          transparent={true}
 
          animationType={"fade"}
 
          onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } >
 
 
            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0.2, 0.7)'}}>
 
 
                <View style={styles.Alert_Main_View}>
 
 
                    <Text style={styles.Alert_Title}>Opps..!</Text>
 
                    <Text style={styles.Alert_Message}> {this.state.mydata.msg} </Text>
                  
                  
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

        
 <ScrollView style={{flex: 1}}>
   <View style={{ justifyContent:'center',alignItems:'center'}}>
 <Image source={require('../../img/logo/splash_logo3x.png')} style={{maxHeight:150,resizeMode: 'contain'}} />

<View style ={{flexDirection:"row",paddingVertical:20}}>
<Radio selected={this.state.selected1} style ={{paddingHorizontal:5,fontSize:5}} color="#acafb5" selectedColor	="#a8ada9"
onPress ={()=>this.setState({type:0,selected2:false,selected1:true})}

/>
<Mytext style = {{color:'#edf0ed',paddingVertical:4,fontSize:13}}>User</Mytext>
<Text style={{paddingHorizontal:5}}></Text>
<Radio radioBtnSize={15} selected={this.state.selected2} style ={{paddingHorizontal:5}} radioBtnSize={5} color="#acafb5" selectedColor	="#a8ada9" onPress ={()=>this.setState({type:1,selected1:false,selected2:true})}/>

<Mytext style = {{color:'#edf0ed',paddingVertical:4,fontSize:13}}>Business</Mytext>

</View>

<Item  rounded style ={[styles.inputitem,{borderColor:this.state.verifyInput ? "#23528b":"red"}]}   >
<Image source={require('../../img/common/call21.png')} />
            <Input placeholderTextColor="#edf0ed" style = {{color:'#edf0ed',fontFamily: 'Roboto-Light',fontSize:15}}
           onChangeText={(mobile)=>this.handleMobileChange(mobile)}
           
           onChange ={()=>this.handleMobileChange.bind(this)}
            keyboardType="numeric" placeholder='Enter Call Number' maxLength={10} />
          </Item>
          <Mytext></Mytext>
          <Item  rounded style ={[styles.inputitem,{borderColor:this.state.verifyInput2 ? "#23528b":"red"}]} >
          <Image source={require('../../img/common/login21.png')} />
            <Input placeholder='Enter Pin' placeholderTextColor="#edf0ed" style={{color:'#edf0ed',fontFamily: 'Roboto-Light',fontSize:15}} 
            
            onChangeText={(pin)=>this.handlePinChange(pin)}
             secureTextEntry={true}
            keyboardType="numeric" maxLength={5} />
          </Item>
          
          <Mytext></Mytext>
          <Mytext></Mytext>
          <Button  disabled={!this.state.disablepin && !this.state.disabledMobile} rounded light style ={{paddingHorizontal:50,alignItems:'center',width:'75%',}} onPress ={this.UserLoginFunction}>
            {this.state.loading?<ActivityIndicator
               animating = {this.state.loading}
               color = '#1c4478'
               size={"large"}
               style ={{paddingHorizontal:50,alignItems:'center',width:'100%'}}
              />:<Mytext  style ={{color:'#1c4478',textAlign:"center",width:'100%',fontWeight:'700',
              opacity: this.state.disablepin && this.state.disabledMobile ? 1  : 0.7}}>LOGIN</Mytext>}
          </Button>
<Mytext>
</Mytext>
<Mytext>
</Mytext>

<View style = {{flexDirection:'row'}}>
  <Mytext style = {{color:'#dce0e6',fontSize:11,paddingVertical:3}}> Don't have an acount?</Mytext>
  <TouchableOpacity onPress ={()=> navigate('Signup',{type:this.state.type})}><Mytext style = {{color:'#dce0e6',fontSize:13,padding:2,paddingHorizontal:3}}>Sign Up Now</Mytext></TouchableOpacity>
</View>
<TouchableOpacity onPress ={()=> navigate('pass',{type:this.state.type})} style={{
  height: 50,
  
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative', //Here is the trick
  bottom: 0,}} >
<Mytext  style = {{color:'#dce0e6',fontSize:11,
  bottom:0,paddingVertical:20}}> Forgot Pin?</Mytext>

</TouchableOpacity>

</View>    
</ScrollView>

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
    padding: 10,
    height: '28%',
    fontFamily:'Roboto-Medium'
   
  },
   
  Alert_Message:{
   
      fontSize: 22, 
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
      buttonText: 'Okay',
    });
  },
};
