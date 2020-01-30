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


import { Container, Radio,Right,Text, Left,Input,Item ,Button, Toast, Content} from 'native-base';

import Mytext from '../Component/Mytext';

import AsyncStorage from '@react-native-community/async-storage';
import RoutingScreen from '../../Routing/RoutingScreen';

const { height } = Dimensions.get('window');
 export default class WelcomeAgain extends React.Component {
  static navigationOptions =({navigation}) =>( {


  })
  
  constructor(props){

    super(props);

this.state ={

type:0,

loading:false,
mobile:'',
pin:'',
userid:'',name:'',
disablepin:true,
WelcomeAgain:true,msg:'',
Alert_Visibility:false
}

}
validateInput = ()=>{
  const {pin }  = this.state ;

 if (pin ==="")
{
  toastr.showToast("Enter  Pin")
  return false;

}else if (pin.lengh <5){
  toastr.showToast("Enter a Valid Pin")
  return false;
}

else
this.setState({loading:true,disabled:false})
return true;
}

handlePinChange(e){
    
         if(e.length === 5 )
        {
        
          // set the state of isEnable to be true to make the button to be enable
          this.setState({disablepin: !this.state.disablepin,pin:e})
        }
      
}
componentDidMount = async() => {
  const uid = await AsyncStorage.getItem('uid')
  const name= await AsyncStorage.getItem('name')
  const mobile = await AsyncStorage.getItem('mobile')
  const type = await AsyncStorage.getItem('type')

this.setState({userid:uid,name:name,mobile:mobile,type:type})
  
 }
UserLoginAgain = async() =>{

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
       
  this.setState({loading:false,mydata:responseJson})
  if(responseJson.status === 'Success')
  {
  
   let data = responseJson['data']['id']
   let Process = responseJson['data']['status']  
   let type = responseJson['data']['type']   
      
     if(type ==='0' ){ 
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
    

  } else{
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
  

    render(){
      const {navigate} =this.props.navigation;
  return (
   
    <ImageBackground  source={require('../../img/common/splash.png')} 
     style={{  
      flex:1,
      width: null,
      height: null,alignItems:'center'}} >
     <Text></Text>
     <Modal
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          visible={this.state.Alert_Visibility}
          transparent={true}
 
          animationType={"fade"}
 
          onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } >
 
 
            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0.2, 0.7)'}}>
 
 
                <View style={styles.Alert_Main_View}>
 
 
                    <Text style={styles.Alert_Title}>Opps..!</Text>
 
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
 <Image source={require('../../img/logo/logo-login.png')} style={{maxHeight:150,resizeMode: 'contain',marginTop:20}} />
     <View  elevation={5} style = {styles.body}>
     <Text style={{color:'grey',fontFamily: 'Roboto-Midium',fontSize:12}}>Hello Again</Text>
<Text style={{fontFamily: 'Roboto-Midium',fontSize:18,padding:5}}>{this.state.name}</Text>
 <Item  rounded style ={styles.inputitem} >
     <Image source={require('../../img/common/login-password2.png')} />
     <Input placeholder='Enter 5 digit Pin' placeholderTextColor="#133b6c" style={{color:'#133b6c',fontFamily: 'Roboto-Light',fontSize:12}} 
            onChangeText={(pin)=>this.handlePinChange(pin)}
             secureTextEntry={true}
            keyboardType="numeric" maxLength={5} />
          </Item>

          <Mytext></Mytext>


          <Button rounded  style ={{paddingHorizontal:50,alignItems:'center',width:'60%',backgroundColor:'#1c4478'}} onPress ={this.UserLoginAgain}>
            {this.state.loading?<ActivityIndicator
               animating = {this.state.loading}
               color = 'white'
               size={"large"}
               style ={{paddingHorizontal:50,alignItems:'center',width:'100%'}}
              />:<Mytext  style ={{color:'white',textAlign:"center",width:'100%',fontWeight:'700',
             }}>LOGIN</Mytext>}
          </Button>
<TouchableOpacity onPress ={()=> navigate('pass',{type:this.state.type})}>

<Text style={{color:'#e46c0b',fontFamily: 'Roboto-Light',fontSize:14,padding:5}}>Forgot Your Pin?</Text>
</TouchableOpacity>
          

         
     </View >
      <View elevation={2} style ={{ backgroundColor:'white',width:'55%',opacity:0.3,borderRadius:50,height:50,marginTop:-30
    ,borderColor:'#e46c0b'}}>


      </View>
         


</ImageBackground>

  );
}
};

const styles = StyleSheet.create({
 
  body: {
    alignContent:'center',alignItems:'center',
    marginTop:50,backgroundColor:'#ffffff',padding:30,borderRadius:20
 
  },
  inputitem:{

    backgroundColor:'white',width:'65%',
    borderColor:'#e46c0b'
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
