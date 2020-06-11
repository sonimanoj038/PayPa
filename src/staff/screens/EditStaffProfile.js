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
            <Icon name="ios-contact" style={{ color: tintColor,fontSize:30 }} />
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
componentDidMount = async () => {
const token = await AsyncStorage.getItem('fcmToken')
const session_id = await AsyncStorage.getItem('session_id')

const val = await AsyncStorage.getItem('uid')
console.log(token)
console.log(val)
this.setState({ uid: val ,token:token,session_id:session_id})

}

onSignOut = async() =>{
const {uid }  = this.state ;
const {token }  = this.state ;
let formdata = new FormData();
formdata.append("device_id",token);
formdata.append("user_id",uid);
formdata.append("session_id", this.state.session_id);
await fetch('https://www.markupdesigns.org/paypa/api/logout', {

  method: 'POST',
  headers: {
   'Content-Type': 'multipart/form-data',
  },
  body: formdata
 
}).then((response) => response.json())
      .then((responseJson) => {

        if(responseJson.status ==="Failure"){
          alert(responseJson.msg)
         
        }
        else{ 
       
          AsyncStorage.removeItem('USER_KEY');
          AsyncStorage.removeItem('fcmtoken');
          this.props.navigation.navigate('Login')
       
      }
 
      }).catch((error) => {
        console.error(error);
      });
 

} 
    render(){
  return (
   
 <Container >
    <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
        <Text style = {{alignSelf:'center',color:'white',fontSize:18,fontFamily:'Roboto-Medium'}}>Profile  </Text>
        </Header>
        <ScrollView style={{flex:1}}>
        <Content padder >
        <List style = {{borderColor:'#f2dece',borderWidth:1,backgroundColor:'#f2dece'}}>
       
            <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} >
            
              <Left>
              <TouchableOpacity onPress ={()=> this.props.navigation.navigate('BSregister')}> 
                <Text style= {{color:'#5c391b',fontSize:14}}>Edit profile</Text>
                </TouchableOpacity>
              </Left>
              <Right>
                <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
              </Right>
              
            </ListItem>
         
            <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} >
           
            <Left>
            <TouchableOpacity onPress ={()=> this.props.navigation.navigate('ShowStaff')}> 
              <Text style= {{color:'#5c391b',fontSize:14}}> View Profile</Text>
              </TouchableOpacity>
            </Left>
            <Right>
              <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
            </Right>
          
          </ListItem>
         </List>
            <Text>

            </Text>
            {/* <Button block  style = {{width:'95%',justifyContent:'center',alignItems:'center',alignSelf:'center', backgroundColor:'#e46c0b'}} onPress = {this. onSignOut}>
            <Text style = {{color:'white',fontFamily:'Roboto-Medium',fontSize:18}}>LOGOUT</Text>
          </Button> */}
          <Text></Text>
        </Content>

        </ScrollView>


 </Container>

  );
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


