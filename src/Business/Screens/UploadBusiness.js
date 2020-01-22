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
  ScrollView,ActivityIndicator,
  View,FlatList,
  TouchableOpacity,
  StatusBar,Image,Platform,ImageBackground,
  TouchableWithoutFeedback,PermissionsAndroid,Modal
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
// @ts-ignore
import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Header,Body,Title, Content,CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Mytext from '../../Common/Component/Mytext';
import DocumentPicker from 'react-native-document-picker';
import Geolocation from '@react-native-community/geolocation';
import Geocode from "react-geocode";
import {toastr} from '../../Common/Screens/LoginScreen'
import AsyncStorage from '@react-native-community/async-storage';

Geocode.setApiKey("AIzaSyCkuCCndhl7YDUKBZvhX9N5yubGNC_LdjU");
 
// set response language. Defaults to english.
Geocode.setLanguage("en");
 
// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");
 
// Enable or disable logs. Its optional.
Geocode.enableDebug();
export default class BusinessRegistrationScreen extends React.Component {
   

    

    constructor(props){

        super(props);
   
    this.state ={
      bTitle:'',
      baddress:'',
      week:'',
      weekEnd:'',
      pholiday:'',
      loading:false,
      Alert_Visibility:false,
msg:'',
images:[],
imagesUpload:[],
userid:'',
currentLongitude: '',
    currentLatitude: '',
    loadingLocation:false
    }
}

validateInput = ()=>{
  const {bTitle }  = this.state ;
  const { baddress }  = this.state ;
  const {week} = this.state
  const {weekEnd} = this.state
  const {pholiday} = this.state
if( bTitle ===""){

  toastr.showToast("Enter Business Name")
return false
}

else if (baddress ==="")
{
  toastr.showToast("Enter Address")
  return false

}
else if (week ==="")
{
  toastr.showToast("Enter Weekly Business Hours")
  return false

}

else if (weekEnd ==="")
{
  toastr.showToast("Enter Weekend Business Hours")
  return false

}
else if (pholiday ==="")
{
  toastr.showToast("Enter Public Holiday Business Hours")
  return false

}

else
this.setState({loading:true})
return true;
}
componentDidMount = async() => {
  
  const value = await AsyncStorage.getItem('uid')

  this.setState({userid:value})
 
  //Checking for the permission just after component loaded
  


 }
 componentWillUnmount = () => {
 
  Geolocation.clearWatch(this.watchID);
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
          that.setState({ currentLongitude:currentLongitude,
            currentLatitude:currentLatitude, });
          //Setting state Longitude to re re-render the Longitude Text
      
          //Setting state Latitude to re re-render the Longitude Text

          Geocode.fromLatLng(this.state.currentLatitude,this.state.currentLongitude ).then(
            response => {
              const address = response.results[0].formatted_address;
            this.setState({baddress:address,loadingLocation:false})
            },
            error => {
              console.error(error);
            }
          );
       },
       (error) => alert(error.message),
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
getImage = ()=>{


    ImagePicker.openPicker({
       
        multiple: true,
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
       
      }).then(image => {
 
   
         this.setState({images:[...this.state.images,...image,]})

         for (var i = 0; i < image.length; i++) {
             this.state.imagesUpload.push(image[i].path)
         }
          
        })

       
    }
    deleteItem = (e)=>{
      var array = [...this.state.images]; // make a separate copy of the array
      var index = e
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({
          images: array
        });
      }
    //   console.warn(item.path)
    //  let final =this.state.images.filter(data=> data.path item.path)

    }

    Show_Custom_Alert(msg) {
 
      this.setState({Alert_Visibility: true,msg:msg});
      
    }
    
    ok_Button=()=>{
     
      this.setState({Alert_Visibility: false});
      this.props.navigation.navigate('Business')
              
    }

    submitData = async()=>{


      const {bTitle }  = this.state ;
      const { baddress }  = this.state ;
      const {week} = this.state
      const {weekEnd} = this.state
      const {pholiday} = this.state
      const {userid} = this.state
      const {images} = this.state
 




      let formdata = new FormData();
      formdata.append("name",bTitle);
      formdata.append("address",baddress);
      formdata.append("weekly",week);
      formdata.append("weekend",weekEnd);
      formdata.append("holiday",pholiday);
      formdata.append("latitude",'22.02558');
      formdata.append("longitude",'12.252574');
     this.state.images.forEach((element, i) => {
       console.log(element.path)
        const newFile = {
          uri: element.path, type: element.mime,
          name:'images.jpg'
        }
        formdata.append('pic[]', newFile)
      });
  
//      for (var i = 0; i < this.state.images.length; i++) {
     
//       formdata.append("pic[]",{
      
//  uri:this.state.images[i].path,
//  type: this.state.images[i].mime,
//  name:'chris2.png'

//       });
//     }
      formdata.append("uid",userid);
      if(this.validateInput()){
      await fetch('https://www.markupdesigns.org/paypa/api/addBusinessListing', {
        method: 'POST',
        headers: {
         'Content-Type': 'multipart/form-data',
         'Accept': 'application/json',
         
        },
        body:formdata
       
      }).then((response) => response.json()).then((responseJson) => {
        this.setState({Alert_Visibility:!this.state.Alert_Visibility}) 
        this.Show_Custom_Alert(responseJson.msg);
            
            console.warn(JSON.stringify(responseJson))
             this.setState({loading:false})
             if(responseJson.msg === 'Added listing')
             {
              this.setState({Alert_Visibility:!this.state.Alert_Visibility}) 
              this.Show_Custom_Alert(responseJson.msg);
        
              }
                
      
             
             else{
      
              alert(responseJson.msg);
             }
       
            }).catch((error) => {
              console.warn(error);
            });
    
         
        }
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
          <Title >Upload Business</Title>
          </Body>
         
        </Header>
        <ScrollView style={{flex:1}}>
 <Content  >
 <Modal
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          visible={this.state.Alert_Visibility}
          transparent={true}
 
          animationType={"fade"}
 
          onRequestClose={ () => this.setState({Alert_Visibility:!this.state.Alert_Visibility}) } >
 
 
            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0.2, 0.7)'}}>
 
 
                <View style={styles.Alert_Main_View}>
 
 
                    <Text style={styles.Alert_Title}>Registration Suceess </Text>
                   
                    <Text style={styles.Alert_Message}> Your Account will be verify shortly </Text>
                  
                  
                </View>
                <View style={{flexDirection: 'row',height:'10%',width:'70%'}}>
 <TouchableOpacity 
     style={styles.buttonStyle} 
     onPress={this.ok_Button} 
     activeOpacity={0.7} 
     >
     <Text style={styles.TextStyle}> Let's Start </Text>
 </TouchableOpacity>

