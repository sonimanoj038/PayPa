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



export default class BSetting extends React.Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-settings" style={{ color: tintColor,fontSize:30 }} />
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
 <View style = {styles.body}>

 

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
 }
});


