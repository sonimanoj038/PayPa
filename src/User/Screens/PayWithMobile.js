const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
 
import React from 'react';
import {View,
  AppRegistry,
  StyleSheet,
 StatusBar,
 ActivityIndicator,Dimensions,Image,ImageBackground,ProgressBarAndroid,Modal,
  Linking,TouchableWithoutFeedback,TouchableOpacity,Alert
} from 'react-native';
 
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Header,Body,Title, Content,CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {toastr} from '../../Common/Screens/LoginScreen'
import { NavigationActions, StackActions,withNavigationFocus } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
export default class PayWithMobile extends React.Component {


    constructor(props){

        super(props);
   
    this.state ={

result:"",
msg:'',
amount:null,
expdate:'',
uid:'11',
loading:false,
myBalance:'',
rbal:'',
loading2:false,
status:1,
Alert_Visibility:false
    }
}

validateInput = ()=>{
  const {amount }  = this.state ;
  const { mobile }  = this.state ;
  const {type} = this.state;
if(amount ===null){

toastr.showToast("Enter Amount to pay")
return false;
}
else if(amount<10){
toastr.showToast("Please enter amount of R10 or more")
return false;
}
else
this.setState({disabled:false})
return true;
}

componentDidMount = async() => {
  
  const value = await AsyncStorage.getItem('uid')

 await this.setState({uid:value,loading2:true},()=>this.GetBalance())
 console.warn("userid",value)
  //Checking for the permission just after component loaded
 }

