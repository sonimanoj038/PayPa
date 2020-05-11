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
  import getDirections from 'react-native-google-maps-directions'
  import { getDistance, getPreciseDistance } from 'geolib';
  const data = [{"name":"manoj"}]
export default class TimelineView extends Component {
  constructor(props){

    super(props);

this.state ={

img:['img'],
loading:false,
pic:'',
longitude: '',
latitude: '',
    distance:0
}

}


  handleGetDirections = () => {
//     const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });

//     const latLng = `${this.props.navigation.state.params.latitude},${this.props.navigation.state.params.longitude}`;
// const label = 'Custom Label';
// const url = Platform.select({
//   ios: `${scheme}${label}@${latLng}`,
//   android: `${scheme}${latLng}(${label})`
// });


// Linking.openURL(url); 
    const data = {
       source: {
        latitude:'27.176670',
        longitude: '78.008072'
      },
      destination: {
        latitude:parseFloat(this.props.navigation.state.params.latitude),
        longitude: parseFloat(this.props.navigation.state.params.longitude)
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
       ]
     
     
    }
 
    getDirections(data)
  }


 componentDidMount = async () => {
   
   await  this.setState({latitude:this.props.navigation.state.params.latitude,
   longitude:this.props.navigation.state.params.longitude
   })
  }
render() {
    const { navigation } = this.props;
   const pic  = navigation.getParam('pic');
   const dil  = navigation.getParam('uids');

   const uid  = navigation.getParam('uid');
   const week = navigation.getParam('week');
   const weekend  = navigation.getParam('weekend');
   const holiday  = navigation.getParam('holiday');
   const distance  = navigation.getParam('distance');
   const pic1 = JSON.parse(pic)

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
   
     
      
    
  {pic1 ===null?<Image  source={require('../../img/common/profile.png')}  style={styles.imageView} />:
  <Image  source = { this.state.pic==="" ?{uri:"https://www.markupdesigns.org/paypa/"+pic1[0]}:{uri:"https://www.markupdesigns.org/paypa/"+this.state.pic}} style={styles.imageView} />
  }
  
  <ScrollView style = {{padding:5,maxHeight:100}}  
  horizontal={true} >
  {pic1 ===null?null:pic1.map((item)=>{
  return<TouchableOpacity onPress = {()=>{this.setState({pic:item})}}  style={{width:70,height:70,backgroundColor:'#bfbcbb',margin:5}}>
  <Image source = { {uri:"https://www.markupdesigns.org/paypa/"+item} } style={{width:70,height:70,backgroundColor:'#bfbcbb'}}
   />
   </TouchableOpacity>
  })}
  </ScrollView >
  <Content style ={{flex:1,}}>
  <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
  <Text style = {{fontSize:24,fontFamily:'Roboto',paddingHorizontal:15}}>{navigation.getParam('name')}</Text>
  
  <Icon name= 'md-heart-empty'  style={{color:'#e26d0e',fontSize:30,paddingHorizontal:15,paddingVertical:8}}/>
  </View>
  
  <View style={{flexDirection:'column',paddingVertical:1}}>
  
  <View style ={{flexDirection:'row',paddingHorizontal:15}}> 
<TouchableOpacity onPress = {this.handleGetDirections}>
<Icon name='md-pin'  style={{color:'black',fontSize:30,}}/>
</TouchableOpacity>
<TouchableOpacity onPress = {this.handleGetDirections}>
<Text style ={{fontSize:12,padding:5}}>{navigation.getParam('address')} </Text>
</TouchableOpacity>
</View>

  <View style ={{flexDirection:'row',paddingHorizontal:15}}> 
  <Icon active name='md-phone-portrait' style ={{color:"black",fontSize:30}}/>
  <TouchableOpacity onPress = {()=>{Linking.openURL(`tel:${navigation.getParam('mobile')}`)}}>
  <Text style ={{fontSize:12,padding:5}}>{navigation.getParam('mobile')}</Text>
  </TouchableOpacity>
  </View>
  <View style ={{flexDirection:'row',paddingHorizontal:15 ,justifyContent:'space-between'}}> 
  <View style ={{flexDirection:'row'}}> 
 
<Icon active name='md-car' style ={{color:"black",fontSize:30}}/>

<Text style ={{fontSize:15,color:'#c2612d',alignItems:'stretch',padding:5}}>{navigation.getParam('distance') } km away</Text>
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
  
  <View>
  <Text style={{fontSize:15}}>
   {this.props.navigation.state.params.latitude+ "h"+this.props.navigation.state.params.longitude+
    this.props.navigation.state.params.clatitude +this.props.navigation.state.params.clongitude
    }
     </Text>
  <List>
              <ListItem itemDivider>
                <Text>Weekdays</Text>
              </ListItem>                    
              <ListItem>
{navigation.getParam('week')==='null-null'?<Text>OFF</Text>:<Text>{navigation.getParam('week')}</Text>}
              </ListItem>
             
              <ListItem itemDivider>
                <Text> Friday</Text>
              </ListItem>  
              <ListItem>
              {navigation.getParam('fri')==='null-null'?<Text>OFF</Text>:<Text>{navigation.getParam('fri')}</Text>}
              </ListItem>
              <ListItem itemDivider>
                <Text>Saturday</Text>
              </ListItem>                    
              <ListItem>
              {navigation.getParam('sat')==='null-null'?<Text>OFF</Text>:<Text>{navigation.getParam('sat')}</Text>}
              </ListItem>
             
              <ListItem itemDivider>
                <Text> Sunday</Text>
              </ListItem>  
              <ListItem>
              {navigation.getParam('sun')==='null-null'?<Text>OFF</Text>:<Text>{navigation.getParam('sun')}</Text>}
              </ListItem>
            </List>

          
       
  <Text></Text>
           
  </View>
  
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
 
    {pic1 ===null?<Image  source={require('../../img/common/defaultImg.png')}  style={styles.imageView} />:
  <Image  source = { this.state.pic==="" ?{uri:"https://www.markupdesigns.org/paypa/"+pic1[0]}:{uri:"https://www.markupdesigns.org/paypa/"+this.state.pic}} style={styles.imageView} />
  }

<ScrollView style = {{padding:5,maxHeight:100}}  
  horizontal={true} >
  {pic1 ===null?null:pic1.map((item)=>{
  return<TouchableOpacity onPress = {()=>{this.setState({pic:item})}}  style={{width:70,height:70,backgroundColor:'#bfbcbb',margin:5}}>
  <Image source = { {uri:"https://www.markupdesigns.org/paypa/"+item} }
   style={{width:70,height:70,backgroundColor:'#bfbcbb'}}/>
   </TouchableOpacity>
  })}
</ScrollView>
    <Content style ={{flex:1,}}>
<ScrollView style={{flex:1,}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style = {{fontSize:24,fontFamily:'Roboto',paddingHorizontal:15}}>{navigation.getParam('name')}</Text>
<Icon name={dil.includes(uid) ? 'md-heart' : 'md-heart-empty'}  style={{color:'#e26d0e',fontSize:30,paddingHorizontal:15,paddingVertical:8}}/>
</View>

<View style={{flexDirection:'column',paddingVertical:1,}}>

<View style ={{flexDirection:'row',paddingHorizontal:15}}> 
<TouchableOpacity onPress = {this.handleGetDirections}>
<Icon name='md-pin'  style={{color:'black',fontSize:30,}}/>
</TouchableOpacity>
<TouchableOpacity onPress = {this.handleGetDirections}>
<Text style ={{fontSize:12,padding:5}}>{navigation.getParam('address')} </Text>
</TouchableOpacity>
</View>

<View style ={{flexDirection:'row',paddingHorizontal:15}}> 
<Icon active name='md-phone-portrait' style ={{color:"black",fontSize:30}}/>

<TouchableOpacity onPress = {()=>{Linking.openURL(`tel:${navigation.getParam('mobile')}`)}}>
  <Text style ={{fontSize:12,padding:5}}>{navigation.getParam('mobile')}</Text>
  </TouchableOpacity>
</View>

<View style ={{flexDirection:'row',paddingHorizontal:15 ,justifyContent:'space-between'}}> 
  <View style ={{flexDirection:'row'}}> 
<Icon active name='md-car' style ={{color:"black",fontSize:30}}/>

<Text style ={{fontSize:15,color:'#c2612d',alignItems:'stretch',padding:5}}>{navigation.getParam('distance')} km away</Text>
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
{navigation.getParam('week')==='null-null'?<Text>OFF</Text>:<Text>{navigation.getParam('week')}</Text>}
              </ListItem>
             
              <ListItem itemDivider>
                <Text> Friday</Text>
              </ListItem>  
              <ListItem>
              {navigation.getParam('fri')==='null-null'?<Text>OFF</Text>:<Text>{navigation.getParam('fri')}</Text>}
              </ListItem>
              <ListItem itemDivider>
                <Text>Saturday</Text>
              </ListItem>                    
              <ListItem>
              {navigation.getParam('sat')==='null-null'?<Text>OFF</Text>:<Text>{navigation.getParam('sat')}</Text>}
              </ListItem>
             
              <ListItem itemDivider>
                <Text> Sunday</Text>
              </ListItem>  
              <ListItem>
              {navigation.getParam('sun')==='null-null'?<Text>OFF</Text>:<Text>{navigation.getParam('sun')}</Text>}
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