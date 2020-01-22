import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Text, Badge ,Right,Body} from 'native-base';


import AddPost from '../../Business/Screens/BAddPost';
import Setting from '../../Business/Screens/BSetting';
import Notification from '../../Business/Screens/BNotification';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import CardComponent from '../../Business/Component/CardComponent'
import TimelineScreen from '../Screens/TimelineScreen';
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


 export default class UserTimline extends React.Component {
    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-home" style={{ color:tintColor,fontSize:30 }} />
        )
    }
  render() {
    const {navigate} =this.props.navigation;
    return (
      <Container style ={{backgroundColor:'#e8edf1'}}>
        <Header  style ={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
        <Body><Text style = {{alignSelf:'flex-end',color:'white',fontSize:20, fontFamily:'Roboto-Medium'}}>PayPa </Text></Body>
        
        <Right>
        <Text style = {{color:'white',fontSize:15,paddingHorizontal:5,fontFamily: 'Roboto-Medium'}} 
         onPress ={()=> navigate('UWallet')}
        >Wallet</Text>
        <Icon name="ios-wallet" style={{ color: 'white',fontSize:20,paddingRight:5}} />
        </Right>
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