</View>
 </View>
</ Modal >
<Text></Text>



<Item  regular style ={styles.InputItem} >

     <Input placeholder='Business Title' placeholderTextColor="#797b7d" 
     style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}}
     onChangeText={(bTitle)=>this.setState({bTitle})}
     />
          </Item>

          <Mytext></Mytext>
          
          <Item  regular style ={styles.InputItem} >

     <Input placeholder='Business Address' placeholderTextColor="#797b7d"
       onChangeText={(baddress)=>this.setState({baddress})} 
       value = {this.state.baddress}
     style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}} />
     <TouchableOpacity style = {{backgroundColor:'#1c4478',padding:9,paddingHorizontal:15}} onPress = {this.getAdreess}>
     {this.state.loadingLocation?<ActivityIndicator
               animating = {this.state.loadingLocation}
               color = 'white'
               size={"small"}
               style ={{height:32}}
              />:  <Icon name="md-pin" style={{ color:'white',fontSize:30, }} />}
   
   
   
    
     </TouchableOpacity>
          </Item>

          <Mytext></Mytext>
          <Text style = {{width:'90%',fontFamily: 'Roboto-Medium',paddingHorizontal:20}}> Business Hours</Text>

          <Mytext></Mytext>
          <View style={{flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'}}>
        <Text style = {styles.BusinessText}>
Weekly 
            
        </Text>

        <Text style = {styles.BusinessText}>
Weekend
            
        </Text>
        <Text style = {styles.BusinessText}>
Public Holiday
            
        </Text>

          </View>
<View style={{flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',paddingHorizontal:10,}}>

         <Item  regular style ={styles.InputItem2} >
    
     <Input placeholder='9-6' placeholderTextColor="#797b7d" 
     style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15,paddingHorizontal:7,lineHeight:10}} 
     onChangeText={(week)=>this.setState({week})}
     />
          </Item>
          <Item  regular style ={styles.InputItem2} >
    
     <Input placeholder='10-5' placeholderTextColor="#797b7d" 
     style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}}
     onChangeText={(weekEnd)=>this.setState({weekEnd})}
     
     />
          </Item>
          
          <Item  regular style ={styles.InputItem2} >
    
    <Input placeholder='off' placeholderTextColor="#797b7d" 
    style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}} 
    
    onChangeText={(pholiday)=>this.setState({pholiday})}
    />
         </Item>
         

          </View>
          <Mytext></Mytext>
          <Text style = {{width:'90%',fontFamily: 'Roboto-Medium',paddingHorizontal:17}}> Upload Business Photo</Text>
