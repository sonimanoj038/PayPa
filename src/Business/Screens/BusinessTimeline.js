import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Text, Badge ,Right,Body} from 'native-base';


import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import CardComponent from '../Component/CardComponent'
import { createStackNavigator } from 'react-navigation-stack';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
   Platform,
    StatusBar,Image,
    ImageBackground 
  } from 'react-native';

 export default class BusinessTimline extends Component {
    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-home" style={{ color:tintColor,fontSize:30 }} />
        )
    }
  render() {
    return (
      <Container style ={{backgroundColor:'#e8edf1'}}>
        <Header  style ={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
        <Text style = {{alignSelf:'center',color:'white',fontSize:18,fontFamily:'Roboto-Medium'}}>PayPa</Text>
            </Header>
      
        <Content>
        <CardComponent imageSource="1" likes="101" />
                    <CardComponent imageSource="2" likes="201" />
                    <CardComponent imageSource="3" likes="301" />
            </Content>
        
      </Container>
    );
  }
}


