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


import { Container, Radio,Right,Text, Left,Input,Item ,Button, Textarea ,Header,Body,Title, Content,CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Mytext from '../Component/Mytext';



export default class ContactUs extends React.Component {
   

    

    constructor(props){

        super(props);
   
    this.state ={

term:false
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
          <Title >Contact Us</Title>
          </Body>
         
        </Header>
 <Content style={{padding:30}} >
 <Text style= {{fontSize:20,fontFamily:'Roboto-Medium',fontWeight:'800'}}>Address</Text>
<Text style= {{fontSize:14,fontFamily:'Roboto-Light'}}>Street addresses: 445 Mount Eden Road, Mount Eden, Auckland.</Text>
<Text>
</Text>
<Text style= {{fontSize:20,fontFamily:'Roboto-Medium',fontWeight:'800'}}>Mobile</Text>
<Text style= {{fontSize:14,fontFamily:'Roboto-Light'}}>9875562610</Text>
<Text>
</Text>
<Text style= {{fontSize:20,fontFamily:'Roboto-Medium',fontWeight:'800'}}>Email Us</Text>
<Text style= {{fontSize:14,fontFamily:'Roboto-Light'}}>Paypa@gmail.com</Text>
<Text>

</Text>
<Textarea rowSpan={6} bordered placeholder="Send Your issue.." placeholderTextColor="grey" style = {{borderRadius:10,borderWidth:0,backgroundColor:'white'}}/>
<Text></Text>
<Button  rounded  style ={{paddingHorizontal:50,alignItems:'center',backgroundColor:'#e46c0b'}} onPress ={this.UserLoginFunction}>
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
  width:'90%',
  borderColor:'white',
alignSelf:'center',
borderRadius:8
 }
});


