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
  StatusBar,Modal,
  TouchableWithoutFeedback,ActivityIndicator
} from 'react-native';


import { Container, Radio,Right,Text, Left,Input,Item ,Button, Textarea ,Header,Body,Title, Content,CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Mytext from '../Component/Mytext';
import AsyncStorage from '@react-native-community/async-storage';

import {toastr} from '../../Common/Screens/LoginScreen';
export default class ContactUs extends React.Component {
   

    

    constructor(props){

        super(props);
   
    this.state ={

loading:false,
name:'',
mobile:'',
email:'',
message:'',
uid:'',
Alert_Visibility:false
    }
}
validateInput = ()=>{
  const {message }  = this.state ;

if( message ===""){

  toastr.showToast("Enter Your Message")
return false
}
else
this.setState({loading:true})
return true;
}
componentDidMount = async () => {
  const value = await AsyncStorage.getItem('uid')
  const name= await AsyncStorage.getItem('name')
  const mobile= await AsyncStorage.getItem('mobile')
  console.warn(value,name,mobile)
  this.setState({
    uid: value,name:name,mobile:mobile,
  })

}
UserContactFunction= async() =>{
  const {message }  = this.state ;
  let {uid}  = this.state
  let formdata = new FormData();
  formdata.append("message",message);
  formdata.append("uid",uid);

if(this.validateInput()){

  
  await fetch('https://www.markupdesigns.org/paypa/api/contactRequest', {

    method: 'POST',
    headers: {
     'Content-Type': 'multipart/form-data',
    },
    body: formdata
   
  }).then((response) => response.json())
        .then((responseJson) => {

          if(responseJson.status ==="Failure"){
            alert(responseJson.msg)
            this.setState({loading:false})
          }
          else{ 
         
         
          this.setState({loading:false,Alert_Visibility:true})
                   
        }
   
        }).catch((error) => {
          console.error(error);
        });
   
   
    }

}
 
ok_Button=()=>{
 
  this.setState({Alert_Visibility: false});

          
}
    render(){
  return (
   
 <Container style = {{flex:1,backgroundColor:'#e8edf1'}}>
    <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
          <Left style ={{flex:1}}>
          <Icon name='md-arrow-back'  style={{color:'white',fontSize:25,}} onPress = {()=>  this.props.navigation.goBack()}/>
          </Left>
          <Body style ={{flex:1,alignItems:'center'}} >
          <Title >Contact Us</Title>
          </Body>
         <Right style ={{flex:1}}></Right>
        </Header>
 <Content style={{padding:30}} >
 <Modal
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          visible={this.state.Alert_Visibility}
          transparent={true}
 
          animationType={"fade"}
 
          onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } >
 
 
            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0.2, 0.7)'}}>
 
 
                <View style={styles.Alert_Main_View}>
 
 
                  <Text style={styles.Alert_Title}>Success</Text>
 
                <Text style={styles.Alert_Message}> We will back to you shortly </Text>
                  
                  
                </View>
                <View style={{flexDirection: 'row',height:'10%',width:'70%'}}>
 <TouchableOpacity 
     style={styles.buttonStyleFull} 
     onPress={this.ok_Button} 
     activeOpacity={0.7} 
     >
<Text style={styles.TextStyle}> OK</Text>
 </TouchableOpacity>

</View>
 </View>
</ Modal >

 <Item  regular style ={styles.InputItem} >

<Input placeholder='Name ' placeholderTextColor="#797b7d" 
style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}}
value = {this.state.name}
editable = {false}
onChangeText={(name)=>this.setState({name})}
/>
     </Item>

<Text style= {{fontSize:20,fontFamily:'Roboto-Medium',fontWeight:'800'}}></Text>
<Item  regular style ={styles.InputItem} >

<Input placeholder='Mobile' placeholderTextColor="#797b7d" 
style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}}
value = {this.state.mobile}
editable = {false}
onChangeText={(mobile)=>this.setState({mobile})}
/>
     </Item>
<Text style= {{fontSize:14,fontFamily:'Roboto-Light'}}></Text>
<Item  regular style ={styles.InputItem} >

<Input placeholder='Email ' placeholderTextColor="#797b7d" 
style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15,backgroundColor:'white'}}
value = {this.state.email}
editable = {true}
onChangeText={(email)=>this.setState({email})}
/>
     </Item>
<Text>
</Text>

<Textarea rowSpan={6} bordered placeholder="Write Your message.." 
onChangeText={(message)=>this.setState({message})}
placeholderTextColor="grey" style = {{borderRadius:10,borderWidth:0,backgroundColor:'white'}}/>
<Text></Text>
<Button  rounded  style ={{paddingHorizontal:50,alignItems:'center',backgroundColor:'#e46c0b'}} onPress ={this.UserContactFunction}>
            {this.state.loading?<ActivityIndicator
               animating = {this.state.loading}
               color = 'white'
               
               size={"large"}
               style ={{paddingHorizontal:50,alignItems:'center',width:'100%'}}
              />:<Mytext  style ={{color:'white',textAlign:"center",width:'100%',fontWeight:'700',
    }}>SEND</Mytext>}
          </Button>
</Content>
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
  width:'100%',
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

  borderColor: '#1c4478',
  borderRadius:7,
  
 
},
 
Alert_Title:{
 
  fontSize: 22, 
  color: "black",
  textAlign: 'center',
  padding: 5,
  height: '35%',
  fontFamily:'Roboto-Medium'
 
},
 
Alert_Message:{
 

    fontSize: 18, 
   
    textAlign: 'center',
    padding: 10,
   
    fontFamily:'Roboto-Light'
  },
 
buttonStyleFull: {
    
  width:'100%',
  backgroundColor:'#1c4478',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
 margin:3,
 
 
  borderRadius:7,
},
buttonStyle: {
    
  width:'48%',
  backgroundColor:'#1c4478',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
 margin:3,
 
 
  borderRadius:7,
},
   
TextStyle:{
    color:'white',
    textAlign:'center',
    fontSize: 16,
    marginTop: -5, fontFamily:'Roboto-Medium'
    
},
});


