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
  TouchableWithoutFeedback,Modal,ActivityIndicator
} from 'react-native';


import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Header,Body,Title, Content,CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Mytext from '../Component/Mytext';
import AsyncStorage from '@react-native-community/async-storage';
import {toastr} from '../../Common/Screens/LoginScreen';


export default class ChangePin extends React.Component {
   

    

  constructor(props){

    super(props);

this.state ={

term:false,
oldPin:'',
newPin:'',
confirmPin:'',
uid:'',
loading:false,
Alert_Visibility:false,
msg:''
}
}

validateInput = ()=>{
const {oldPin }  = this.state ;
const {newPin }  = this.state ;
const {confirmPin }  = this.state ;

if(oldPin ===""){

toastr.showToast("Enter Old Pin")
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


const { oldPin }  = this.state ;
const { uid }  = this.state ;

const { newPin }  = this.state ;
let formdata = new FormData();
formdata.append("opin",oldPin);
formdata.append("npin",newPin);
formdata.append("uid",uid);
if(this.validateInput()){
await fetch('https://www.markupdesigns.org/paypa/api/changePinSetting', {
method: 'POST',
headers: {
 'Content-Type': 'multipart/form-data',
},
body: formdata

}).then((response) => response.json())
    .then((responseJson) => {
    
this.setState({loading:false})
if(responseJson.status ==="Success"){
  this.Show_Custom_Alert(responseJson.msg);

      }
    
else{

alert(responseJson.msg)
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
  this.props.navigation.goBack(null)
}
componentDidMount = async() => {
  
  
  const value = await AsyncStorage.getItem('uid');
   
 this.setState({uid:value})
  
 console.warn("userid",value)

 
 


 }

    render(){
  return (
   
 <Container style = {{flex:1,backgroundColor:'#e8edf1'}}>
    <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
          <Left style ={{flex:1}}>
          <Icon name='md-arrow-back'  style={{color:'white',fontSize:25,paddingLeft:10}} onPress = {()=>  this.props.navigation.goBack()}/>
          </Left>
          <Body style ={{flex:1,alignItems:'center'}} >
          <Title style ={{textAlign:'center',alignItems:'center'}}>Change Pin</Title>
          </Body>
         <Right style ={{flex:1}}/>
        </Header>
 <Content>
 <Modal
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          visible={this.state.Alert_Visibility}
          transparent={true}
 
          animationType={"fade"}
 
          onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } >
 
 
            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0.2, 0.7)'}}>
 
 
                <View style={styles.Alert_Main_View}>
 
 
                    <Text style={styles.Alert_Title}>Result</Text>
 
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
<Text></Text>
<Item  regular style ={styles.InputItem} >

     <Input placeholder='Old pin' 
      placeholderTextColor="#797b7d" 
      style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}}
      secureTextEntry={true}
      keyboardType="numeric" maxLength={5}
      onChangeText={(oldPin)=>this.setState({oldPin})}
     
     />       
      </Item>

          <Mytext></Mytext>
          
          <Item  regular style ={styles.InputItem} >

     <Input placeholder='New Pin'
   
     placeholderTextColor="#797b7d" style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}}
     secureTextEntry={true}
     keyboardType="numeric" maxLength={5}
     onChangeText={(newPin)=>this.setState({newPin})}
     
     />
          </Item>

          <Mytext></Mytext>
          <Item  regular style ={styles.InputItem} >

<Input placeholder='Confirm Pin' 
placeholderTextColor="#797b7d" style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}}
secureTextEntry={true}
keyboardType="numeric" maxLength={5}
onChangeText={(confirmPin)=>this.setState({confirmPin})}

/>
     </Item>
          <Mytext></Mytext>
          

          <Mytext>
</Mytext>

</Content>
<Footer style = {{color:'#dce0e6', backgroundColor:'#e46c0b'}}>
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


