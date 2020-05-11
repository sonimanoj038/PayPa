import React, { Component } from 'react';
import { Container, Header, Left,Text, Body, Right, List,ListItem,Content,Button} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  FlatList,
    View,
  Image,Platform,Linking,
   StyleSheet ,StatusBar,ScrollView,TouchableOpacity ,PermissionsAndroid
  } from 'react-native';
  import Geolocation from '@react-native-community/geolocation';
  import AsyncStorage from '@react-native-community/async-storage';
  import getDirections from 'react-native-google-maps-directions'
  import { getDistance, getPreciseDistance } from 'geolib';
  const data = [{"name":"manoj"}]
export default class BusinessView extends Component {
  constructor(props){

    super(props);

this.state ={

img:['img'],
loading:false,
mypic:'',
longitude: '',
latitude: '',
distance:0,
bid:'',
uid:'10054',
 dataSource:[],
  currentLongitude: '',
    currentLatitude: '',
}
}


  handleGetDirections = () => {
    console.log("ghfhj",this.props.navigation.state.params.latitude,this.props.navigation.state.params.longitude)
    const data = {
       source: {
        latitude: this.state.dataSource.latitude,
        longitude: this.state.dataSource.latitude
      },
      destination: {
        latitude: this.props.navigation.state.params.latitude,
        longitude: this.props.navigation.state.params.longitude
      },
      params: [
        {
          key: "travelmode",
          value: "walking"  
        }
        ]}
 
    getDirections(data)
  }
   getAdreess = async()=>{
     this.setState({loadingLocation:true})
     var that =this;
     
     if(Platform.OS === 'ios'){
       this.callLocation(that);
     }else{
       async function requestLocationPermission() {
         try {
           const granted = await PermissionsAndroid.request(
             // @ts-ignore
             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
               'title': 'Location Access Required',
               'message': 'This App needs to Access your location'
             }
           )
           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
             //To Check, If Permission is granted
             that.callLocation(that);
           } else {
             alert("Permission Denied");
           }
         } catch (err) {
           // @ts-ignore
         
           console.warn(err)
         }
       }
       requestLocationPermission();
     }    
    }
      callLocation(that){
     //alert("callLocation Called");
     Geolocation.getCurrentPosition(
         //Will give you the current location
          (position) => {
             const currentLongitude = JSON.stringify(position.coords.longitude);
             //getting the Longitude from the location json
             const currentLatitude = JSON.stringify(position.coords.latitude);
          
             that.setState({ currentLongitude:currentLongitude,
               currentLatitude:currentLatitude,loading: false,error:false },()=>this.getMoreData());
             
   
             console.log('currentLatitude:',currentLatitude, 'currentLongitude',currentLongitude)
          },
          (error) =>  {
            this.setState({error:true,loading:false})
            },
          { enableHighAccuracy: false, timeout:3600000, maximumAge: 1000 }
       );
       that.watchID = Geolocation.watchPosition((position) => {
         //Will give you the location on location change
           console.log(position);
           const currentLongitude = JSON.stringify(position.coords.longitude);
           //getting the Longitude from the location json
           const currentLatitude = JSON.stringify(position.coords.latitude);
           //getting the Latitude from the location json
          that.setState({ currentLongitude:currentLongitude });
          //Setting state Longitude to re re-render the Longitude Text
          that.setState({ currentLatitude:currentLatitude });
          //Setting state Latitude to re re-render the Longitude Text
       })
   }
 componentDidMount = async () => {
     const value = await AsyncStorage.getItem('uid')
     const id = this.props.navigation.getParam('user_id')
     this.setState({uid:value,bid:id})
     console.warn(value)
     await this.getAdreess()
     await this.getMoreData()

  }
  getMoreData = async () => {
    
    let formdata = new FormData();
    formdata.append("bid",this.state.bid);
    await fetch('https://www.markupdesigns.org/paypa/api/getBusinessDetails',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata

      }

    ).then((response) => response.json())
      .then((responseJson) => {
    console.log(JSON.stringify(responseJson))
        if(responseJson.status ==='Success'){         
          let data =  responseJson['data']
      
          this.setState({
            dataSource: data,
             refreshing: false, 
          })
        
        }
        else
        alert(responseJson)
      
      }).catch((error) => {
        console.error(error);
      })
  }
