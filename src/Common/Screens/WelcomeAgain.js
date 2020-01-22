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



const { height } = Dimensions.get('window');
 export default class WelcomeAgain extends React.Component {
  
  constructor(props){

    super(props);

this.state ={

type:0,

loading:false,
mobile:'',
pin:'',
disablepin:true,
WelcomeAgain:true
}

}

handlePinChange(e){
    
         if(e.length === 5 )
        {
        
          // set the state of isEnable to be true to make the button to be enable
          this.setState({disablepin: !this.state.disablepin,pin:e})
        }
      
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
       
            if(this.state.type ===0){ this.props.navigation.navigate('Uregister')
          
        
          }else{this.props.navigation.navigate('Bregister')}
            
  
         }
         else{
  
          this.Show_Custom_Alert();
         }
  
       }).catch((error) => {
         console.error(error);
       });
  
  
   }
  }
 
  
  

    render(){
      const {navigate} =this.props.navigation;
  return (
   
    <ImageBackground  source={require('../../img/common/splash.png')} 
     style={{  
      flex:1,
      width: null,
      height: null,alignItems:'center'}} >
        
 <Image source={require('../../img/logo/login3x.png')} style={{maxHeight:170,resizeMode: 'contain',marginTop:20}} />
     <View  elevation={5} style = {styles.body}>
     <Text style={{color:'grey',fontFamily: 'Roboto-Midium',fontSize:12}}>Hello Again</Text>
<Text style={{fontFamily: 'Roboto-Midium',fontSize:18,padding:5}}>Richard Alen</Text>
 <Item  rounded style ={styles.inputitem} >
     <Image source={require('../../img/common/login-password2.png')} />
     <Input placeholder='Enter 5 digit Pin' placeholderTextColor="#133b6c" style={{color:'#133b6c',fontFamily: 'Roboto-Light',fontSize:12}} 
            onChangeText={(pin)=>this.handlePinChange(pin)}
             secureTextEntry={true}
            keyboardType="numeric" maxLength={5} />
          </Item>

          <Mytext></Mytext>


          <Button  disabled={!this.state.disablepin } rounded  style ={{paddingHorizontal:50,alignItems:'center',width:'60%',backgroundColor:'#1c4478'}} onPress ={this.UserLoginFunction}>
            {this.state.loading?<ActivityIndicator
               animating = {this.state.loading}
               color = '#1c4478'
               size={"large"}
               style ={{paddingHorizontal:50,alignItems:'center',width:'100%'}}
              />:<Mytext  style ={{color:'white',textAlign:"center",width:'100%',fontWeight:'700',
              opacity: this.state.disablepin  ? 1  : 0.7}}>LOGIN</Mytext>}
          </Button>

          <Text style={{color:'#e46c0b',fontFamily: 'Roboto-Light',fontSize:14,padding:5}}>Forgot Your Pin?</Text>

         
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
