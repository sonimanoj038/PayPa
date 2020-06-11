import React, { Component } from "react";
import { Container, Header, Content, Accordion,Left,Right,Body,Title } from "native-base";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
    StatusBar,Modal,
    TouchableWithoutFeedback,ActivityIndicator
  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Mytext from '../Component/Mytext';
import AsyncStorage from '@react-native-community/async-storage';
const dataArray = [
  { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];

export default class FaqScreen extends Component {
    constructor(props){
        super(props);
    this.state ={

loading:false,
name:'',
mobile:'',
email:'',
message:'',
uid:'',
Alert_Visibility:false,
dataArray:[]
    }
}

componentDidMount = async () => {
    const value = await AsyncStorage.getItem('uid')
    const name= await AsyncStorage.getItem('name')
    const mobile= await AsyncStorage.getItem('mobile')
    console.warn(value,name,mobile)
    this.setState({
      uid: value,name:name,mobile:mobile,
    })
  await this.getData()
  }
  getData= async() =>{
  
    await fetch('https://www.markupdesigns.org/paypa/api/faq', {
      method:'GET'
    
    }).then((response) => response.json())
          .then((responseJson) => {
  
            if(responseJson.status ==="Failure"){
              alert(responseJson.msg)
              this.setState({loading:false})
            }
            else{ 
              const data = responseJson['data']
              console.warn('my respkn e ' + data)
            this.setState({loading:false,Alert_Visibility:true,dataArray:data})          
          }
     
          }).catch((error) => {
            console.error(error);
          })
  }
  
  render() {
    return (
        <Container style = {{flex:1,backgroundColor:'#e8edf1'}}>
        <Header  style={{backgroundColor:'#1c4478'}}>
            <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
              <Left style ={{flex:1}}>
              <Icon name='md-arrow-back'  style={{color:'white',fontSize:25,left:5}} onPress = {()=>  this.props.navigation.goBack()}/>
              </Left>
              <Body style ={{flex:1,alignItems:'center'}} >
              <Title >FAQ</Title>
              </Body>
             <Right style ={{flex:1}}></Right>
            </Header>
     <Content padder >
     
          <Accordion
          expanded = {0}
          
          dataArray={this.state.dataArray} icon="add" expandedIcon="remove"
          headerStyle={{ backgroundColor: "white",color:'#1c4478' }}
          contentStyle={{ backgroundColor: "#f2f2f2" ,color:'#1c4478',padding:5 }}
          />
        </Content>
      </Container>
    );
  }
}