import React, { Component } from 'react';
import { Container, Header, Left,Text, Body, Right, Button, Title, Content ,Item,Input} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  FlatList,
    View,
  Image,
   StyleSheet ,StatusBar
  } from 'react-native';
  const data = [{"name":"manoj"}]
export default class TimelineView extends Component {
  render() {
    return (
        
      <Container>

        <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
          <Left>
          <Icon name='md-arrow-back'  style={{color:'white',fontSize:25}} onPress ={()=> this.props.navigation.navigate('timeline')}/>
          </Left>
          <Body style={{justifyContent:'center',alignItems:'center'}}>
            <Title >Details</Title>
          </Body>
          <Right>
            
             
          
          </Right>
        </Header>
      
        <View style={{flex:1,padding:10}}>
   
   <Image source = { require('../img/sample.jpg') } style={styles.imageView} />
<View style={{flexDirection:'row'}}>
<Text style = {{fontSize:26,fontFamily:'Roboto',padding:10}}>Amazono Medical Store</Text>
    <Icon name='md-heart'  style={{color:'#ff992b',fontSize:30,padding:15}}/></View>
   
<View style={{flexDirection:'column',paddingVertical:5}}>

 <View style ={{flexDirection:'row',padding:10}}> 
  <Icon name='md-pin'  style={{color:'black',fontSize:35,}}/>
 
 <Text style ={{fontSize:15,padding:5}}>A-16, Lohia Rd, A Block, Sector 63, Noida, Uttar </Text>

 </View>

 <View style ={{flexDirection:'row',padding:10}}> 
 <Icon active name='md-phone-portrait' style ={{color:"black",fontSize:35}}/>
 
 <Text style ={{fontSize:15,padding:5}}>+91555588822</Text>
 </View>
 <View style ={{flexDirection:'row',padding:10}}> 
 <Icon active name='md-time' style ={{color:"black",fontSize:35}}/>
 
 <Text style ={{fontSize:15,padding:5,color:'#3268a8'}}>Business Hours</Text>
 
 </View>
 <View style ={{flexDirection:'column'}}>

 <Item regular>
            <Input placeholder='Weekdays' placeholderTextColor="#a9b2ba" style={{borderBottomColor:'#c6c9cc',borderBottomWidth:1,width:'90%'}} />
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