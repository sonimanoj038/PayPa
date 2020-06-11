import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  StatusBar, Image,
  Modal
} from 'react-native';
import { Container, Accordion, Radio, Right, Text, ListItem, Item, Left, Button, Footer, Header, Body, Title, Content, CheckBox, List } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage'

export default class BusinessSetting extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-notifications-outline" style={{ color: tintColor, fontSize: 30 }} />
    )
  }
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      token: '',
      Alert_Visibility: false,
      session_id: ""
    }
  }

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('fcmToken')
    const session_id = await AsyncStorage.getItem('session_id')
    const val = await AsyncStorage.getItem('uid')
    console.log(token)
    console.log(val)
    this.setState({ uid: val, token: token, session_id: session_id })

  }

  onSignOut = async () => {
    const { uid } = this.state;
    const { token } = this.state;
    let formdata = new FormData();
    formdata.append("device_id", token);
    formdata.append("session_id", this.state.session_id);
    formdata.append("user_id", uid);
    await fetch('https://www.markupdesigns.org/paypa/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata

    }).then((response) => response.json())
      .then((responseJson) => {

        if (responseJson.status === "Failure") {
          AsyncStorage.removeItem('USER_KEY');
          AsyncStorage.removeItem('fcmtoken');
          this.props.navigation.navigate('Login')
        }
        else {
          AsyncStorage.removeItem('USER_KEY');
          AsyncStorage.removeItem('fcmtoken');
          this.props.navigation.navigate('Login')
        }

      }).catch((error) => {
        console.error(error);
      });
  }

  ok_Cancel = () => {
    this.setState({ Alert_Visibility: false });
  }
  ok_Button = async () => {
    const { uid } = this.state;
    let formdata = new FormData();
    formdata.append("user_id", uid);
    formdata.append("session_id", this.state.session_id);
    await fetch('https://www.markupdesigns.org/paypa/api/deactiveAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "Failure") {
          alert(responseJson.msg)
        }
        else {
          AsyncStorage.removeItem('USER_KEY');
          AsyncStorage.removeItem('fcmtoken');
          this.setState({ Alert_Visibility: false });
          this.props.navigation.navigate('Login')
        }
      }).catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <Container >
        <Header style={{ backgroundColor: '#1c4478' }}>
          <StatusBar barStyle="light-content" backgroundColor="#1c4478" />
          <Text style={{ alignSelf: 'center', color: 'white', fontSize: 18, fontFamily: 'Roboto-Medium' }}>Settings </Text>
        </Header>
        <ScrollView style={{ flex: 1 }}>
          <Content padder >
            <List style={{ borderColor: '#f2dece', borderWidth: 1, backgroundColor: '#f2dece' }}>
              <ListItem itemDivider style={{ backgroundColor: 'white', padding: 0 }}>
                <Text style={{ color: '#5c391b', fontSize: 16, fontFamily: 'Roboto-Medium' }}>My Account</Text>
              </ListItem>
              <ListItem style={{ backgroundColor: '#f2dece', padding: 0}} button onPress={() => this.props.navigation.navigate('BSregister')} >
                <Left>
                
                    <Text style={{ color: '#5c391b', fontSize: 14 }}>Edit Profile</Text>
                 
                </Left>
                <Right>
                  <Icon name="md-arrow-forward" style={{ fontSize: 20 }} />
                </Right>
              </ListItem>
              <ListItem style={{ backgroundColor: '#f2dece', padding: 0 }}  button onPress={() => this.props.navigation.navigate('SUploadBusiness')}>
                <Left>
                
                    <Text style={{ color: '#5c391b', fontSize: 14 }}>Edit Business Profile</Text>
                  
                </Left>
                <Right>
                  <Icon name="md-arrow-forward" style={{ fontSize: 20 }} />
                </Right>
              </ListItem>
              <ListItem style={{ backgroundColor: '#f2dece', padding: 0 }} button onPress={() => this.props.navigation.navigate('BChangePin')} >
                <Left>
                 
                    <Text style={{ color: '#5c391b', fontSize: 14 }}>Change Pin</Text>
 
                </Left>
                <Right>
                  <Icon name="md-arrow-forward" style={{ fontSize: 20 }} />
                </Right>

              </ListItem>

              <ListItem itemDivider style={{ backgroundColor: 'white', padding: 0 }}>
                <Text style={{ color: '#5c391b', fontSize: 16, fontFamily: 'Roboto-Medium' }}> My QR Code</Text>
              </ListItem>

              <ListItem style={{ backgroundColor: '#f2dece', padding: 0 }} button onPress={() => this.props.navigation.navigate('Qrcode')} >

                <Left>
                
                    <Text style={{ color: '#5c391b', fontSize: 14 }}>My QR Code</Text>
                
                </Left>
                <Right>
                  <Icon name="md-arrow-forward" style={{ fontSize: 20 }} />
                </Right>
              </ListItem>
              <ListItem itemDivider style={{ backgroundColor: 'white', padding: 0 }}>
                <Text style={{ color: '#5c391b', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Maintain Staff</Text>
              </ListItem>
              <ListItem style={{ backgroundColor: '#f2dece', padding: 0 }} button onPress={() => this.props.navigation.navigate('AddStaff')}>
                <Left>
                
                    <Text style={{ color: '#5c391b', fontSize: 14 }}>Add New Staff</Text>
               
                </Left>
                <Right>
                  <Icon name="md-arrow-forward" style={{ fontSize: 20 }} />
                </Right>
              </ListItem>
              <ListItem style={{ backgroundColor: '#f2dece', padding: 0 }}button onPress={() => this.props.navigation.navigate('ViewStaff')} >
                <Left>
                 
                    <Text style={{ color: '#5c391b', fontSize: 14 }}>View Staff</Text>
                  
                </Left>
                <Right>
                  <Icon name="md-arrow-forward" style={{ fontSize: 20 }} />
                </Right>
              </ListItem>
              <ListItem itemDivider  style = {{backgroundColor:'white',padding:0}}>
              <Text style = {{color:'#5c391b',fontSize:16,fontFamily:'Roboto-Medium'}}>PayPa Policy</Text>
            </ListItem>
            <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} button onPress ={()=> this.props.navigation.navigate('PrivacyPolicy2')}>
            
              <Left>
              
                <Text style= {{color:'#5c391b',fontSize:14}}>Privacy Policy</Text>
            
              </Left>
              <Right>
                <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
              </Right>
            </ListItem>
            <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} button onPress ={()=> this.props.navigation.navigate('TermCondition2')} >
            
            <Left>
            
              <Text style= {{color:'#5c391b',fontSize:14}}>Terms & Conditions</Text>
            
            </Left>
            <Right>
              <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
            </Right>
          </ListItem>
            </List>
            <List style={{ borderColor: '#f2dece', borderWidth: 1 }}>
              <ListItem style={{ padding: 0, backgroundColor: '#ffff' }} button onPress={() => this.props.navigation.navigate('BContactUs')} >
                <Left>
           
                    <Text style={{ color: '#5c391b', fontSize: 14 }}>Contact Us</Text>
                  
                </Left>
                <Right>
                  <Icon name="md-arrow-forward" style={{ fontSize: 20 }} />
                </Right>
              </ListItem>
              <ListItem style={{ padding: 0 }} button onPress ={()=> this.props.navigation.navigate('FaqScreen2')} >
                <Left>
              
                  <Text style={{ color: '#5c391b', fontSize: 14 }}>FAQ</Text>
                 
                </Left>
                <Right>
                  <Icon name="md-arrow-forward" style={{ fontSize: 20 }} />
                </Right>
              </ListItem>
              
            </List>
            <Text>
            </Text>
            <Button block style={{ width: '95%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#e46c0b' }} onPress={this.onSignOut}>
              <Text style={{ color: 'white', fontFamily: 'Roboto-Medium', fontSize: 18 }}>LOGOUT</Text>
            </Button>
            <Text></Text>
            
          </Content>
        </ScrollView>
      </Container>
    )
  }
}
const styles = StyleSheet.create({

  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
  },
  InputItem: {
    backgroundColor: 'white',
    width: '90%',
    borderColor: 'white',
    alignSelf: 'center',
    borderRadius: 8
  }
})


