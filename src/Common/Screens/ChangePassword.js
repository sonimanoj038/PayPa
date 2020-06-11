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
  TouchableWithoutFeedback,ActivityIndicator
} from 'react-native';

import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Header,Body,Title, Content,CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Mytext from '../Component/Mytext';
import {toastr} from '../../Common/Screens/LoginScreen'


export default class BChangePin extends React.Component {
    constructor(props){
        super(props);
    this.state ={
term:false,
otp:'',
newPin:'',
confirmPin:'',
userid:'',
loading:false,
session_id:''
    }
}

validateInput = ()=>{
  const {otp }  = this.state ;
  const {newPin }  = this.state ;
  const {confirmPin }  = this.state ;
 
if(otp ===""){

toastr.showToast("Enter OTP")
return false
}
else if(newPin ===""){

  toastr.showToast("Enter  New Pin")
  return false
}
else if (newPin !== confirmPin)
{

  toastr.showToast("Pin Does not Match")
  return false;
}
else
this.setState({loading:true})
return true;
}

 ChangePass = async() =>{
  const { otp }  = this.state ;
  const userid   = this.props.navigation.state.params.id ;
  const { newPin }  = this.state ;
  let formdata = new FormData();
  formdata.append("otp",otp);
  formdata.append("npin",newPin);
  formdata.append("uid",userid);
  formdata.append("session_id", this.props.navigation.state.params.session_id);
if(this.validateInput()){
  await fetch('https://www.markupdesigns.org/paypa/api/changePin', {
    method: 'POST',
    headers: {
     'Content-Type': 'multipart/form-data',
    },
    body: formdata
  }).then((response) => response.json())
        .then((responseJson) => {    
this.setState({loading:false})
if(responseJson.status ==="Success"){
          this.props.navigation.navigate('Login')
          } 
   else{
    alert(responseJson.msg)
   }
        }).catch((error) => {
          console.error(error);
        });
    }
}

    render(){
  return (
   
 <Container style = {{flex:1,backgroundColor:'#e8edf1'}}>
    <Header  style={{backgroundColor:'#1c4478'}}> 
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
          <Left>
          <Icon name='md-arrow-back'  style={{color:'white',fontSize:25,paddingLeft:10}} onPress = {()=>  this.props.navigation.goBack()}/>
          </Left>
          <Body  >
          <Title >Change Pin</Title>
          </Body>
         
        </Header>
 <Content  >
<Text></Text>
<Item  regular style ={styles.InputItem} >

     <Input placeholder='Enter OTP'
      placeholderTextColor="#797b7d" style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}}
      secureTextEntry={true}
      keyboardType="numeric" maxLength={6}
      onChangeText={(otp)=>this.setState({otp})}
      
      />
          </Item>
          <Mytext></Mytext>
          <Item  regular style ={styles.InputItem} >

<Input placeholder='New Pin' placeholderTextColor="#797b7d" 

secureTextEntry={true}
keyboardType="numeric" maxLength={5}
onChangeText={(newPin)=>this.setState({newPin})}
style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}} />
     </Item>

     <Mytext></Mytext>
    
          <Item  regular style ={styles.InputItem} >

   

<Input placeholder='Confirm Pin' placeholderTextColor="#797b7d" 
 secureTextEntry={true}
 keyboardType="numeric" maxLength={5}
 onChangeText={(confirmPin)=>this.setState({confirmPin})}
style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}} />
     </Item>
         

</Content>
<Footer style = {{color:'#dce0e6',
  backgroundColor:'#e46c0b'}}>
<TouchableWithoutFeedback onPress= {this.ChangePass}>
{this.state.loading?<ActivityIndicator
               animating = {this.state.loading}
               color = 'white'
               
               size={"large"}
               style ={{paddingHorizontal:50,alignItems:'center',width:'100%'}}
              />:<Text style = {{color:'white',fontFamily:'Roborto ',fontSize:18,fontWeight:'800',padding:15}}>SUBMIT</Text>}
          
            </TouchableWithoutFeedback>
          </Footer>
 </Container>

  );
};
}
const styles = StyleSheet.create({
 
  body: {
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    fontSize:18,
  },
 InputItem:{

  backgroundColor:'white',
  width:'90%',
  borderColor:'white',
alignSelf:'center',
borderRadius:8
 }
});


