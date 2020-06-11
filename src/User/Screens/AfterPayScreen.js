const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
 
import React from 'react';
import {View,
  AppRegistry,
  StyleSheet,
 StatusBar,
  TouchableOpacity,BackHandler,Dimensions,Image,
  Linking,TouchableHighlight
} from 'react-native';
 
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Header,Body,Title, Content,CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import { NavigationActions, StackActions,withNavigationFocus } from 'react-navigation';

export default class AfterPayScreen extends React.Component {


    constructor(props){

        super(props);
   
    this.state ={

result:"",
ScanResult:false,
scan:false
    }
    this.goToHome= this.goToHome.bind(this);
}

goToHome(){
 
  
//   const resetAction = StackActions.reset({
//     index: 0,
//     key: null,
//     actions: [NavigationActions.navigate({ routeName: 'Home' })],
// });
this.props.navigation.navigate('UWallet');
   
     
}
  render() {
    const { navigation } = this.props;
    return (
        <Container style = {{backgroundColor:'#1c4478',}}>
        <Header  style={{backgroundColor:'#1c4478'}} noShadow>
            <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
              
           
            <Text style={{alignSelf:'center',color:'white',fontSize:18,fontFamily:'Roboto-Medium'}}>Paid</Text>
           
             
            </Header>
    
   <View style={{alignItems:'center',flexDirection:'column',flex:1,}}>
  
  
<View style={{padding:30,justifyContent:'center'}}>
<Image source={require('../../img/user/paid.png')} style={{maxHeight:130,resizeMode: 'contain',}} />
<Text style ={{color:'white', fontFamily:'Roboto-Light',fontSize:35,textAlign:'center'}}>
         Success!
        </Text>
        </View>
        <View style={{padding:30}}>
        <Text style ={{color:'white', fontFamily:'Roboto-Light',fontSize:16,}}>
         You have just paid
        </Text>
        <View style={{flexDirection:"row",padding:10}}>
        <Text style ={{color:'white', fontFamily:'Roboto-Light',fontSize:22,}}>
        R 
        </Text>
        <Text style ={{color:'white', fontFamily:'Roboto-Light',fontSize:30,paddingLeft:10}}>
       {this.props.navigation.state.params.amount} 
        </Text>
        </View>

</View>
   
        <TouchableHighlight
      style = {{
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.25,
        height: Dimensions.get('window').width * 0.25,
        backgroundColor:'transparent',
        justifyContent: 'center',
        borderColor:'white',
        borderWidth:1,
        alignItems: 'center'
      }}
      underlayColor = '#ccc'
      onPress = { this.goToHome}
    >
      <Text style ={{color:'white', fontFamily:'Roboto-Light',fontSize:30,}} > OK </Text>
    </TouchableHighlight>




   </View>
     
 
                      
   
    {/* <Footer style = {{color:'#dce0e6',
      backgroundColor:'#e46c0b'}}>
    <TouchableWithoutFeedback onPress= {this.onScan}>
                <Text style = {{color:'white',fontFamily:'Roborto ',fontSize:18,fontWeight:'800',padding:15}}>PAY NOW</Text>
                </TouchableWithoutFeedback>
              </Footer> */}
     </Container>
    );
  }
}
 
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
    backgroundColor:'#e46c0b'
  },
  body: {
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    fontSize:18,
  },
 InputItem:{

  backgroundColor:'white',
  width:'90%',
  borderColor:'white',
alignSelf:'center',
borderRadius:8
 },
 scanCardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white'
},
cardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 2,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white'
},
});
 
