import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  StatusBar,Image,
  TouchableWithoutFeedback,
  ListView
} from 'react-native';


import QRCode from 'react-native-qrcode-svg';
import { Container, Accordion,Radio,Right,Text, ListItem,Item,Left ,Button, Footer,Header,Body,Title, Content,CheckBox, List} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage'


export default class StaffSetting extends React.Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-log-out" style={{ color: tintColor,fontSize:30 }} />
        )
    }
    constructor(props){

      super(props);
 
  this.state ={

uid:'',
token:'',
session_id:''
  }
}

   

onSignOut = async() =>{

       
          AsyncStorage.removeItem('USER_KEY');
          AsyncStorage.removeItem('fcmtoken');
          this.props.navigation.navigate('Login')
       
      
 
     

} 
componentDidMount = async () => {
 
this.onSignOut()
  
  }
  
    render(){
  return (
   
null

  )
};
}
const styles = StyleSheet.create({
 
  body: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
   
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


