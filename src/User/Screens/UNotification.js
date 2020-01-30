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


import QRCode from 'react-native-qrcode-svg';
import { Container, Radio,Right,Text, Left,Input,List,ListItem,Thumbnail,Button, Footer,Header,Body,Title, Content,CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';



export default class UNotification extends React.Component {

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
        <Text style = {{alignSelf:'center',color:'white',fontSize:18,fontFamily:'Roboto-Medium'}}>Notifications </Text>
        </Header>
 <Content padder>

 <List >
            <ListItem avatar style ={{backgroundColor:'#afc7e0',marginLeft: 0,borderBottomWidth:2,borderBottomColor:'white'}}>
              <Left style ={{backgroundColor:'#afc7e0'}}>
                <Thumbnail source={ require("../../img/user/sample2.jpg")} style ={{left:3}}/>
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <View style = {{flexDirection:'row'}}>
                <Text note>commented</Text> 
                <Text note style = {{color:'#0e58cf'}}>10:12</Text>
                </View>
             
                
              </Body>
              <Right>
              <Icon name="md-chatbubbles" style={{ color: '#0e58cf' ,fontSize:25,paddingHorizontal:2}} />
              </Right>
            </ListItem>
            <ListItem avatar style ={{backgroundColor:'#afc7e0',marginLeft: 0}}>
              <Left style ={{backgroundColor:'#afc7e0'}}>
                <Thumbnail source={ require("../../img/user/sample2.jpg")} style ={{left:3}}/>
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <View style = {{flexDirection:'row'}}>
                <Text note>Like</Text> 
                <Text note style = {{color:'#0e58cf'}}>10:12</Text>
                </View>
             
                
              </Body>
              <Right>
             
              <Icon name="md-thumbs-up" style={{ color: '#0e58cf' ,fontSize:25,paddingHorizontal:2}} />
              </Right>
            </ListItem>
            <ListItem avatar style ={{marginLeft: 0}}>
              <Left >
                <Thumbnail source={ require("../../img/user/sample2.jpg")} style ={{left:3}}/>
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <View style = {{flexDirection:'row'}}>
                <Text note>commented</Text> 
                <Text note style = {{color:'#0e58cf'}}>10:12</Text>
                </View>
             
                
              </Body>
              <Right>
              <Icon name="md-chatbubbles" style={{ color: '#0e58cf' ,fontSize:25,paddingHorizontal:2}} />
              </Right>
            </ListItem>
            <ListItem avatar style ={{marginLeft: 0}}>
              <Left >
                <Thumbnail source={ require("../../img/user/sample2.jpg")} style ={{left:3}}/>
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <View style = {{flexDirection:'row'}}>
                <Text note>Like</Text> 
                <Text note style = {{color:'#0e58cf'}}>10:12</Text>
                </View>
             
                
              </Body>
              <Right>
             
              <Icon name="md-thumbs-up" style={{ color: '#0e58cf' ,fontSize:25,paddingHorizontal:2}} />
              </Right>
            </ListItem>
            
          </List>

 </Content>




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


