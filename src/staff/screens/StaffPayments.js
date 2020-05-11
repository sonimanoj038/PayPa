import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  StatusBar,Image,
  TouchableWithoutFeedback, BackHandler,ActivityIndicator,FlatList
} from 'react-native';

import Moment from 'moment';
import QRCode from 'react-native-qrcode-svg';
import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Header,Body,Title,Thumbnail, Content,CheckBox,ListItem,List} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Shimmer from '../../Common/Service/Shimmer';
import { NavigationActions, StackActions,withNavigationFocus } from 'react-navigation';

 class StaffPayments extends React.Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-wallet" style={{ color:tintColor,fontSize:30 }} />
        )
    }
    constructor(props){

        super(props);
   
    this.state ={

term:false,
payments:[],loading:true,
myBalance:'0',
reachEnd:false,page:'1',
refreshing:false,
isVisible:true,
empty:false,
msg:'',
    }
}



componentDidMount = async() => {
 
  const value = await AsyncStorage.getItem('id')
   console.log(value)
  this.setState({uid:value,isVisible:false},()=>this.PaymentHistory())
  

  //Checking for the permission just after component loaded
 


 }


 PaymentHistory = async()=>{
this.setState({loadiing:true})
 
  const { uid }  = this.state ;
  const { page }  = this.state ;
 
  let formdata = new FormData();

  formdata.append("staff_id",uid);
  formdata.append("page",1);
  
await fetch('https://www.markupdesigns.org/paypa/api/staffPaymentHistory', {
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
          this.setState({empty:true,msg:responseJson.msg})
         
        }
        else{
          let Rdata = responseJson['data']
        console.log(JSON.stringify(Rdata))
          this.setState({loading:false,payments:Rdata, reachEnd: false,isVisible:true,empty:false})
    
      }
          }).catch((error) => {
        console.error(error);
      });
    
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
            this.setState({empty:true,msg:responseJson.msg})
          }
          else{
            let bal = responseJson.amount
          
            this.setState({loading:false,myBalance:bal,isVisible:true,empty:false})
      
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



  openDetails = (data) => {
   
    alert(data.comment)
  };
 
    render(){

  return (
   
 <Container style ={{backgroundColor:'#e8edf1'}}>
    <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
       <Text style = {{alignSelf:'center',color:'white',fontSize:18,fontWeight:'bold'}}>Payments Received</Text>
        
       
        </Header>
 <Content>



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
             {this.state.empty?<View style ={{}}>
               <Text style = {{alignItems:'center',textAlign:'center',fontSize:20,paddingTop:20}}>{this.state.msg}</Text>
               <TouchableOpacity onPress = {this.PaymentHistory}>
               <Text style = {{alignItems:'center',textAlign:'center',fontSize:20,padding:5,color:'red'}}>Reload</Text>
               </TouchableOpacity>
               
               </View>:
             <FlatList
             data={this.state.payments}
             ItemSeparatorComponent={this.FlatListItemSeparator}
             refreshing={this.state.refreshing}
             onRefresh={this.handleRefresh}
             onEndReached={this.handleLoadMore}
             // onEndReachedThreshold={20}
             ListFooterComponent={<ActivityIndicator
               animating={this.state.reachEnd}
               color='#1c4478'
               size={"large"}
             />}
             style={{marginHorizontal:7}}
             renderItem = {({item})=>
             <List >
            
             <ListItem noBorder avatar style ={{marginLeft: 5}} >
             <Left>
                 
                 <Shimmer autoRun={true} style={styles.imagew} visible={this.state.isVisible}>
                 <Thumbnail source={ item.pic?{ uri: "https://www.markupdesigns.org/paypa/" + item.pic}:require('../../img/common/profile.png')}  />
                   </Shimmer>
                 </Left>
                               <Body>
                               
                               <Shimmer autoRun={true} visible={this.state.isVisible}>
                              
                                 <View style={{flexDirection:'column'}}> 
               <Text style ={{fontSize:15}}>{item.name}</Text>
                               <Text style ={{fontSize:12,color:'grey'}}>{Moment(item.is_created).format('MM, YYYY H:mma')}</Text>
                                </View>
                               </Shimmer>
                              
                                </Body>
                                
                                <Right style={{flex:1,justifyContent:'center'}}>
                                <Shimmer autoRun={true} visible={this.state.isVisible}>
                                <TouchableOpacity onPress={()=>{this.openDetails(item)}}>
                <Text style={{color:'#1c4478',fontSize:18}}>R{item.amount}</Text>
                </TouchableOpacity>
                </Shimmer>
                               </Right>
                               
                             </ListItem>
                             
             </List>
 
   }
 
             />
             }
              
  
              



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
}
});


 
export default withNavigationFocus(StaffPayments)