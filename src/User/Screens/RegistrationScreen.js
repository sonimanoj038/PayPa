/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  // @ts-ignore
  SafeAreaView,
  StyleSheet,
  // @ts-ignore
  ScrollView,
  View,
  TouchableOpacity,
  StatusBar,Image,Platform,
  TouchableWithoutFeedback,PermissionsAndroid
} from 'react-native';


// @ts-ignore
import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Header,Body,Title, Content,CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Mytext from '../../Common/Component/Mytext';
import DocumentPicker from 'react-native-document-picker';
import Geolocation from '@react-native-community/geolocation';


export default class RegistrationScreen extends React.Component {
   

    

    constructor(props){

        super(props);
   
    this.state ={

term:false,
name:'',
currentLongitude: 'unknown',//Initial Longitude
    currentLatitude: 'unknown'
    }
}

 getFile =async()=>

{
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
    })
    console.warn(
      res.uri,
      res.type, // mime type
      res.name,
      res.size
    );

    var data = JSON.stringify(res);
    console.warn(data)
    this.setState({name:res})
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.warn(err)
    } else {
      throw err;
    }
  }

}
componentDidMount = () => {
  var that =this;
  //Checking for the permission just after component loaded
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
        alert("err",err);
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
          //getting the Latitude from the location json
          that.setState({ currentLongitude:currentLongitude });
          //Setting state Longitude to re re-render the Longitude Text
          that.setState({ currentLatitude:currentLatitude });
          //Setting state Latitude to re re-render the Longitude Text
       },
       (error) => alert(error.message),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
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
    });
 }
 componentWillUnmount = () => {
  // @ts-ignore
  Geolocation.clearWatch(this.watchID);
 }






    render(){
  return (
   
 <Container style = {{flex:1,backgroundColor:'#e8edf1'}}>
    <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
          <Left>
          <Icon name='md-arrow-back'  style={{color:'white',fontSize:25}}/>
          </Left>
          <Body  >
          <Title >Registration</Title>
          </Body>
         
        </Header>
 <Content  >
<Text></Text>

<Item  regular style ={styles.InputItem} >

     <Input placeholder='First Name' placeholderTextColor="#797b7d" style = {{color:'#797b7d'}} />
          </Item>

          <Mytext></Mytext>
          
          <Item  regular style ={styles.InputItem} >

     <Input placeholder='Surname' placeholderTextColor="#797b7d" style = {{color:'#797b7d'}} />
          </Item>

          <Mytext></Mytext>
          <Item  regular style ={styles.InputItem} >

<Input placeholder='Email' placeholderTextColor="#797b7d" style = {{color:'#797b7d'}} />
     </Item>
          <Mytext></Mytext>
          <Item  regular style ={styles.InputItem} >

<Input placeholder='Mobile/Phone' placeholderTextColor="#797b7d" style = {{color:'#797b7d'}} />
     </Item>

          <Mytext>


</Mytext>

<View style = {{flexDirection:'row',justifyContent:"space-around",paddingHorizontal:10}}>
    <Text style={{fontSize:13,fontWeight:'bold'}}>Certified ID Copy</Text>
    <Text style={{fontSize:13,fontWeight:'bold'}}>3 months Bank statments</Text>
    </View>
    <View style={{ flexDirection:'row',justifyContent:"space-around",paddingHorizontal:10,paddingVertical:5}}>
        <TouchableOpacity style = {{backgroundColor:'white',

        backgroundColor:'white',paddingHorizontal:30,paddingVertical:20}}
        onPress ={this.getFile}
        >
            <Image source={require( '../../img/common/upload3.png')} />
            <Text style ={{fontSize:11,fontWeight:'600',color:'#686e6a',textAlign:'center'}}>{this.state.name.

            name ? this.state.name.name.substring(0,15) : ''}</Text> 
            </TouchableOpacity>
           
            <TouchableOpacity style = {{backgroundColor:'white',
// @ts-ignore
            backgroundColor:'white',paddingHorizontal:30,paddingVertical:20}}>
            <Image source={require(
// @ts-ignore
            '../../img/common/upload3.png')} />
            </TouchableOpacity>
    </View>


    <View style = {{flexDirection:'row',justifyContent:"space-around",paddingHorizontal:10}}>
    <Text style={{fontSize:13,fontWeight:'bold'}}>latest pay Slip</Text>
    <Text style={{fontSize:13,fontWeight:'bold'}}>Proof of Residence</Text>
    </View>
    <View style={{ flexDirection:'row',justifyContent:"space-around",paddingHorizontal:10,paddingVertical:5}}>
        <TouchableOpacity style = {{backgroundColor:'white',paddingHorizontal:30,paddingVertical:20}}>
            <Image source={require(
// @ts-ignore
            '../../img/common/upload3.png')} />
            </TouchableOpacity>
    
            <TouchableOpacity style = {{backgroundColor:'white',paddingHorizontal:30,paddingVertical:20}}>
            <Image source={require(
// @ts-ignore
            '../../img/common/upload3.png')} />
            </TouchableOpacity>
    </View>
    <Text></Text>
    <Item  regular style ={styles.InputItem} >

<Input placeholder='Date of Salary' placeholderTextColor="#797b7d" style = {{color:'#797b7d'}} />
     </Item>
     <Text></Text>
     <Item  regular style ={styles.InputItem} >

<Input placeholder='Paasword' placeholderTextColor="#797b7d" style = {{color:'#797b7d'}} />
     </Item>

     <View style = {{flexDirection:'row',paddingHorizontal:20,paddingVertical:10}}>


     <CheckBox checked={
        this.state.term} onPress ={()=>{this.setState({term:!this.state.term})}} color ='#575a5e'/><Text style = {{color:'#9ca0a6',paddingHorizontal:15}}>Term & Condition</Text>
     </View>
</Content>
<Footer style = {{
// @ts-ignore
color:'#dce0e6',
  backgroundColor:'#e46c0b'}}>
<TouchableWithoutFeedback onPress= {()=>this.props.navigation.navigate('timeline')}>
            <Text style = {{color:'white',fontFamily:'Roborto ',fontSize:18,fontWeight:'800',padding:15}}>SUBMIT NOW</Text>
            </TouchableWithoutFeedback>
          </Footer>
 </Container>

  );
};
}
const styles = StyleSheet.create({
 
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
 }
});


