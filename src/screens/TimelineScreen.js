import React, { Component } from 'react';
import { Container, Header, Left,Text, Body, Right, Button, Title, Content ,} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  FlatList,
    View,
  Image,
   StyleSheet ,StatusBar,TouchableWithoutFeedback
  } from 'react-native';

  const data = [{"name":"manoj"}]
export default class TimelineScreen extends Component {
  render() {
    return (
        
      <Container>
    
      
        <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
          <Left>
           
          </Left>
          <Body style={{justifyContent:'center',alignItems:'center',paddingLeft:35}} >
          <Title >PayPa</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='md-more'  style={{color:'white',fontSize:35}}/>
            </Button>
          </Right>
        </Header>
      
  <FlatList
       data ={data}
       ItemSeparatorComponent = {this.FlatListItemSeparator}

       renderItem={({item}) => 
       
           <View style={{flex:1, flexDirection: 'row',paddingRight:10}}>
   
             <Image source = { require('../img/sample.jpg') } style={styles.imageView}  />
             <TouchableWithoutFeedback onPress ={()=> this.props.navigation.navigate('time')}>
       <View style={{flexDirection:'column',width:"55%",paddingVertical:5}}>
               <Text style ={{fontSize:11,padding:5,fontWeight:'bold'}}> Amazono Medical Store</Text>
           <View style ={{flexDirection:'row'}}> 
            <Icon name='md-pin'  style={{color:'black',fontSize:20,}}/>
           
           <Text style ={{fontSize:11,padding:5}}>A-16, Lohia Rd, A Block, Sector 63, Noida, Uttar </Text>
      
           </View>

           <View style ={{flexDirection:'row'}}> 
           <Icon active name='md-phone-portrait' style ={{color:"black",fontSize:20}}/>
           
           <Text style ={{fontSize:11,padding:5}}>+91555588822</Text>
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
       <Icon name='md-heart-empty'  style={{color:'#c2612d',fontSize:25,paddingVertical:10}}/>
           </View>
       
         }

       keyExtractor={(item, index) => index.toString()}
       
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