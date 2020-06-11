import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  StatusBar,Image,
  TouchableWithoutFeedback, BackHandler,ActivityIndicator,FlatList,Modal
} from 'react-native';

import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Header,Body,Title,Thumbnail, Content,CheckBox,ListItem,List} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Shimmer from '../../Common/Service/Shimmer';
import {toastr} from '../../Common/Screens/LoginScreen'

export default class PaymentReqest extends React.Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-wallet" style={{ color:tintColor,fontSize:30 }} />
        )
    }

    constructor(props){
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state ={
term:false,
payments:[],loading:true,
myBalance:'0',
reachEnd:false,page:'1',
refreshing:false,
isVisible:true,
Alert_Visibility:false,
uid:'',
rejectPayment:[],
session_id:"",
    }
}

componentWillUnmount() {
  clearInterval(this.timer)
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

}
componentDidMount = async() => {
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  const value = await AsyncStorage.getItem('uid')
  const session_id = await AsyncStorage.getItem('session_id')
  this.setState({uid:value,isVisible:false,loadiing:true,session_id:session_id})

 try {
    this.timer =  setInterval(async () =>this.PaymentHistory()
    ,4000);    
  } catch(e) {
    console.log(e);
  }}

handleBackButtonClick() {
clearInterval(this.timer)
 this.props.navigation.goBack(null);
  return true;
}

 PaymentHistory = async()=>{
  const { uid }  = this.state ;
  let formdata = new FormData();
  formdata.append("uid",uid);
  formdata.append("session_id", this.state.session_id);
await fetch('https://www.markupdesigns.org/paypa/api/pendingPaymentList', {
  method: 'POST',
  headers: {
   'Content-Type': 'multipart/form-data',
  },
  body: formdata
 
}).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.status ==="Failure"){
          console.log(responseJson.msg)
          this.setState({empty:true,loading: false, refreshing: false, reachEnd: false,isVisible:true})
        }
        else{
          let Rdata = responseJson['data']
        console.log(JSON.stringify(Rdata))
          this.setState({payments:Rdata,  loading: false, refreshing: false, reachEnd: false,isVisible:true,empty:false})
      }
          }).catch((error) => {
        console.error(error);
      });
    
 }
 AcceptAllPayments = async()=>{
  let formdata = new FormData();
  formdata.append("reciverID",this.state.uid); 
  formdata.append("session_id", this.state.session_id); 
await fetch('https://www.markupdesigns.org/paypa/api/paymentAcceptAll', {
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
     
          toastr.showToast(responseJson.msg)
          this.setState({loading:false,isVisible:true,})
    this.PaymentHistory()
      }
          }).catch((error) => {
        console.error(error);
      });
    


 }
 Accept = async(item)=>{
let formdata = new FormData();
    formdata.append("invID",item.invid);
    formdata.append("senderID",item.sid);
    formdata.append("reciverID",item.rid);
    formdata.append("type",'accept');
    formdata.append("session_id", this.state.session_id);
  await fetch('https://www.markupdesigns.org/paypa/api/paymentAcceptReject', {
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
            toastr.showToast("Payment Accepted")
            this.setState({loading:false,isVisible:true,})
      this.PaymentHistory()
        }
            }).catch((error) => {
          console.error(error);
        });
      
   }

   Reject = async(item)=>{
    let formdata = new FormData();
        formdata.append("invID",item.invid);
        formdata.append("senderID",item.sid);
        formdata.append("reciverID",item.rid);
        formdata.append("type",'reject');
        formdata.append("msg",this.state.message);
        formdata.append("session_id", this.state.session_id);    
      await fetch('https://www.markupdesigns.org/paypa/api/paymentAcceptReject', {
        method: 'POST',
        headers: {
         'Content-Type': 'multipart/form-data',
        },
        body: formdata
      }).then((response) => response.json())
            .then((responseJson) => {
             this.setState({loading:false})
              if(responseJson.status ==="Failure"){
                alert(responseJson.msg)
              }
              else{
                toastr.showToast("Payment Rejected")
                this.setState({loading:false,Alert_Visibility:false,isVisible:true,},()=>this.PaymentHistory())
            }
                }).catch((error) => {
              console.error(error);
            });
        
       }
   FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#d9dbda",
        }}
      />
    );
  }
   handleRefresh = () => {

    this.setState({ refreshing: true }, () => {
      this.PaymentHistory();
    })
  }
  handleLoadMore = () => {
    this.setState({
      result: this.state.page + 1, reachEnd: true,
    }, () => {
      this.PaymentHistory();
    })
  }

  ok_Button=()=>{
 
   this.Reject(this.state.rejectPayment)
            
  }
  
    render(){

  return (
   
 <Container style ={{backgroundColor:'#e8edf1'}}>
    <Header  style={{backgroundColor:'#1c4478'}}>
    <StatusBar barStyle="light-content" backgroundColor="#1c4478" />
          <Left style ={{flex:1}}>


          </Left>
          <Body style ={{flex:1,alignItems:'center'}} >
           <TouchableOpacity onPress = {this.getData}>
          <Text style={{  color: 'white', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Payments Received</Text>
          </TouchableOpacity>
          </Body>

          <Right style ={{flex:1,}}>
          <Button  transparent onPress = {this.AcceptAllPayments}>
            <Text style ={{color:'#e46c0b',fontWeight:'bold'}}>ACCEPT ALL</Text>
          </Button>
           
           
          </Right>
       
       
        </Header>
 <Content>
 <Modal
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          visible={this.state.Alert_Visibility}
          transparent={true}
           animationType={"fade"}
          onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } >
            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0.2, 0.7)'}}>
                <View style={styles.Alert_Main_View}>
                    {this.state.msg?<Text style={styles.Alert_Title}>Opps!! </Text>:<Text style={styles.Alert_Title}>Cancel Payment </Text>}
 
                    <Item  regular style ={styles.InputItem} >
<Input placeholder='Reason of Cancel' placeholderTextColor="#797b7d" 
style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}} 
value = {this.state.message}
onChangeText={(message)=>this.setState({message})}