render() {
    const data = this.state.dataSource
    const { navigation } = this.props;
   const pic  = data.pic;
 const dil = data.uids
 const week = data.weekdaystart + "-"+ data.weekdayend
 const fri=data.fristart + "-"+ data.friend
 const sat=data.satstart + "-"+ data.satend
 const sun=data.sunstart + "-"+ data.sunend
   
 

   if(dil ===null)
{
    return (
    
       <Container >
     <Header  style={{backgroundColor:'#1c4478'}}>
      <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
        <Left style = {{flex:1}}>
        <Icon name='md-arrow-back'  style={{color:'white',fontSize:25}} onPress ={()=>{this.props.navigation.goBack()}}/>
        </Left>
        <Body style={{flex:1,alignItems:'center'}}>
        <Text style={{alignSelf:'center',color:'white',fontSize:18,fontFamily:'Roboto-Medium'}}>Details</Text>
        </Body>
        <Right style ={{flex:1}}>
        </Right>
      </Header>
 {pic ===undefined?<Image  source={require('../../img/common/defaultImg.png')}  style={styles.imageView} />:
  <Image  source = { this.state.mypic==="" ?{uri:"https://www.markupdesigns.org/paypa/"+JSON.parse(pic)[0]}:{uri:"https://www.markupdesigns.org/paypa/"+this.state.mypic}} style={styles.imageView} />
  }
  

<ScrollView style = {{padding:5,maxHeight:100}}  
  horizontal={true} >
  {pic ===undefined?null:JSON.parse(pic).map((item)=>{
  return<TouchableOpacity onPress = {()=>{this.setState({mypic:item})}}  style={{width:70,height:70,backgroundColor:'#bfbcbb',margin:5}}>
  <Image source = { {uri:"https://www.markupdesigns.org/paypa/"+item}}
   style={{width:70,height:70,backgroundColor:'#bfbcbb'}}/>
   </TouchableOpacity>
  })}
</ScrollView> 
    <Content style ={{flex:1,}}>
<ScrollView style={{flex:1,}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style = {{fontSize:24,fontFamily:'Roboto',paddingHorizontal:15}}>{data.name}</Text>
<Icon name='md-heart-empty' style={{color:'#e26d0e',fontSize:30,paddingHorizontal:15,paddingVertical:8}}/>
</View>

<View style={{flexDirection:'column',paddingVertical:1,}}>

<View style ={{flexDirection:'row',paddingHorizontal:15}}> 
<TouchableOpacity onPress = {this.handleGetDirections}>
<Icon name='md-pin'  style={{color:'black',fontSize:30,}}/>
</TouchableOpacity>
<TouchableOpacity onPress = {this.handleGetDirections}>
<Text style ={{fontSize:12,padding:5}}>{data.address} </Text>
</TouchableOpacity>
</View>

<View style ={{flexDirection:'row',paddingHorizontal:15}}> 
<Icon active name='md-phone-portrait' style ={{color:"black",fontSize:30}}/>

<TouchableOpacity onPress = {()=>{Linking.openURL(`tel:${navigation.getParam('mobile')}`)}}>
  <Text style ={{fontSize:12,padding:5}}>{data.mobile}</Text>
  </TouchableOpacity>
</View>

<View style ={{flexDirection:'row',paddingHorizontal:15 ,justifyContent:'space-between'}}> 
  <View style ={{flexDirection:'row'}}> 
<Icon active name='md-car' style ={{color:"black",fontSize:30}}/>


{data.latitude && data.longitude !==undefined?<Text style ={{fontSize:15,color:'#c2612d',alignItems:'stretch',padding:5}}>{Math.floor(getDistance({latitude:this.state.currentLatitude,longitude:this.state.currentLongitude}, {
        latitude: data.latitude,
        longitude: data.longitude,
        
    }, 1)/1000)} km away</Text>:null}
<Text></Text>

</View>
  <Button transparent onPress={this.handleGetDirections}>
            <Text style = {{color:'#1c4478',fontSize:12,fontFamily:'Roboto-Medium',fontWeight:'bold'}}>View On Map</Text>
          </Button>
</View>
<View style ={{flexDirection:'row',paddingHorizontal:15}}> 
<Icon active name='md-time' style ={{color:"black",fontSize:30}}/>

<Text style ={{fontSize:14,padding:5,color:'#3268a8'}}>Business Hours</Text>

</View>

<List>
              <ListItem itemDivider>
                <Text>Weekdays</Text>
              </ListItem>                    
              <ListItem>
                <Text>{data.weekdays}</Text>
              </ListItem>
             
              <ListItem itemDivider>
                <Text> Friday</Text>
              </ListItem>  
              <ListItem>
                <Text> {data.fri}</Text>
              </ListItem>
              <ListItem itemDivider>
                <Text>Saturday</Text>
              </ListItem>                    
              <ListItem>
                <Text>{data.sat}</Text>
              </ListItem>
             
              <ListItem itemDivider>
                <Text> Sunday</Text>
              </ListItem>  
              <ListItem>
              {sun==='null-null'?<Text>OFF</Text>:<Text>{sun}</Text>}
              </ListItem>
            </List>
</View>


</ScrollView>
</Content>


</Container>
     
    );
}else{
return(
  
  <Container >
     <Header  style={{backgroundColor:'#1c4478'}}>
      <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
        <Left style = {{flex:1}}>
        <Icon name='md-arrow-back'  style={{color:'white',fontSize:25}} onPress ={()=>{this.props.navigation.goBack()}}/>
        </Left>
        <Body style={{flex:1,alignItems:'center'}}>
        <Text style={{alignSelf:'center',color:'white',fontSize:18,fontFamily:'Roboto-Medium'}}>Details</Text>
        </Body>
        <Right style ={{flex:1}}>
        </Right>
      </Header>
 {pic ===undefined?<Image  source={require('../../img/common/defaultImg.png')}  style={styles.imageView} />:
  <Image  source = { this.state.mypic==="" ?{uri:"https://www.markupdesigns.org/paypa/"+JSON.parse(pic)[0]}:{uri:"https://www.markupdesigns.org/paypa/"+this.state.mypic}} style={styles.imageView} />
  }
  

<ScrollView style = {{padding:5,maxHeight:100}}  
  horizontal={true} >
  {pic ===undefined?null:JSON.parse(pic).map((item)=>{
  return<TouchableOpacity onPress = {()=>{this.setState({mypic:item})}}  style={{width:70,height:70,backgroundColor:'#bfbcbb',margin:5}}>
  <Image source = { {uri:"https://www.markupdesigns.org/paypa/"+item}}
   style={{width:70,height:70,backgroundColor:'#bfbcbb'}}/>
   </TouchableOpacity>
  })}
</ScrollView> 
    <Content style ={{flex:1,}}>
<ScrollView style={{flex:1,}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style = {{fontSize:24,fontFamily:'Roboto',paddingHorizontal:15}}>{data.name}</Text>
{dil ===undefined?null:<Icon name={dil.includes(this.state.uid) ? 'md-heart' : 'md-heart-empty'}  style={{color:'#e26d0e',fontSize:30,paddingHorizontal:15,paddingVertical:8}}/>}
</View>

<View style={{flexDirection:'column',paddingVertical:1,}}>

<View style ={{flexDirection:'row',paddingHorizontal:15}}> 
<TouchableOpacity onPress = {this.handleGetDirections}>
<Icon name='md-pin'  style={{color:'black',fontSize:30,}}/>
</TouchableOpacity>
<TouchableOpacity onPress = {this.handleGetDirections}>
<Text style ={{fontSize:12,padding:5}}>{data.address} </Text>
</TouchableOpacity>
</View>

<View style ={{flexDirection:'row',paddingHorizontal:15}}> 
<Icon active name='md-phone-portrait' style ={{color:"black",fontSize:30}}/>

<TouchableOpacity onPress = {()=>{Linking.openURL(`tel:${navigation.getParam('mobile')}`)}}>
  <Text style ={{fontSize:12,padding:5}}>{data.mobile}</Text>
  </TouchableOpacity>
</View>

<View style ={{flexDirection:'row',paddingHorizontal:15 ,justifyContent:'space-between'}}> 
  <View style ={{flexDirection:'row'}}> 
<Icon active name='md-car' style ={{color:"black",fontSize:30}}/>

{data.latitude && data.longitude !==undefined?<Text style ={{fontSize:15,color:'#c2612d',alignItems:'stretch',padding:5}}>{Math.floor(getDistance({latitude:this.state.currentLatitude,longitude:this.state.currentLongitude}, {
        latitude: data.latitude,
        longitude: data.longitude,
        
    }, 1)/1000)} km away</Text>:null}
<Text></Text>
</View>
  <Button transparent onPress={this.handleGetDirections}>
            <Text style = {{color:'#1c4478',fontSize:12,fontFamily:'Roboto-Medium',fontWeight:'bold'}}>View On Map</Text>
          </Button>
</View>
<View style ={{flexDirection:'row',paddingHorizontal:15}}> 
<Icon active name='md-time' style ={{color:"black",fontSize:30}}/>

<Text style ={{fontSize:14,padding:5,color:'#3268a8'}}>Business Hours</Text>

</View>

<List>
              <ListItem itemDivider>
                <Text>Weekdays</Text>
              </ListItem>                    
              <ListItem>
              {week==='null-null'?<Text>OFF</Text>:week ==='undefined-undefined'?null:<Text>{week}</Text>}
              </ListItem>
             
              <ListItem itemDivider>
                <Text> Friday</Text>
              </ListItem>  
              <ListItem>
              {fri==='null-null'?<Text>OFF</Text>:fri ==='undefined-undefined'?null:<Text>{fri}</Text>}
              </ListItem>
              <ListItem itemDivider>
                <Text>Saturday</Text>
              </ListItem>                    
              <ListItem>
              {sat==='null-null'?<Text>OFF</Text>:sat ==='undefined-undefined'?null:<Text>{sat}</Text>}
              </ListItem>
             
              <ListItem itemDivider>
                <Text> Sunday</Text>
              </ListItem>  
              <ListItem>
              {sun==='null-null'?<Text>OFF</Text>:sun ==='undefined-undefined'?null:<Text>{sun}</Text>}
              </ListItem>
            </List>
</View>


</ScrollView>
</Content>


</Container> )
}
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
    top:5,
        width:"94%",
        height: '30%' ,
        padding: 10,
        
        alignSelf:'center'
     
    },
     
    textView: {
    backgroundColor:'#e6ede8',
      
        padding:5,
        color: '#000'
     
    }
     
    });
    const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key, value) => {
      if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
              return;
          }
          seen.add(value);
      }
      return value;
      };
  };