import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  StatusBar,Image,
  TouchableWithoutFeedback,Modal,
  ListView
} from 'react-native';


import QRCode from 'react-native-qrcode-svg';
import { Container, Accordion,Radio,Right,Text, ListItem,Item,Left ,Button, Footer,Header,Body,Title, Content,CheckBox, List} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage'


export default class UserSetting extends React.Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-notifications-outline" style={{ color: tintColor,fontSize:30 }} />
        )
    }
    constructor(props){

        super(props);
   
    this.state ={

uid:'',
token:'',
Alert_Visibility:false
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
  formdata.append("session_id", this.state.session_id);
  formdata.append("user_id",uid);

  await fetch('https://www.markupdesigns.org/paypa/api/logout', {

    method: 'POST',
    headers: {
     'Content-Type': 'multipart/form-data',
    },
    body: formdata
   
  }).then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.status ==="Failure"){
            AsyncStorage.removeItem('USER_KEY');
          AsyncStorage.removeItem('fcmtoken');
          this.props.navigation.navigate('Login')
           
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
ok_Cancel=()=>{
  this.setState({Alert_Visibility: false});
}

ok_Button=async()=>{
  const {uid }  = this.state ;
  let formdata = new FormData();
  formdata.append("user_id",uid);
  formdata.append("session_id", this.state.session_id);
  await fetch('https://www.markupdesigns.org/paypa/api/deactiveAccount', {

    method: 'POST',
    headers: {
     'Content-Type': 'multipart/form-data',
    },
    body: formdata
   
  }).then((response) => response.json())
        .then((responseJson) => {

          if(responseJson.status ==="Failure"){
            // alert(responseJson.msg)
          }
          else{ 
            AsyncStorage.removeItem('USER_KEY');
            AsyncStorage.removeItem('fcmtoken');
            this.setState({Alert_Visibility: false});
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
        <Text style = {{alignSelf:'center',color:'white',fontSize:18,fontFamily:'Roboto-Medium'}}>Settings </Text>
        </Header>
        <Modal
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          visible={this.state.Alert_Visibility}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } >
            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0.2, 0.7)'}}>
                <View style={styles.Alert_Main_View}>
                    <Text style={styles.Alert_Title}>Warning</Text>
                    <Text style={styles.Alert_Message}> Are you sure you want to deactivate the account?</Text>
                  </View>
                <View style={{flexDirection: 'row',height:'10%',width:'70%'}}>
 <TouchableOpacity 
     style={styles.buttonStyle} 
     onPress={this.ok_Button} 
     activeOpacity={0.7} 
     >
     <Text style={styles.TextStyle}> OK</Text>
 </TouchableOpacity>
 <TouchableOpacity 
     style={styles.buttonStyle} 
     onPress={this.ok_Cancel} 
     activeOpacity={0.7} 
     >
     <Text style={styles.TextStyle}> CANCEL</Text>
 </TouchableOpacity>
         </View>
            </View>
        </ Modal >
        <ScrollView style={{flex:1}}>
        <Content padder >
        <List style = {{borderColor:'#f2dece',borderWidth:1,backgroundColor:'#f2dece'}}>
        <ListItem itemDivider  style = {{backgroundColor:'white',padding:0}}>
              <Text style = {{color:'#5c391b',fontSize:16,fontFamily:'Roboto-Medium'}}>My Account</Text>
            </ListItem>
            <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} button onPress ={()=> this.props.navigation.navigate('USregister')}>
            
              <Left>
              
                <Text style= {{color:'#5c391b',fontSize:14}}>Edit Profile</Text>
        
              </Left>
              <Right>
                <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
              </Right>
            </ListItem>
           
            <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} button onPress ={()=> this.props.navigation.navigate('UChangePin')} >
           
            <Left>
            
              <Text style= {{color:'#5c391b',fontSize:14}}>Change Pin</Text>
         
            </Left>
           
            <Right>
              <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
            </Right>
           
          </ListItem>
         
          <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} button  onPress ={()=> this.setState({Alert_Visibility:true})} >
            
            <Left>
           
              <Text style= {{color:'#5c391b',fontSize:14}}>Deactivate Account</Text>
            
            </Left>
            <Right>
              <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
            </Right>
          </ListItem>

<ListItem itemDivider  style = {{backgroundColor:'white',padding:0}}>
              <Text style = {{color:'#5c391b',fontSize:16,fontFamily:'Roboto-Medium'}}>My Favourite</Text>
            </ListItem>
            <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} button onPress ={()=> this.props.navigation.navigate('MyFav')} >
            
              <Left>
              
                <Text style= {{color:'#5c391b',fontSize:14}}>List of Favorite Providers</Text>
              
              </Left>
              <Right>
                <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
              </Right>
            </ListItem>
            <ListItem itemDivider  style = {{backgroundColor:'white',padding:0}}>
              <Text style = {{color:'#5c391b',fontSize:16,fontFamily:'Roboto-Medium'}}>PayPa Policy</Text>
            </ListItem>
           
            <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} button onPress={()=> this.props.navigation.navigate('PrivacyPolicy')} >
            
              <Left>
              
                <Text style= {{color:'#5c391b',fontSize:14}}>Privacy Policy</Text>
               
              </Left>
              <Right>
                <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
              </Right>
            </ListItem>
         
            <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} button onPress ={()=> this.props.navigation.navigate('TermCondition')} >
            
            <Left>
        
              <Text style= {{color:'#5c391b',fontSize:14}}>Terms & Conditions</Text>
             
            </Left>
            <Right>
              <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
            </Right>
          </ListItem>
          
          </List>
          <List style = {{borderColor:'#f2dece',borderWidth:1}}>
          <ListItem  style = {{padding:0,backgroundColor:'#ffff'}} button onPress ={()=> this.props.navigation.navigate('UContactUs')} >
            
            <Left>
            <TouchableOpacity >
              <Text style= {{color:'#5c391b',fontSize:14}}>Contact Us</Text>
              </TouchableOpacity>
            </Left>
            <Right>
              <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
            </Right>
          </ListItem>
          <ListItem  style = {{padding:0}} button onPress ={()=> this.props.navigation.navigate('FaqScreen')}>
            
            <Left>
          
              <Text style= {{color:'#5c391b',fontSize:14}}>FAQs</Text>
             
            </Left>
            <Right>
              <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
            </Right>
          </ListItem>

            </List>
            <Text>

            </Text>
            <Button block  style = {{width:'95%',justifyContent:'center',alignItems:'center',alignSelf:'center', backgroundColor:'#e46c0b'}} onPress = {this.onSignOut}>
            <Text style = {{color:'white',fontFamily:'Roboto-Medium',fontSize:18}}>LOGOUT</Text>
          </Button>
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
 },Alert_Main_View:{
 
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
  height: '25%',
  fontFamily:'Roboto-Medium'
 
},
 
Alert_Message:{
 
    fontSize: 18, 
    color: "black",
    textAlign: 'center',
    padding: 5,
    height: '42%',
    fontFamily:'Roboto-Light'
  },
 
buttonStyle: {
    
  width:'49%',
  backgroundColor:'#1c4478',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
 margin:2,
  borderRadius:7,
},
   
TextStyle:{
    color:'white',
    textAlign:'center',
    fontSize: 23,
    marginTop: -5, fontFamily:'Roboto-Medium'
    
},

});