 ConfirmFirst = ()=>{

  if(this.validateInput()){

 Alert.alert(
      //title
      'Confirm',
      //body
      'Pay R'+ this.state.amount +' to '+ this.props.navigation.state.params.name +'?',
      [
        { text: 'Yes', onPress: () => this.PayAmount() },
        {
          text: 'No',
          onPress: () =>this.setState({loading:false}),
          style: 'cancel',
        },
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  }
  }
  


 GetBalance = async()=>{
 
   
    const { uid }  = this.state ;
   
    let formdata = new FormData();
  
    formdata.append("uid",uid);
    
  await fetch('https://www.markupdesigns.org/paypa/api/myBalance', {
    method: 'POST',
    headers: {
     'Content-Type': 'multipart/form-data',
    },
    body: formdata
   
  }).then((response) => response.json())
        .then((responseJson) => {
         this.setState({loading:false})
          console.log("bal " + JSON.stringify(responseJson))
         
          if(responseJson.status ==="Failure"){
            alert(responseJson.msg)
          }
          else{
            let bal = responseJson.paypamoney;
            let rbal = responseJson.recviedmoney
            let xdte = responseJson.expdate   
            this.setState({loading:false,myBalance:bal,isVisible:true,rbal:rbal,expdate:xdte,loading2:false})
      
        }
            }).catch((error) => {
          console.error(error);
        });
      
   }


 PayAmount = async()=>{
  this.setState({loading:true})
  const { uid }  = this.state ;
  const { amount }  = this.state ;
  const { msg}  = this.state ;
  let formdata = new FormData();
  formdata.append("reciverID",this.props.navigation.state.params.id);
  formdata.append("senderID",uid);
  formdata.append("amount",amount);
  formdata.append("msg",msg);
  formdata.append("staff_id",this.props.navigation.state.params.staff_id);
await fetch('https://www.markupdesigns.org/paypa/api/paymentWithMobile', {
  method: 'POST',
  headers: {
   'Content-Type': 'multipart/form-data',
  },
  body: formdata
 
}).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
       this.setState({loading:false})
        console.log("dataaaa " + JSON.stringify(responseJson))
       
        if(responseJson.status ==="Failure"){
          alert(responseJson.msg)
        }
        else{
          this.setState({loading:false})
          let data = responseJson['data']['amount']
          this.props.navigation.navigate('afterPay',{
            amount:this.state.amount,
          })
    
      }
          }).catch((error) => {
        console.error(error);
      });
    
 
 }
 ok_Button=()=>{
 
  this.setState({Alert_Visibility: false});
  this.props.navigation.goBack(null)


}
  render() {
    const { navigation } = this.props;
   if(this.state.loading2 ===true) {
   return<View style={{ position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center'}}>
  <ActivityIndicator
               animating = {this.state.loading2}
               color = '#1c4478'
               size={"large"}
               
              />
              </View>
   }
    return (
    
        <Container>
        <Header    style={{backgroundColor:'#1c4478'}}>
            <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
              <Left style ={{flex:1}}>
              <TouchableOpacity onPress = {()=>{this.props.navigation.goBack()}}>
              <Icon name='md-arrow-back'  style={{color:'white',fontSize:25}}/>
              </TouchableOpacity></Left>
             <Body style ={{flex:1}}>
              <Text  style = {{color:'white',fontSize:17,fontFamily:'Roboto-Medium'}}>Amount To Pay</Text>
             </Body>
           <Right/>
            </Header>

            <Modal
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          visible={this.state.Alert_Visibility}
          transparent={true}
 
          animationType={"fade"}
 
          onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } >
 
 
            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0.2, 0.7)'}}>
 
 
                <View style={styles.Alert_Main_View}>
                <Image source={require('../../img/common/sucess.png')} style={{maxHeight:50,resizeMode: 'contain'}} />
                    <Text style={styles.Alert_Title}>Success</Text>
                    <Text style={styles.Alert_Message}>Payment has been sent successfuly </Text>
                  
                  
                </View>
                <View style={{flexDirection: 'row',height:'10%',width:'70%'}}>
 
 
 <TouchableOpacity 
     style={styles.buttonStyle} 
     onPress={this.ok_Button} 
     activeOpacity={0.7} 
     >

     <Text style={styles.TextStyle}> OK</Text>

 </TouchableOpacity>

</View>
            </View>
 
 
        </ Modal >
            <ImageBackground  source={require('../../img/common/wallet_bg.png')}  style={{ 
        flex:1,
        width: null,
        height: null,
       justifyContent:'space-evenly'
      }} >
     <View style={{ alignItems:'center',flex:2.5}}>
   
   <View style={{padding:10,alignItems:'center'}}>
      <Text style ={{color:'white', fontFamily:'Roboto-Medium',fontSize:18,textAlign:'center'}}>
      Limit Balance
      </Text>
      <View style={{flexDirection:"row",paddingVertical:5,alignItems:'center'}}>
      <Text style ={{color:'#e46c0b', fontFamily:'Roboto-Light',fontSize:18,textAlign:'center',paddingHorizontal:2}}>
      R  
      </Text>
      <Text style ={{color:'#e46c0b', fontFamily:'Roboto-Light',fontSize:18 ,textAlign:'center'}}>
   {""+ this.state.myBalance}
      </Text>
      </View>
      </View>
      <View style={{padding:10,alignItems:'center'}}>
      <Text style ={{color:'white', fontFamily:'Roboto-Medium',fontSize:18,textAlign:'center'}}>
      PayPa Bucks
      </Text>
      <View style={{flexDirection:"row",paddingVertical:5,alignItems:'center'}}>
      <Text style ={{color:'#e46c0b', fontFamily:'Roboto-Light',fontSize:18,textAlign:'center',paddingHorizontal:2}}>
      R  
      </Text>
      <Text style ={{color:'#e46c0b', fontFamily:'Roboto-Light',fontSize:18 ,textAlign:'center'}}>
   {""+ this.state.rbal}
      </Text>
      </View>
      </View>
      <View style={{alignItems:'center'}}>
      {this.state.expdate !==""?<Text style ={{color:'white', fontFamily:'Roboto-Light',fontSize:15,textAlign:'center'}}>  Your Wallet Balance will expire on <Text style ={{color:'#e46c0b', fontFamily:'Roboto-Light',fontSize:15,textAlign:'center'}}>{this.state.expireDate}{Moment(this.state.expdate).format('DD,MMMM, YYYY')}</Text></Text>:null}
     
</View>


</View>
<Text style ={{color:'#e46c0b', fontFamily:'Roboto-Medium',fontSize:20,textAlign:'center',fontWeight:'bold'}}>
{this.props.navigation.state.params.name}
        </Text>
      <Text></Text>
<View style={{ alignItems:'center',flex:4}}>             
        <Item  rounded style ={[styles.inputitem,{borderColor:"#23528b"}]}   >
<Image source={require('../../img/common/payment-r.png')} />

            <Input placeholderTextColor="#23528b" style = {{color:'#23528b',fontFamily: 'Roboto-Medium',fontSize:18}}
           onChangeText={(amount)=>this.setState({amount})}
            keyboardType="numeric" placeholder='Enter Amount' maxLength={6} />
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
    <TouchableWithoutFeedback onPress= {this.ConfirmFirst }>
    {this.state.loading?<ActivityIndicator
               animating = {this.state.loading}
               color = 'white'
               size={"large"}
               style ={{paddingHorizontal:50,alignItems:'center',width:'100%'}}
              />:
                <Text style = {{color:'white',fontFamily:'Roboto-Medium ',fontSize:18,fontWeight:'800',padding:15}}>PAY NOW</Text>}
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
TextStyle:{ color:'black',
textAlign:'center',
fontSize: 18,
 fontFamily:'Roboto-Medium'
} ,Alert_Main_View:{
 
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
  height: '28%',
  fontFamily:'Roboto-Medium'
 
},
 
Alert_Message:{
 
    fontSize: 22, 
    color: "black",
    textAlign: 'center',
    padding: 10,
    height: '42%',
    fontFamily:'Roboto-Light'
  },
 
buttonStyle: {
    
  width:'100%',
  backgroundColor:'#1c4478',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
 marginVertical:5,
 
 
  borderRadius:7,
},
   
TextStyle:{
    color:'white',
    textAlign:'center',
    fontSize: 23,
    marginTop: -5, fontFamily:'Roboto-Medium'
    
},

});
 