<View  style = {{width:'90%',height:5,backgroundColor:'grey',alignItems:'center',alignSelf:'center'}}/>
<Mytext></Mytext>
<View  style = {{width:'90%',height:90,backgroundColor:'white',alignItems:'center',alignSelf:'center'}}>


<FlatList
showsVerticalScrollIndicator={false}
horizontal={true}
          data={this.state.images}
          renderItem={({ item,index }) => (
            <View style={{ padding:2 }}>
               
               {/* <Image name="md-close" source={require('../../img/logo/logo.png')} style={{ height:40, width:40, backgroundColor:'#FF0000'}} onPress={()=>{this.deleteItem(index)}}/> */}
              <ImageBackground style={styles.imageThumbnail} source={{ uri: item.path }} >
                  <TouchableOpacity onPress={()=>{this.deleteItem(index)}} style = {{backgroundColor:'white',borderRadius:50,width:18,height:18,alignContent:'flex-end',alignItems:'flex-end'}}>
                  <Icon name = "md-close"style={{ fontSize:15,color:'black',borderRadius:20,paddingHorizontal:5}} />

                  </TouchableOpacity>
              
</ImageBackground>
             
            </View>
          )}
          //Setting the number of column
         // numColumns={5}
          extraData={this.state.images}
          keyExtractor={(item, index) => index.toString()}
          style = {{padding:5}}
        />



    </View>
<Mytext></Mytext>
     <View  style = {{width:'90%',backgroundColor:'#a3a7ad',alignItems:'center',alignSelf:'center'}}>

     <TouchableOpacity style = {{padding:5,paddingHorizontal:15}} onPress = {this.getImage}>
     <Icon name="md-camera" style={{ color:'white',fontSize:30, }} />
     </TouchableOpacity>
     
     </View>
     <Text>
       <Text></Text>
     </Text>
</Content>
</ScrollView>
<Footer style = {{
// @ts-ignore
color:'#dce0e6',
  backgroundColor:'#e46c0b'}}>
<TouchableWithoutFeedback onPress={this.submitData} >
{this.state.loading?<ActivityIndicator
               animating = {this.state.loading}
               color = 'white'
               size={"large"}
               style ={{paddingHorizontal:50,alignItems:'center',width:'100%'}}
              />: <Text style = {{color:'white',fontFamily:'Roborto ',fontSize:18,fontWeight:'800',padding:15}}>SUBMIT NOW</Text>}
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
 },
 InputItem2:{
marginHorizontal:10,
marginVertical:5,
    backgroundColor:'white',
    width:'28%',
    borderColor:'white',
  alignSelf:'center',
  

   },
   BusinessText:{
    marginHorizontal:10,
       fontSize:13,
        width:'25%',
       textAlign:'center',
       fontFamily:'Roboto-Medium'
      
       },
       imageThumbnail: {
        width:70,
          height: 70,
       
         
          resizeMode:'contain',
          borderColor:'grey',
          borderWidth:1
          
        },
        Alert_Main_View:{
 
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor : "white",
           
          height: 200 ,
          width: '70%',
          borderWidth: 1,
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
            color: "black",
            textAlign: 'center',
            padding: 10,
            height: '35%',
            fontFamily:'Roboto-Light'
          },
         
        buttonStyle: {
            
          width:'100%',
          backgroundColor:'#1c4478',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
         marginVertical:5,
         
         
          borderRadius:7,
        },
           
        TextStyle:{
            color:'white',
            textAlign:'center',
            fontSize: 23,
            marginTop: -5, fontFamily:'Roboto-Medium'
            
},});


