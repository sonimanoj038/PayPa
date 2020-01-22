const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
 
import React from 'react';
import {View,
  AppRegistry,
  StyleSheet,
 StatusBar,
  TouchableOpacity,BackHandler,Dimensions,Image,ImageBackground,
  Linking,TouchableWithoutFeedback
} from 'react-native';
 
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Header,Body,Title, Content,CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import { NavigationActions, StackActions,withNavigationFocus } from 'react-navigation';

export default class PaymentScreen extends React.Component {


    constructor(props){

        super(props);
   
    this.state ={

result:"",
msg:'',
amount:''
    }
}


  render() {
    const { navigation } = this.props;
    return (
    
        <Container>
        <Header  style={{backgroundColor:'#1c4478'}}>
            <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
              <Left>
              <Icon name='md-arrow-back'  style={{color:'white',fontSize:25}}/>
              </Left>
              <Body  >
              <Title >Amount To Pay</Title>
              </Body>
             
            </Header>
            <ImageBackground  source={require('../../img/common/wallet-bg.png')}  style={{ 
        flex:1,
        width: null,
        height: null,
       justifyContent:'space-evenly'
      }} >
     <View style={{ alignItems:'center',flex:3}}>
   
     <View style={{padding:30,alignItems:'center'}}>
        <Text style ={{color:'white', fontFamily:'Roboto-Medium',fontSize:20,textAlign:'center'}}>
         Available Balance
        </Text>
        <View style={{flexDirection:"row",paddingVertical:10,alignItems:'center'}}>
        <Text style ={{color:'white', fontFamily:'Roboto-Light',fontSize:20,textAlign:'center'}}>
        R 
        </Text>
        <Text style ={{color:'white', fontFamily:'Roboto-Light',fontSize:30,textAlign:'center'}}>
       250.50
        </Text>
        </View>

</View>
</View>
<View style={{ alignItems:'center',flex:4}}>             
        <Item  rounded style ={[styles.inputitem,{borderColor:"#23528b"}]}   >
<Image source={require('../../img/common/call21.png')} />

            <Input placeholderTextColor="#23528b" style = {{color:'#23528b',fontFamily: 'Roboto-Medium',fontSize:18}}
           onChangeText={(amount)=>this.setState({amount})}
            keyboardType="numeric" placeholder='Enter Amount' maxLength={5} />
          </Item>
          <Mytext></Mytext>
          <Item  rounded style ={[styles.inputitem,{borderColor:"#23528b"}]} >
          <Text style = {{color:'transparent'}}>fdddfd</Text>
            <Input placeholder='Add a Message (Optional)' placeholderTextColor="#23528b" style={{color:'#23528b',fontFamily: 'Roboto-Light',fontSize:15}} 
            
            onChangeText={(msg)=>this.setState({msg})}
           
           />
          </Item>      
    </View>
  
    </ImageBackground>
    <Footer style = {{color:'#dce0e6',
      backgroundColor:'#e46c0b'}}>
    <TouchableWithoutFeedback onPress= {()=>{ this.props.navigation.navigate('afterPay' )}}>
                <Text style = {{color:'white',fontFamily:'Roboto-Medium ',fontSize:18,fontWeight:'800',padding:15}}>PAY NOW</Text>
                </TouchableWithoutFeedback>
              </Footer>
     </Container>
   
    );
  }
}
 
const styles = StyleSheet.create({
 
inputitem:{

width:'80%',
},
});
 
