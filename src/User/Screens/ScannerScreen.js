const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
 
import React from 'react';
import {View,
  AppRegistry,
  StyleSheet,
 StatusBar,ActivityIndicator,
 Dimensions,FlatList,TouchableHighlight,TouchableOpacity ,TouchableWithoutFeedback,Image
 
} from 'react-native';
 
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Header,Body,Title, Content,CheckBox,Thumbnail ,List,ListItem} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions, StackActions,withNavigationFocus } from 'react-navigation';
import Shimmer from '../../Common/Service/Shimmer';
import {toastr} from '../../Common/Screens/LoginScreen'
 class ScannerScreen extends React.Component {


    constructor(props){

        super(props);
   
    this.state ={

result:"",
ScanResult:false,
scan:false,
loading:false,
data:[],
page:'1',
myBalance:'',
paypamoney:'',
limitbal:'',
rid:'',
isVisible:true,msg:'',
empty:false,
mobile:''
    }
}

onSuccess = async(e) => {
 
    this.setState({loading:true})
 
  console.warn("hjgj",e.data)
let formdata = new FormData();
let data= e.data
let bid = data.split(",")[0]
let staff_id = data.split(",")[1]
console.log("bid"+bid + "stsff"+staff_id)
  formdata.append("id",bid);
  formdata.append("session_id", this.state.session_id);
 
await fetch('https://www.markupdesigns.org/paypa/api/getBusinessDataQR', {
  method: 'POST',
  headers: {
   'Content-Type': 'multipart/form-data',
  },
  body: formdata
 
}).then((response) => response.json())
      .then((responseJson) => {
       console.warn(responseJson)
       
        if(responseJson.status ==="Failure"){
          alert(responseJson.msg)
          this.setState({loading:false})
        }
        else{
          console.log("enter")
          let id = responseJson['data']['id']
          let name = responseJson['data']['name'] 
         this.setState({loading:false})
          this.props.navigation.navigate('pay',{
            id:id,
            name:name,
            staff_id:staff_id
            
          })
      
      }}).catch((error) => {
        console.error(error);
      });
}



PayWithMobile = async()=>{
  if(this.state.mobile.length<10)
  {
    toastr.showToast('Please enter valid cell number');
return false
  }else if(this.state.mobile === this.state.mymobile){

    alert('Cannot pay own number, please enter another number');
  }
  else{

    this.setState({loading:true})
    let formdata = new FormData();
    let mobile =  this.state.mobile
  formdata.append("mobile",mobile);
  formdata.append("session_id", this.state.session_id);
 
await fetch('https://www.markupdesigns.org/paypa/api/getUserDetails', {
  method: 'POST',
  headers: {
   'Content-Type': 'multipart/form-data',
  },
  body: formdata
 
}).then((response) => response.json())
      .then((responseJson) => {
       console.warn(responseJson)
        if(responseJson.status ==="Failure"){
          alert(responseJson.msg)
          this.setState({loading:false})
        }
        else{
          let id = responseJson['data']['id']
          let name = responseJson['data']['name'] 
         this.setState({loading:false})
          this.props.navigation.navigate('PayWithMobile',{
            id:id,
            name:name, 
          })
      
      }}).catch((error) => {
        console.error(error);
      });

  }
    
}
PaymentHistory = async()=>{
  this.setState({loadiing:true})
    const { uid }  = this.state ;
    const { page }  = this.state ;
    let formdata = new FormData();
    formdata.append("uid",uid);
    formdata.append("session_id", this.state.session_id);
    
  await fetch('https://www.markupdesigns.org/paypa/api/recentPaymentHistory', {
    method: 'POST',
    headers: {
     'Content-Type': 'multipart/form-data',
    },
    body: formdata
   
  }).then((response) => response.json())
        .then((responseJson) => {
         this.setState({loading:false,refreshing:false})
          console.log("his " + JSON.stringify(responseJson))
         
          if(responseJson.status ==="Failure"){
           this.setState({msg:responseJson.msg,empty:true})
          }
          else{
            let Rdata = responseJson['data']
           
            let final  = Rdata.slice(0,8)
          console.log(JSON.stringify(Rdata))
            this.setState({loading:false,data:final , reachEnd: false,})
            setTimeout(()=> {
              this.setState({
                 isVisible:true
              });
          }, 3000);
        }
            }).catch((error) => {
          console.error(error);
        });
      
   }
   componentDidMount = async() => {
  
  
    const value = await AsyncStorage.getItem('uid')
    const mobile = await AsyncStorage.getItem('mobile')
    const session_id = await AsyncStorage.getItem('session_id')
    console.log("movile",mobile)
   await this.setState({uid:value,mymobile:mobile,isVisible:false,session_id:session_id},()=> this.PaymentHistory())
    
   console.warn("userid",value)
   await this.GetBalance();
    //Checking for the permission just after component loaded
   }
   GetBalance = async()=>{
    this.setState({loadiing:true})
     
      const { uid }  = this.state ;
     
      let formdata = new FormData();
    
      formdata.append("uid",uid);
      formdata.append("session_id", this.state.session_id);
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
              let bal = parseFloat(responseJson.paypamoney)
              let rbal = parseFloat(responseJson.recviedmoney)
             let total = bal + rbal;
              this.setState({loading:false,myBalance:total.toFixed(2),limitbal:bal.toFixed(2),paypamoney:rbal.toFixed(2)})
        
          }
              }).catch((error) => {
            console.error(error);
          });
        
     }
   openDetails = async(data) => {
    await this.props.navigation.navigate('pay',{
              id:data.rid,
              name:data.name 
  
            }).catch((error) => {
          console.error(error);
        });
  };
  render() {
 if(this.state.loading){
   return(
   
   <View style={{ position: 'absolute',
   left: 0,
   right: 0,
   top: 0,
   bottom: 0,
   alignItems: 'center',
   justifyContent: 'center'}}>
     {/* <Header androidStatusBarColor="#1c4478"  style={{backgroundColor:'#1c4478'}}>
       </Header> */}
   <ActivityIndicator
                animating = {this.state.loading}
                color = '#1c4478'
                size={"large"}
                
               />
              
               </View>)
 }
    return (
      <Container style = {{flex:1,backgroundColor:'#e8edf1',}}>
       
      <Header androidStatusBarColor="#1c4478"  style={{backgroundColor:'#1c4478'}}>
      <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
            <Left style ={{flex:1}}>
            <TouchableOpacity onPress = {()=>this.props.navigation.goBack(null)} style ={{padding:5}}>
            <Icon name='md-arrow-back'  style={{color:'white',fontSize:25}}/>
            </TouchableOpacity>
            </Left>
          <Body style ={{flex:1,alignItems:'center'}}>
          <Text  style = {{color:'white',fontSize:18,fontFamily:'Roboto-Medium'}}>Scan & Pay</Text>
          </Body>
           
           <Right style ={{flex:1}}>
           </Right>
          </Header>
          <Header androidStatusBarColor="#1c4478"  style={{ backgroundColor: '#1c4478' }} searchBar rounded noLeft noShadow>
          <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
                  <Item>
                      <Input placeholder="Enter Cell Number to Pay" value = {this.state.mobile}   onChangeText={mobile => this.setState({mobile})}
          selectTextOnFocus={true}
                       keyboardType="numeric" maxLength={10}
                      />
                      
                  </Item>
                  <Right style={{ backgroundColor: '#e26d0e', maxWidth: 45, marginLeft: 10, justifyContent: 'center', marginRight: 5 }}>
              
                  <TouchableWithoutFeedback style ={{backgroundColor:'#e26d0e',margin:5}} onPress ={this.PayWithMobile }>
                  <Icon name="md-search" style={{fontSize:25,padding:6,color:'white'}}/>
        {/* <Icon name="ios-outline-funnel" style={{fontSize:25,padding:6,color:'white',backgroundColor:'#e26d0e'}}/> */}
      </TouchableWithoutFeedback>
                  </Right>
              </Header>
              <Header style={{ backgroundColor: 'transparent',height:120 }} searchBar rounded noLeft noShadow>
              {   this.state.data.length ===0 || this.state.empty ?
       <Text style = {{fontWeight:'bold',paddingHorizontal:10}}>No Recent payments</Text>: 
       <View>
<Text style = {{fontWeight:'bold'}}> Recents</Text>
       <FlatList
       data={this.state.data}
       horizontal = {true}
       renderItem={({ item,index }) => (
         <View style={{  flex:1,padding:5}}>
          
           
           <TouchableHighlight
  
 onPress = {()=>{this.openDetails(item)}}
 ><Shimmer autoRun={true} style={styles.imagew} visible={this.state.isVisible}>
  <Thumbnail source={ item.pic?{ uri: "https://www.markupdesigns.org/paypa/" + item.pic}:require('../../img/common/profile.png')}  style = {{}} />
  </Shimmer>
  </TouchableHighlight>
  <Shimmer autoRun={true} visible={this.state.isVisible} style = {{alignSelf:'center',color:'grey',fontSize:35,fontWeight:'600',height:10,width:30}}>
   <Text style ={{ fontFamily:'Roboto-Medium',fontSize:13,paddingLeft:10,}} > {item.name.split(" ")[0]} </Text>

        </Shimmer>  
         </View>
       )}
       //Setting the number of column
       style={{padding:5}}
       extraData={this.state.images}
       keyExtractor={(item, index) => index.toString()}
     />
     
       </View>
     }    
                     

              </Header>
   <Content >
  
  <View>

    {this.props.isFocused?
<View>
<QRCodeScanner
checkAndroid6Permissions= {true}
markerStyle = {styles.markStyle}
reactivateTimeout = {3}
                            reactivate={true}
                            showMarker={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                            bottomContent={
                                <View style={{padding:5}}>
                                        <Text style={{color:'white',fontSize:18,fontFamily:'Roboto-Medium',padding:10}}>Scan PayPa QR Code</Text>
                                        <Text style={{color:'#e46c0b',fontSize:16,fontFamily:'Roboto-Medium',bottom:4,textAlign:'center'}}>Total Available Balance R {this.state.myBalance} </Text> 
                                </View>
                               

                            }
                            bottomViewStyle={{marginBottom:12}}
                        />
                       </View>
                
                      :null}  


    </View>
                     
        
                     


    </Content>
    
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
 markStyle:{

  borderColor:'#1c4478',
  borderWidth:2

 },
 imagew: {
  width: 50,
  height: 50,
  borderRadius:50/2
},
});
 
export default withNavigationFocus(ScannerScreen)