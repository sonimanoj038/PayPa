import React, { Component } from 'react';
import { Container, Header, Left,Text, Body, Right, Button, Title, Content ,} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  FlatList,
    View,
  Image,
   StyleSheet ,StatusBar,TouchableWithoutFeedback,ActivityIndicator
  } from 'react-native';

const BaseUrl="https://www.markupdesigns.org/paypa/";
export default class TimelineScreen extends Component {


  constructor(props){

    super(props);

this.state ={

type:0,
selected1:true,
selected:false,
loading:false,
mobile:'',
pin:'',
verifyInput:true,
verifyInput2:true,
dataSource:[],
errormsg:'',
showToast:false,
heart:false,
result:25,
//uid:this.props.navigation.getParam('mydata')
uid:1,
refreshing:false,
reachEnd:false,
}

}
FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 4,
        width: "100%",
        backgroundColor: "#e9edf0",
      }}
    />
  );
}
getData = async()=>{
 
  
  let formdata = new FormData();
  formdata.append("uid",this.state.uid);
  formdata.append("result",this.state.result);
  await fetch('https://www.markupdesigns.org/paypa/api/businessListing',
  {method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data',
   },
  body:formdata
  
  }
  
  ).then((response) => response.json())
        .then((responseJson) => {
      
           let getData = Object.values( responseJson.data.Listing )
   this.setState({dataSource:getData,
    loading:false,refreshing:false,reachEnd:false 
   })
        
   
        }).catch((error) => {
          console.error(error);
        })
}

getMoreData = async()=>{
 
  
  let formdata = new FormData();
  formdata.append("uid",this.state.uid);
  formdata.append("result",this.state.result);
  await fetch('https://www.markupdesigns.org/paypa/api/businessListing',
  {method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data',
   },
  body:formdata
  
  }
  
  ).then((response) => response.json())
        .then((responseJson) => {
      
           let getData = Object.values( responseJson.data.Listing )
   this.setState({dataSource:[...this.state.dataSource,...getData],
    loading:false,refreshing:false,reachEnd:false 
   })
        
   
        }).catch((error) => {
          console.error(error);
        })
}
componentDidMount = ()=>{
  
  this.getData();

}
componentWillUnmount = ()=>{
  
  
}

openDetails = (data) => {
 
  this.props.navigation.navigate("time", { 
name:data.name,
address:data.address,
busiDays:data.busiDays,
mobile:data.mobile,
pic:data.pic
  });
};
handleRefresh = ()=>{

  this.setState({refreshing:true},()=>{
    this.getData();
  })
}
handleLoadMore = () => {
  this.setState({
      result: this.state.result + 25,reachEnd:true,
  }, () => {
      this.getMoreData();
  })
}


  render() {
    return (
        
      <Container styles = {{backgroundColor:"#e9edf0"}}>
    
      
        <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
         
         
          <Text style = {{alignSelf:'center',color:'white',fontSize:18,fontWeight:'bold'}}>Business List </Text>
         
      
        </Header>
        {this.state.loading?<ActivityIndicator
               animating = {this.state.loading}
               color = '#1c4478'
               size={"large"}
               style ={{paddingHorizontal:50,alignItems:'center'}}/>:null}
   <FlatList
       data ={this.state.dataSource}
       ItemSeparatorComponent = {this.FlatListItemSeparator}
      refreshing = {this.state.refreshing}
      onRefresh = {this.handleRefresh}
      onEndReached ={this.handleLoadMore}
      onEndReachedThreshold= {25}
      ListFooterComponent = {<ActivityIndicator
        animating = {this.state.reachEnd}
        color = '#1c4478'
        size={"large"}
        />}
       renderItem={({item,index}) => 
       
           <View style={{flex:1, flexDirection: 'row',backgroundColor:'white',paddingRight:10}}>
   
             <Image  source = { {uri:"https://www.markupdesigns.org/paypa/"+item.pic} } style={styles.imageView}  />
             <TouchableWithoutFeedback onPress ={() => this.openDetails(item)}>
       <View style={{flexDirection:'column',width:"55%",paddingVertical:5}}>
               <Text style ={{fontSize:11,padding:5,fontWeight:'bold'}}>{item.name} </Text>
           <View style ={{flexDirection:'row'}}> 
            <Icon name='md-pin'  style={{color:'black',fontSize:20,}}/>
           
    <Text style ={{fontSize:11,padding:5}}>{item.address}</Text>
      
           </View>

           <View style ={{flexDirection:'row'}}> 
           <Icon active name='md-phone-portrait' style ={{color:"black",fontSize:20}}/>
           
           <Text style ={{fontSize:11,padding:5}}>{item.mobile}</Text>
           </View>
           <View style ={{flexDirection:'row'}}> 
           <Icon active name='md-time' style ={{color:"black",fontSize:20}}/>
           
           <Text style ={{fontSize:11,padding:5,color:'#3268a8'}}>Business Hours</Text>
           </View>
           <View style ={{flexDirection:'row'}}> 
           <Text style ={{color:"black",fontSize:11,fontWeight:'bold'}}>Distance</Text>
           
           <Text style ={{fontSize:11,color:'#c2612d',paddingHorizontal:5}}>1.5km</Text>
           
           </View>
    
       </View>
       </TouchableWithoutFeedback>
       <Icon name={this.state.heart?'md-heart':'md-heart-empty' } style={{color:'#e26d0e',fontSize:25,paddingVertical:10}} onPress = {()=>this.setState({heart:!this.state.heart})}/>
           </View>
       
         }

       keyExtractor={(item, index) => index.toString()}
       style={{backgroundColor:'#e9edf0',padding:10}}
       /> 

        
      </Container>
    );
  }
}
const styles = StyleSheet.create({
 
    MainContainer :{
     
        justifyContent: 'center',
        flex:1,
        margin: 5,
        marginTop: (Platform.OS === 'ios') ? 20 : 0,
     
    },
     
    imageView: {
     backgroundColor:"grey",
        width: '35%',
        height: 120 ,
        margin: 7,
        borderRadius : 7,
        justifyContent:'center'
     
    },
     
    textView: {
    backgroundColor:'#e6ede8',
      
        padding:5,
        color: '#000'
     
    }
     
    });