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
  TouchableWithoutFeedback
} from 'react-native';


import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Header,Body,Title, Content,CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Mytext from '../component/Mytext';



export default class ChangePassword extends React.Component {
   

    

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
          <Icon name='md-arrow-back'  style={{color:'white',fontSize:25}}/>
          </Left>
          <Body  >
          <Title >Change Paasword</Title>
          </Body>
         
        </Header>
 <Content  >
<Text></Text>
<Item  regular style ={styles.InputItem} >

     <Input placeholder='Old password' placeholderTextColor="#797b7d" style = {{color:'#797b7d'}} />
          </Item>

          <Mytext></Mytext>
          
          <Item  regular style ={styles.InputItem} >

     <Input placeholder='New Password' placeholderTextColor="#797b7d" style = {{color:'#797b7d'}} />
          </Item>

          <Mytext></Mytext>
          <Item  regular style ={styles.InputItem} >

<Input placeholder='Confirm Password' placeholderTextColor="#797b7d" style = {{color:'#797b7d'}} />
     </Item>
          <Mytext></Mytext>
          

          <Mytext>


</Mytext>

</Content>
<Footer style = {{color:'#dce0e6',
  backgroundColor:'#e46c0b'}}>
<TouchableWithoutFeedback onPress= {()=>this.props.navigation.navigate('timeline')}>
            <Text style = {{color:'white',fontFamily:'Roborto ',fontSize:18,fontWeight:'800',padding:15}}>SUBMIT</Text>
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


