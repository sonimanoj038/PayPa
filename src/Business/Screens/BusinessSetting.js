import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  StatusBar,Image,
  Modal
} from 'react-native';


import QRCode from 'react-native-qrcode-svg';
import { Container, Accordion,Radio,Right,Text, ListItem,Item,Left ,Button, Footer,Header,Body,Title, Content,CheckBox, List} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage'


export default class BusinessSetting extends React.Component {

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

const val = await AsyncStorage.getItem('uid')
console.log(token)
console.log(val)
this.setState({ uid: val ,token:token})

}

onSignOut = async() =>{
const {uid }  = this.state ;
const {token }  = this.state ;
let formdata = new FormData();
formdata.append("device_id",token);
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

  await fetch('https://www.markupdesigns.org/paypa/api/deactiveAccount', {

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
        {/* <Modal
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          visible={this.state.Alert_Visibility}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } >
            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0.2, 0.7)'}}>
                <View style={styles.Alert_Main_View}>
                    <Text style={styles.Alert_Title}>Warn</Text>
                    <Text style={styles.Alert_Message}> Are You Sure to Deactivate Account</Text>
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
        </ Modal > */}
        <ScrollView style={{flex:1}}>
        <Content padder >
        <List style = {{borderColor:'#f2dece',borderWidth:1,backgroundColor:'#f2dece'}}>
        <ListItem itemDivider  style = {{backgroundColor:'white',padding:0}}>
              <Text style = {{color:'#5c391b',fontSize:16,fontFamily:'Roboto-Medium'}}>My Account</Text>
            </ListItem>
            <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} >
            
              <Left>
              <TouchableOpacity onPress ={()=> this.props.navigation.navigate('BSregister')}> 
                <Text style= {{color:'#5c391b',fontSize:14}}>Edit Profile</Text>
                </TouchableOpacity>
              </Left>
              <Right>
                <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
              </Right>
              
            </ListItem>
            <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} >
           
            <Left>
            <TouchableOpacity onPress ={()=> this.props.navigation.navigate('SUploadBusiness')}> 
              <Text style= {{color:'#5c391b',fontSize:14}}>Edit Business Profile</Text>
              </TouchableOpacity>
            </Left>
            <Right>
              <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
            </Right>
        
          </ListItem>
            <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} >
           
            <Left>
            <TouchableOpacity onPress ={()=> this.props.navigation.navigate('BChangePin')}> 
              <Text style= {{color:'#5c391b',fontSize:14}}>Change Pin</Text>
              </TouchableOpacity>
            </Left>
            <Right>
              <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
            </Right>
          
          </ListItem>
        
<ListItem itemDivider  style = {{backgroundColor:'white',padding:0}}>
              <Text style = {{color:'#5c391b',fontSize:16,fontFamily:'Roboto-Medium'}}> My QR Code</Text>
            </ListItem>
         
            <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} >
            
            <Left>
            <TouchableOpacity onPress ={()=> this.props.navigation.navigate('Qrcode')}>
              <Text style= {{color:'#5c391b',fontSize:14}}>My QR Code</Text>
              </TouchableOpacity>
            </Left>
            <Right>
              <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
            </Right>
          </ListItem>


            <ListItem itemDivider  style = {{backgroundColor:'white',padding:0}}>
              <Text style = {{color:'#5c391b',fontSize:16,fontFamily:'Roboto-Medium'}}>Maintain Staff</Text>
            </ListItem>
            <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} >
            
              <Left>
              <TouchableOpacity onPress ={()=> this.props.navigation.navigate('AddStaff')}>
                <Text style= {{color:'#5c391b',fontSize:14}}>Add New Staff</Text>
                </TouchableOpacity>
              </Left>
              <Right>
                <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
              </Right>
            </ListItem>
           
          <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} >
            
            <Left>
            <TouchableOpacity onPress ={()=> this.props.navigation.navigate('ViewStaff')}>
              <Text style= {{color:'#5c391b',fontSize:14}}>View Staff</Text>
              </TouchableOpacity>
            </Left>
            <Right>
              <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
            </Right>
          </ListItem>

          </List>
          <List style = {{borderColor:'#f2dece',borderWidth:1}}>
          <ListItem  style = {{padding:0,backgroundColor:'#ffff'}} >
            
            <Left>
            <TouchableOpacity onPress ={()=> this.props.navigation.navigate('BContactUs')}>
              <Text style= {{color:'#5c391b',fontSize:14}}>Contact Us</Text>
              </TouchableOpacity>
          
            </Left>
            <Right>
              <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
            </Right>
          </ListItem>
          <ListItem  style = {{padding:0}} >
            
            <Left>
              <Text style= {{color:'#5c391b',fontSize:14}}>FAQ</Text>
            </Left>
            <Right>
              <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
            </Right>
          </ListItem>

            </List>
            <Text>

            </Text>
            <Button block  style = {{width:'95%',justifyContent:'center',alignItems:'center',alignSelf:'center', backgroundColor:'#e46c0b'}} onPress = {this. onSignOut}>
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
 }
});


