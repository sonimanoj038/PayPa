import React, { Component } from 'react';
import { Container, Header, Left,Text, Body, Right, Button, Title, Content ,Item,Input} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  FlatList,
    View,
  Image,
   StyleSheet ,StatusBar,ScrollView
  } from 'react-native';
import {  } from 'react-native-gesture-handler';
  const data = [{"name":"manoj"}]
export default class TimelineView extends Component {
  constructor(props){

    super(props);

this.state ={

img:['img'],
loading:false
}

}
render() {
    const { navigation } = this.props;
   const pic  = navigation.getParam('pic');
   const dil  = navigation.getParam('uids');

   const uid  = navigation.getParam('uid');
   const pic1 = JSON.parse(pic)

   if(dil ===null)
{
    return (
      <ScrollView style={{flex:1}}>
      <Container>

        <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
          <Left>
          <Icon name='md-arrow-back'  style={{color:'white',fontSize:25}} onPress ={()=>{this.props.navigation.goBack()}}/>
          </Left>
          <Body >
            <Text style={{alignSelf:'center',color:'white',fontSize:18,fontFamily:'Roboto-Medium'}}>Details</Text>
          </Body>
          <Right>
          </Right>
        </Header>
        <View style={{padding:10}}>
   <Image source = { {uri:"https://www.markupdesigns.org/paypa/"+pic1[0]} } style={styles.imageView} />

   
{pic1.map((item)=>{
  return <View style = {{flexDirection:'row',padding:10}}><Image source = { {uri:"https://www.markupdesigns.org/paypa/"+item} } style={{width:70,height:70,backgroundColor:'#bfbcbb',margin:10}} /></View>
})}

 

<View style={{flexDirection:'row'}}>
<Text style = {{fontSize:26,fontFamily:'Roboto',padding:10}}>{navigation.getParam('name')}</Text>

    <Icon name='md-heart-empty' style={{color:'#e26d0e',fontSize:30,padding:15}}/></View>
   
<View style={{flexDirection:'column',paddingVertical:5}}>

 <View style ={{flexDirection:'row',padding:10}}> 
  <Icon name='md-pin'  style={{color:'black',fontSize:35,}}/>
 
 <Text style ={{fontSize:15,padding:5}}>{navigation.getParam('address')} </Text>

 </View>

 <View style ={{flexDirection:'row',padding:10}}> 
 <Icon active name='md-phone-portrait' style ={{color:"black",fontSize:35}}/>
 
 <Text style ={{fontSize:15,padding:5}}>{navigation.getParam('mobile')}</Text>
 </View>
 <View style ={{flexDirection:'row',padding:10}}> 
 <Icon active name='md-time' style ={{color:"black",fontSize:35}}/>
 
 <Text style ={{fontSize:15,padding:5,color:'#3268a8'}}>Business Hours</Text>
 
 </View>
 <View style ={{flexDirection:'column'}}>

 <Item regular>
            <Input placeholder='Weekdays' placeholderTextColor="#a9b2ba" style={{borderBottomColor:'#c6c9cc',borderBottomWidth:1,width:'90%'}} value = {navigation.getParam('busiDays')}/>
          </Item>
          <Item regular >
            <Input placeholder='Weekends' placeholderTextColor="#a9b2ba" style={{borderBottomColor:'#c6c9cc',borderBottomWidth:1}} />
          </Item>
          <Item regular>
            <Input placeholder='public Holiday' placeholderTextColor="#a9b2ba" style={{borderBottomColor:'#c6c9cc',borderBottomWidth:1}} />
          </Item>
 </View>
 <View style ={{flexDirection:'row',padding:10,justifyContent: 'space-between',}}> 
 <Text style ={{color:"black",fontSize:20,fontWeight:'bold'}}>Distance</Text>
 

 <Text style ={{fontSize:15,color:'#c2612d',alignItems:'stretch',padding:5}}>1.5km away</Text>
 </View>

</View>

 </View>


 
      </Container>
      </ScrollView>
    );
}else{
return(<ScrollView style={{flex:1}}>
  <Container>

    <Header  style={{backgroundColor:'#1c4478'}}>
    <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
      <Left>
      <Icon name='md-arrow-back'  style={{color:'white',fontSize:25}} onPress ={()=>{this.props.navigation.goBack()}}/>
      </Left>
      <Body style={{justifyContent:'center',alignItems:'center'}}>
      <Text style={{alignSelf:'center',color:'white',fontSize:18,fontFamily:'Roboto-Medium'}}>Details</Text>
      </Body>
      <Right>
        
         
      
      </Right>
    </Header>
    
    <View style={{padding:10}}>
   
<Image source = { {uri:"https://www.markupdesigns.org/paypa/"+pic1[0]} } style={styles.imageView} />

<View style = {{flexDirection:'row',padding:10}}>
{pic1.map((item)=>{
return <Image source = { {uri:"https://www.markupdesigns.org/paypa/"+item} } style={{width:70,height:70,backgroundColor:'#bfbcbb',margin:10}} />
})}
</View>


<View style={{flexDirection:'row'}}>
<Text style = {{fontSize:26,fontFamily:'Roboto',padding:10}}>{navigation.getParam('name')}</Text>

<Icon name={dil.includes(uid) ? 'md-heart' : 'md-heart-empty'}  style={{color:'#e26d0e',fontSize:30,padding:15}}/></View>

<View style={{flexDirection:'column',paddingVertical:5}}>

<View style ={{flexDirection:'row',padding:10}}> 
<Icon name='md-pin'  style={{color:'black',fontSize:35,}}/>

<Text style ={{fontSize:15,padding:5}}>{navigation.getParam('address')} </Text>

</View>

<View style ={{flexDirection:'row',padding:10}}> 
<Icon active name='md-phone-portrait' style ={{color:"black",fontSize:35}}/>

<Text style ={{fontSize:15,padding:5}}>{navigation.getParam('mobile')}</Text>
</View>
<View style ={{flexDirection:'row',padding:10}}> 
<Icon active name='md-time' style ={{color:"black",fontSize:35}}/>

<Text style ={{fontSize:15,padding:5,color:'#3268a8'}}>Business Hours</Text>

</View>
<View style ={{flexDirection:'column'}}>

<Item regular>
        <Input placeholder='Weekdays' placeholderTextColor="#a9b2ba" style={{borderBottomColor:'#c6c9cc',borderBottomWidth:1,width:'90%'}} value = {navigation.getParam('busiDays')}/>
      </Item>
      <Item regular >
        <Input placeholder='Weekends' placeholderTextColor="#a9b2ba" style={{borderBottomColor:'#c6c9cc',borderBottomWidth:1}} />
      </Item>
      <Item regular>
        <Input placeholder='public Holiday' placeholderTextColor="#a9b2ba" style={{borderBottomColor:'#c6c9cc',borderBottomWidth:1}} />
      </Item>
</View>
<View style ={{flexDirection:'row',padding:10,justifyContent: 'space-between',}}> 
<Text style ={{color:"black",fontSize:20,fontWeight:'bold'}}>Distance</Text>


<Text style ={{fontSize:15,color:'#c2612d',alignItems:'stretch',padding:5}}>1.5km away</Text>
</View>

</View>

</View>
</Container></ScrollView> )
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