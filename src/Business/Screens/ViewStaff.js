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
import {toastr} from '../../Common/Screens/LoginScreen'

export default class ViewStaff extends React.Component {

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
isVisible:true
    }
}



componentDidMount = async() => {
 
  const value = await AsyncStorage.getItem('uid')
   
  this.setState({uid:value,isVisible:false,loadiing:true},()=>this.PaymentHistory())
  
//  console.warn("userid",value)

//  try {
//    const timer =  setInterval(async () => this.PaymentHistory()
//     ,2000);
//   } catch(e) {
//     console.log(e);
//   }
// //  await this.GetBalance();
//   //Checking for the permission just after component loaded
 
// clearInterval(timer)

//  }

}
 PaymentHistory = async()=>{

  const { uid }  = this.state ;
 
  let formdata = new FormData();

  formdata.append("bid",uid);
 
 
  
await fetch('https://www.markupdesigns.org/paypa/api/staffList', {
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
          console.log(responseJson.msg)
        }
        else{
          let Rdata = responseJson['data']['Listing']
        console.log(JSON.stringify(Rdata))
          this.setState({loading:false,payments:Rdata, reachEnd: false,isVisible:true,})
    
      }
          }).catch((error) => {
        console.error(error);
      });
    
 }

       
   delete = async(item)=>{


    
  let formdata = new FormData();
        formdata.append("bid",item.bid);
        formdata.append("staff_id",item.id);
        
      await fetch('https://www.markupdesigns.org/paypa/api/deleteStaff', {
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
               
                this.setState({loading:false,isVisible:true,})
                toastr.showToast("Staff Deleted Successfully")
          this.PaymentHistory()
            }
                }).catch((error) => {
              console.error(error);
            });
          
       }
       activate = async(item)=>{
      
    
        
      let formdata = new FormData();
            formdata.append("bid",item.bid);
            formdata.append("staff_id",item.id);
            
          await fetch('https://www.markupdesigns.org/paypa/api/activateDeacitvateStaff', {
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
                   
                    this.setState({loading:false,isVisible:true,})
                    toastr.showToast(responseJson.msg + " "+ "Successfully")
              this.PaymentHistory()
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
 
  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
    render(){

  return (
   
 <Container style ={{backgroundColor:'#e8edf1'}}>
    <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
       <Text style = {{alignSelf:'center',color:'white',fontSize:18,fontWeight:'bold'}}>My Staff</Text>
        
       
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
             

{/* 
<List>
              <ListItem itemHeader first>
                   <Text>Payments History</Text>
             </ListItem>
             </List> */}
              <FlatList
            data={this.state.payments}
         ItemSeparatorComponent={this.FlatListItemSeparator}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            // onEndReached={this.handleLoadMore}
            // onEndReachedThreshold={20}
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
                <Thumbnail source={ item.pic?{ uri: "https://www.markupdesigns.org/paypa/" + item.pic}:require('../../img/common/profile.png')} />
                  </Shimmer>
                </Left>
                              <Body>
                              <TouchableOpacity onPress={()=>{this.openDetails(item)}}>
                              <Shimmer autoRun={true} visible={this.state.isVisible}>
                             
                                <View style={{flexDirection:'column'}}> 
            <Text style ={{fontSize:18, fontFamily:'Roboto-Medium'}}>{this.Capitalize(item.fname) + " "+ this.Capitalize(item.lname)}</Text>
            <Text style ={{fontSize:13,color:'#1c4478'}}>{item.mobile}</Text>
                               </View>
                              </Shimmer>
                               </TouchableOpacity>
                               </Body>
                               <Right >

                               <Shimmer autoRun={true} visible={this.state.isVisible}>
                                 <View style = {{flexDirection:'row'}}>
                                 <TouchableOpacity  onPress={()=> this.props.navigation.navigate('EditStaff',{data:item})}>
               <Icon name="md-create" style={{ color: 'grey', fontSize: 25, padding: 8 }} />
               </TouchableOpacity>  
                                  

               <TouchableOpacity  onPress={()=>{this.delete(item)}}>
               
               <Icon name="md-trash" style={{ color: '#c20e0e', fontSize: 25, padding: 8 }} />
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>{this.activate(item)}}>
               <Icon name="md-power" style={{ color: item.status ==="1"?'green':'#c20e0e', fontSize: 25, padding: 8 }} />
               </TouchableOpacity>
                       </View>       
               </Shimmer>
                              </Right>
                              
                            </ListItem>
                            
            </List>

  }

            />
    
   {/* {this.state.payments?this.state.payments.map((item)=>{

  //   return(<List  >

  //     <ListItem itemHeader first>
  //                   <Text>Payment History</Text>
  //                 </ListItem>
  //                 <ListItem noBorder >
  //                   <Left>
  //                     <View style={{flexDirection:'column'}}> 
  //   <Text style ={{fontSize:13,paddingLeft:5}}>{item.name}</Text>
  //                     <Text style ={{fontSize:11,color:'grey',paddingRight:18}}>{item.is_created}</Text>
  //                     </View>
                      
  //                   </Left>
  //                   <Right>
  //   <Text style={{color:'#1c4478'}}>R{item.amount}</Text>
  //                   </Right>
  //                 </ListItem>
                 
  //               </List>)
  // }):<List> */}

 
              



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


