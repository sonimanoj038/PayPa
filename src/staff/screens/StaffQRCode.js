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
import AsyncStorage from '@react-native-community/async-storage';


export default class StaffQRCode extends React.Component {
    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-barcode" style={{ color:tintColor,fontSize:30 }} />
        )
    }

    constructor(props){

        super(props);
   
    this.state ={

uid:'11'
    }
}

componentDidMount = async() => {
  
  const bid = await AsyncStorage.getItem('bid')
  const id = await AsyncStorage.getItem('id')
  let val = bid +"," +id
  this.setState({uid:val})
 console.warn(val)
  //Checking for the permission just after component loaded
  


 }
    render(){
  return (
   
 <Container  >
   <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
        <Text style = {{alignSelf:'center',color:'white',fontSize:18,fontFamily:'Roboto-Medium'}}>QR Code </Text>
        </Header>
 <View style = {styles.body}>
<View style = {styles.qrcode}>

<QRCode
 size = {300}
//  logo={ require("../../img/logo/logofinal.jpg")}
//       logoSize={50}
//      logoBackgroundColor ="green"
//      logoMargin = {6}
      value={this.state.uid}
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