/>
               </Item>                
                </View>
                <View style={{flexDirection: 'row',height:'10%',width:'70%'}}>
 <TouchableOpacity 
     style={styles.buttonStyleFull} 
     onPress={this.ok_Button} 
     activeOpacity={0.7} 
     >
    {this.state.msg?<Text style={styles.TextStyle}> OK</Text>:<Text style={styles.TextStyle}> Cancel</Text>}
 </TouchableOpacity>

</View>
 </View>
</ Modal >
<View style={{ position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center'}}>
  <ActivityIndicator
               animating = {this.state.loading}
               color = '#1c4478'
               size={"large"}
               
              />
              </View>

             {this.state.loading ? <ActivityIndicator
          animating={this.state.loading}
          color='#1c4478'
          size={"large"}
          style={{ paddingHorizontal: 50, alignItems: 'center' }} /> : 
        this.state.payments.length ===0 || this.state.empty ?
         <Text style = {{textAlign:'center'}}>No payments received yet</Text> :
            
              <FlatList
            data={this.state.payments}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            extraData= {this.state}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={1}
            ListFooterComponent={<ActivityIndicator
              animating={this.state.reachEnd}
              color='#1c4478'
              size={"large"}
            />}
            renderItem = {({item})=>
            <List >
           
            <ListItem noBorder avatar style ={{marginLeft: 5}} >
            <Left>
                
                <Shimmer autoRun={true} style={styles.imagew} visible={this.state.isVisible}>
                <Thumbnail source={ item.pic?{ uri: "https://www.markupdesigns.org/paypa/" + item.pic}:require('../../img/common/profile.png')}  />
                  </Shimmer>
                </Left>
                              <Body>
                              <TouchableOpacity onPress={()=>{this.openDetails(item)}}>
                              <Shimmer autoRun={true} visible={this.state.isVisible}>
                             
                                <View style={{flexDirection:'column'}}> 
              <Text style ={{fontSize:13}}>{item.fname+ " " + item.sname}</Text>
                              <Text style ={{fontSize:15,color:'#1c4478'}}>R{item.amount}</Text>
                              {/* <Text style ={{fontSize:13}}> Sam boy</Text>
                              <Text style ={{fontSize:15,color:'#1c4478'}}>R36</Text> */}
                               </View>
                              </Shimmer>
                               </TouchableOpacity>
                               </Body>
                               <Right >
                               <Shimmer autoRun={true} visible={this.state.isVisible}>
                                   <View style = {{flexDirection:'row'}}>

                                   <TouchableOpacity onPress={()=>{ this.Accept(item)}}>
                               <Icon name="md-checkmark" style={{ color: 'green', fontSize: 25, padding: 8 }} />
               </TouchableOpacity>

               <TouchableOpacity  onPress={()=>{ this.setState({Alert_Visibility: true,rejectPayment:item})}}>
                               <Icon name="md-close" style={{ color: 'red', fontSize: 25, padding: 8 }} />
               </TouchableOpacity>
                                   </View>
                              
               </Shimmer>
                              </Right>
                              
                            </ListItem>
                            
            </List>

  }

            />}
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
 },
 imagew: {
  width: 80,
  height: 80
},
mcontent: {
  marginTop: 8,
  marginBottom: 8
},
Alert_Main_View:{
 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : "white",
     
    height: 200 ,
    width: '70%',
  
    borderColor: '#1c4478',
    borderRadius:7,
    
  },
   
  Alert_Title:{
   
    fontSize: 22, 
    color: "black",
    textAlign: 'center',
    padding: 5,
    height: '35%',
    fontFamily:'Roboto-Medium'
   
  },
   
  Alert_Message:{
   
  
      fontSize: 18, 
     
      textAlign: 'center',
      padding: 10,
     
      fontFamily:'Roboto-Light'
    },
   
  buttonStyleFull: {
      
    width:'100%',
    backgroundColor:'#1c4478',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
   marginVertical:3,
   
   
    borderRadius:7,
  },
  buttonStyle: {
      
    width:'48%',
    backgroundColor:'#1c4478',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
   margin:3,
   
   
    borderRadius:7,
  },
     
  TextStyle:{
      color:'white',
      textAlign:'center',
      fontSize: 16,
      marginTop: -5, fontFamily:'Roboto-Medium'
      
  },
  InputItem:{

    backgroundColor:'white',
    width:'90%',
    borderColor:'grey',
  alignSelf:'center',
  borderRadius:8
   },
});


