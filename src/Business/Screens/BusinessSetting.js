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



export default class BusinessSetting extends React.Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-notifications-outline" style={{ color: tintColor,fontSize:30 }} />
        )
    }
    constructor(props){

        super(props);
   
    this.state ={

term:false
    }
}
    render(){
  return (
   
 <Container >
    <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
        <Text style = {{alignSelf:'center',color:'white',fontSize:18,fontFamily:'Roboto-Medium'}}>Settings </Text>
        </Header>
        <ScrollView style={{flex:1}}>
        <Content padder >
        <List style = {{borderColor:'#f2dece',borderWidth:1,backgroundColor:'#f2dece'}}>
        <ListItem itemDivider  style = {{backgroundColor:'white',padding:0}}>
              <Text style = {{color:'#5c391b',fontSize:16,fontFamily:'Roboto-Medium'}}>My Account</Text>
            </ListItem>
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
            <TouchableOpacity onPress ={()=> this.props.navigation.navigate('SUploadBusiness')}> 
              <Text style= {{color:'#5c391b',fontSize:14}}>Edit Business profile</Text>
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
          <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} >
            
            <Left>
              <Text style= {{color:'#5c391b',fontSize:14}}>Deactivate Account</Text>
            </Left>
            <Right>
              <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
            </Right>
          </ListItem>

<ListItem itemDivider  style = {{backgroundColor:'white',padding:0}}>
              <Text style = {{color:'#5c391b',fontSize:16,fontFamily:'Roboto-Medium'}}>My QR COde</Text>
            </ListItem>
            <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} >
            
              <Left>
                <Text style= {{color:'#5c391b',fontSize:14}}>Download QR Code</Text>
              </Left>
              <Right>
                <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
              </Right>
            </ListItem>
            <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} >
            
            <Left>
            <TouchableOpacity onPress ={()=> this.props.navigation.navigate('Qrcode')}>
              <Text style= {{color:'#5c391b',fontSize:14}}>Show QR Code</Text>
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
                <Text style= {{color:'#5c391b',fontSize:14}}>Add New Staff</Text>
              </Left>
              <Right>
                <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
              </Right>
            </ListItem>
            <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} >
            
            <Left>
              <Text style= {{color:'#5c391b',fontSize:14}}>Delete Staff</Text>
            </Left>
            <Right>
              <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
            </Right>
          </ListItem>
          <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} >
            
            <Left>
              <Text style= {{color:'#5c391b',fontSize:14}}>Edit Staff</Text>
            </Left>
            <Right>
              <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
            </Right>
          </ListItem>


          <ListItem itemDivider  style = {{backgroundColor:'white',padding:0}}>
              <Text style = {{color:'#5c391b',fontSize:16,fontFamily:'Roboto-Medium'}}>Active Staff(Per work shift)</Text>
            </ListItem>
            <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} >
            
              <Left>
                <Text style= {{color:'#5c391b',fontSize:14}}>Activate Staff</Text>
              </Left>
              <Right>
                <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
              </Right>
            </ListItem>
            <ListItem  style = {{backgroundColor:'#f2dece',padding:0}} >
            
            <Left>
              <Text style= {{color:'#5c391b',fontSize:14}}>Deactivate Staff</Text>
            </Left>
            <Right>
              <Icon name="md-arrow-forward"  style={{fontSize:20}}/>
            </Right>
            </ListItem>



          </List>
          <List style = {{borderColor:'#f2dece',borderWidth:1}}>
          <ListItem  style = {{padding:0,backgroundColor:'#ffff'}} >
            
            <Left>
              <Text style= {{color:'#5c391b',fontSize:14}}>Contact Us</Text>
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
            <Button block  style = {{width:'95%',justifyContent:'center',alignItems:'center',alignSelf:'center', backgroundColor:'#e46c0b'}} onPress = {()=>  this.props.navigation.navigate('Login')}>
            <Text style = {{color:'white',fontFamily:'System',fontSize:18,fontWeight:'700'}}>LOGOUT</Text>
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


