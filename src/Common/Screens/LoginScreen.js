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
  TouchableOpacity,
  StatusBar,Image,Easing,
   Animated,ImageBackground,ActivityIndicator,Alert,Dimensions
} from 'react-native';


import { Container, Radio,Right,Text, Left,Input,Item ,Button, Toast, Content} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
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
showToast:false
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
this.setState({loading:true})
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
  this.setState({loading:false,mydata:responseJson})
       
        if(responseJson.status === 'Success')
         {
       
             //Then open Profile activity and send user email to profile activity.
             this.props.navigation.navigate('timeline',{mydata:this.state.mydata.data.id});
  
         }
         else{
  
          Toast.show({
            text: this.state.mydata.msg,
            buttonText: "Okay",
            duration: 1000
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
   
    <ImageBackground  source={require('../../img/common/splash.png')}  style={{ flex:1,
    
      width: null,
      height: null}} >
 <ScrollView style={{flex: 1}}>
   <View style={{ justifyContent:'center',alignItems:'center'}}>
 <Image source={require('../../img/logo/login3x.png')} style={{maxHeight:200,resizeMode: 'contain'}} />

<View style ={{flexDirection:"row",paddingVertical:20}}>
<Radio selected={this.state.selected1} style ={{paddingHorizontal:5,fontSize:5}} color="#acafb5" selectedColor	="#a8ada9"
onPress ={()=>this.setState({type:0,selected2:!this.state.selected2,selected1:true})}

/>
<Mytext style = {{color:'#a8ada9',paddingVertical:4}}>User</Mytext>
   
<Radio selected={this.state.selected2} style ={{paddingHorizontal:5,fontSize:5}} color="#acafb5" selectedColor	="#a8ada9" onPress ={()=>this.setState({type:1,selected1:!this.state.selected1,selected2:true})}/>
<Mytext style = {{color:'#a8ada9',paddingVertical:4}}>Business</Mytext>

</View>

<Item  rounded style ={[styles.inputitem,{borderColor:this.state.verifyInput ? "#23528b":"red"}]}   >
<Image source={require('../../img/common/call21.png')} />
            <Input placeholderTextColor="#a8ada9" style = {{color:'#a8ada9'}}
            onChangeText={mobile => this.setState({mobile})}
            keyboardType="numeric" placeholder='Enter Call Number' maxLength={10} />
          </Item>
          <Mytext></Mytext>
          <Item  rounded style ={[styles.inputitem,{borderColor:this.state.verifyInput2 ? "#23528b":"red"}]} >
          <Image source={require('../../img/common/login21.png')} />
            <Input placeholder='Enter Pin' placeholderTextColor="#a8ada9" style={{color:'#a8ada9'}} 
             onChangeText={pin => this.setState({pin})}
             secureTextEntry={true}
            keyboardType="numeric" maxLength={5} />
          </Item>
          
          <Mytext></Mytext>
          <Mytext></Mytext>
          <Button  rounded light style ={{paddingHorizontal:50,alignItems:'center',width:'75%'}} onPress ={this.UserLoginFunction}>
            {this.state.loading?<ActivityIndicator
               animating = {this.state.loading}
               color = '#1c4478'
               size={"large"}
               style ={{paddingHorizontal:50,alignItems:'center',width:'100%'}}
              />:<Mytext  style ={{color:'#1c4478',textAlign:"center",width:'100%',fontWeight:'700'}}>LOGIN</Mytext>}
          </Button>
<Mytext>
</Mytext>
<Mytext>
</Mytext>

<View style = {{flexDirection:'row'}}>
  <Mytext style = {{color:'#dce0e6',fontSize:11,paddingVertical:3}}> Don't have an acount?</Mytext>
  <TouchableOpacity onPress ={()=> navigate('Signup')}><Mytext style = {{color:'#dce0e6',fontSize:13,padding:2,paddingHorizontal:3}}>Sign Up Now</Mytext></TouchableOpacity>
</View>
<TouchableOpacity onPress ={()=> navigate('pass')} style={{width: '100%',
  height: 50,
  
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative', //Here is the trick
  bottom: 0,}} >
<Mytext  style = {{color:'#dce0e6',fontSize:11,
  bottom:0,paddingVertical:20}}> Forgot Password?</Mytext>

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
  }
 
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
