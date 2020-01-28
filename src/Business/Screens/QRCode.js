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
import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Header,Body,Title, Content,CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';



export default class QrCodeScreen extends React.Component {


    constructor(props){

        super(props);
   
    this.state ={

term:false
    }
}
    render(){
  return (
   
 <Container  >
    <Header  style={{backgroundColor:'white'}} noShadow>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
          <Left>
          <Icon name='md-arrow-back'  style={{color:'#1c4478',fontSize:25,paddingLeft:10}} onPress = {()=>  this.props.navigation.goBack()}/>
          </Left>
          <Body  >
          <Title >My QR Code</Title>
          </Body>
         
        </Header>
 <View style = {styles.body}>
<View style = {styles.qrcode}>

<QRCode
 size = {200}
      value="http://markupdesigns.info/paypa/index.html"
      style ={{justifyContent:'center',alignSelf:'center',padding:20}}
    />

</View>
 

 </View>




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
 },
 qrcode:{
  borderWidth:1,
  borderColor:'grey',
  padding:15,

 }
});


