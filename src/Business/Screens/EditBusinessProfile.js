/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

//AIzaSyCkuCCndhl7YDUKBZvhX9N5yubGNC_LdjU


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
  TouchableWithoutFeedback,PermissionsAndroid,Modal,Picker,Dimensions,TimePickerAndroid
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
// @ts-ignore
import { Container, Radio,Right,Text, Left,Input,Item ,Button, List,ListItem,Footer,Header,CardItem,DeckSwiper,Card,Body,Title, Content,CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Mytext from '../../Common/Component/Mytext';
import DocumentPicker from 'react-native-document-picker';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Geocode from "react-geocode";
import {toastr} from '../../Common/Screens/LoginScreen'
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
const windowWidth = Dimensions.get('window').width;
Geocode.setApiKey("AIzaSyCkuCCndhl7YDUKBZvhX9N5yubGNC_LdjU");
 
// set response language. Defaults to english.
Geocode.setLanguage("en");
 
// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");
 
// Enable or disable logs. Its optional.
Geocode.enableDebug();
const data = [
  {"key": "a", "title":"Beauty Salons",},
  {"key": "b","title":"General Store",}, {"key": "c","title":"Filling Stations",},
 
];
export default class EditBusinessProfile extends React.Component {
   

    

    constructor(props){

        super(props);
   
    this.state ={
      bTitle:'',
      baddress:'',
   
      friday:'',
      saturday:'',
      sunday:'',
      loading:false,
      Alert_Visibility:false,
      Wtime1:'',
      Wtime2:'' ,
      weekdaycheck:false,fridaycheck:false,Satcheck:false,sundaycheck:false,
      weeekday:'',
      Ftime1:'',
      Ftime2:'' ,
      Stime1:'',
      Stime2:'' ,
      Sutime1:'',
      Sutime2:'' ,
      coverLoader:false,
      address:null,
      session_id:'',
msg:'',
images:[],
mobile:'',
imagesUpload:[],
showImgSelect:false,
userid:'',
address:null,
  lat:null,
  lng:null,
currentLongitude: '000',
currentLatitude: '000',
 latitude:null,
    longitude:null,
    loadingLocation:false,
    cat:'',
    allCat:[], mainLoader:false,isUploadImage:false,imageLoader:false
    }
}

validateInput = ()=>{
  const {bTitle }  = this.state ;
  const { baddress }  = this.state ;
  const {week} = this.state
  const {weekEnd} = this.state 
if( bTitle ===""){
  toastr.showToast("Enter Business Name")
return false
}

else if (baddress ==="")
{
  toastr.showToast("Enter Address")
  return false

}
else if( !this.state.images.length >0 ){
  toastr.showToast("Attached atleast one image")
  return false
}
else
this.setState({loading:true})
return true;
}
componentDidMount = async() => {
  
  const value = await AsyncStorage.getItem('uid')
  const mobile = await AsyncStorage.getItem('mobile')
  const session_id = await AsyncStorage.getItem('session_id')

  this.setState({mobile:mobile,userid:value,mainLoader:true,session_id:session_id},()=>{this.FetchData()})
 this. getCat()
  //Checking for the permission just after component loaded
  console.warn(session_id)
  
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
       (error) =>  this.locationError(),
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
locationError = ()=>{
  alert("Please activate your mobile location and try again")
  this.setState({loadingLocation:false})
}
setProfile = ()=>{
    ImagePicker.openPicker({ 
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
       
      }).then(image => {
 
         this.setState({pic:[...this.state.pic,...image,]})

         
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
      this.props.navigation.goBack(null)
              
    }
    getCat= async () => {
      await fetch('https://www.markupdesigns.org/paypa/api/categoryList',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
     
  
        }
  
      ).then((response) => response.json())
        .then((responseJson) => {
          console.log(JSON.stringify(responseJson))
          let getData = Object.values(responseJson.data)
  
          
  
          //  if(responseJson.data.Listing.pic)
          //  if(getData.pic.length>0){
          //     let img = JSON.parse(getData.pic);
          //     this.showImg = img[0];
          //  }
  
          this.setState({
            allCat: getData,
            loading: false, refreshing: false, reachEnd: false,
          },
          );
  
  
        }).catch((error) => {
          console.error(error);
        })
    }
    tConvert (time) {
      var hourEnd = time.indexOf(":");
      var H = +time.substr(0, hourEnd);
      var h = H % 12 || 12;
      var ampm = (H < 12 || H === 24) ? "AM" : "PM";
      time= h + time.substr(hourEnd, 3) + ampm;
      return time
    }
    submitData = async()=>{
     
      const {bTitle }  = this.state ;
      const { baddress }  = this.state ;
      let weekdaystart = this.state.weekdaycheck===true?null:this.state.Wtime1 
      let fristart = this.state.fridaycheck===true?null:this.state.Ftime1 
      let satstart = this.state.Satcheck===true?null:this.state.Stime1 
      let sunstart = this.state.sundaycheck===true?null:this.state.Sutime1 
      let weekdayend =   this.state.weekdaycheck?null:this.state.Wtime2 
      let friend =   this.state.fridaycheck?null:this.state.Ftime2 
      let satend =   this.state.Satcheck?null:this.state.Stime2 
      let sunend =   this.state.sundaycheck?null:this.state.Sutime2 
      const {mobile} = this.state
      const {userid} = this.state
      const {cat} = this.state
      let formdata = new FormData();
      formdata.append("name",bTitle);
      formdata.append("address",baddress);
      formdata.append("weekdaystart",weekdaystart);
      formdata.append("weekdayend",weekdayend);
      formdata.append("fristart",fristart);
      formdata.append("friend",friend);
      formdata.append("satstart",satstart);
      formdata.append("satend",satend);
      formdata.append("sunstart",sunstart);
      formdata.append("sunend",sunend);
      formdata.append("session_id", this.state.session_id);
      formdata.append("latitude",this.state.latitude);
      formdata.append("longitude",this.state.longitude);
      formdata.append("mobile",mobile);
      formdata.append("uid",userid);
      formdata.append("category_id",cat);
      formdata.append("session_id", this.state.session_id);
      if(this.validateInput()){
      await fetch('https://www.markupdesigns.org/paypa/api/addEditBusinessListing', {
        method: 'POST',
        headers: {
         'Content-Type': 'multipart/form-data',
         'Accept': 'application/json',
         
        },
        body:formdata
       
      }).then((response) => response.json()).then((responseJson) => {
        console.warn(responseJson)
             if(responseJson.status === 'Success')
             {
              this.setState({Alert_Visibility:!this.state.Alert_Visibility,loading:false}) 
              this.Show_Custom_Alert(responseJson.msg);
                  
                  console.warn(JSON.stringify(responseJson))
                 
              }
             else{
      
              alert(responseJson.msg);
              this.setState({Alert_Visibility:!this.state.Alert_Visibility,loading:false}) 
             }
       
            }).catch((error) => {
              console.warn(error);
            });
    
          }
        
      }
     
                    
            FetchData = async() =>{
              const {userid} = this.state
                      let formdata = new FormData();
                      formdata.append("session_id", this.state.session_id);
                      formdata.append("uid",userid);
                      await fetch('https://www.markupdesigns.org/paypa/api/viewBusinessListing', {
                        method: 'POST',
                        headers: {
                         'Content-Type': 'multipart/form-data',
                        },
              
                        body: formdata
                      }).then((response) => response.json())
                            .then((responseJson) => {
                              if(responseJson.status ==="Failure"){
                                console.warn("dfd",responseJson)
                       
                              }
                              else{
                                console.log("data",JSON.stringify(responseJson))
                                let fetchData= responseJson['data']['Listing'][0];
                            let img =JSON.parse(fetchData.pic)
                            console.warn(fetchData.weekdayend)
                                this.setState({mainLoader:false,cat:fetchData.category_id, bTitle:fetchData.name,baddress:fetchData.address,images:img!==null?img:[],           
                                Wtime1:fetchData.weekdaystart ,Wtime2:fetchData.weekdayend,
                                weekdaycheck:fetchData.weekdaystart ==='null'?true:false,
                                fridaycheck:fetchData.friend ==='null'?true:false,
                                Satcheck:fetchData.satstart ==='null'?true:false,
                                sundaycheck:fetchData.sunstart ==='null'?true:false,
                                 Ftime1:fetchData.fristart ,Ftime2:fetchData.friend,
                                  Stime1:fetchData.satstart ,Stime2:fetchData.satend,
                                   Sutime1:fetchData.sunstart,Sutime2:fetchData.sunend,
                              
                              })
                               
                            
                            } 
                            }).catch((error) => {
                              console.error(error);
                            });
                     
                    } 
                    
                    RemovePic = async(e) =>{
                      var array = [...this.state.images]; // make a separate copy of the array
                      var index = e
                      var item = array[e];
                      console.warn(item)
                      if (index !== -1) {
                        array.splice(index, 1);
                        this.setState({
                          images: array
                        });
                      }
                             
                              let formdata = new FormData();
                              formdata.append("uid",this.state.userid);
                              formdata.append('filePath',item);
                              formdata.append("session_id", this.state.session_id);
                              await fetch('https://www.markupdesigns.org/paypa/api/removeListingFile', {
                            
                                method: 'POST',
                                headers: {
                                 'Content-Type': 'multipart/form-data',
                                },
                      
                                body: formdata
                              }).then((response) => response.json())
                                    .then((responseJson) => {
                                  console.warn(responseJson)
                                      if(responseJson.status ==="Failure"){
                                        console.warn("dfd",responseJson.msg)
                                        this.setState({msg:responseJson.msg})
                                      }
                                      else{
                                        console.warn("data",JSON.stringify(responseJson))
                                       this.FetchData()
                                       
                                    
                                    } 
                                    }).catch((error) => {
                                      console.error(error);
                                    });
                            }
                            SetCover = async(item)=>{
                            this.setState({coverLoader:true})
                              let formdata = new FormData();
                              console.warn(item)
                              formdata.append("uid",this.state.userid);
                              formdata.append("filePath",item);
                              formdata.append("session_id", this.state.session_id);
                              await fetch('https://www.markupdesigns.org/paypa/api/addCoverPicListing', {
                                method: 'POST',
                                headers: {
                                 'Content-Type': 'multipart/form-data',
                                 'Accept': 'application/json',
                                 
                                },
                                body:formdata
                               
                              }).then((response) => response.json()).then((responseJson) => {
                                    console.warn(JSON.stringify(responseJson))
                                     this.setState({loading:false,showImgSelect:false})
                                     if(responseJson.status === 'Success')
                                     {
                                      this.setState({coverLoader:false})
                                      toastr.showToast("Cover image added")
                                      
                                      }
                                        
                                     else{
                              alert(responseJson.msg)
                              this.setState({coverLoader:false})
                                      // this.Show_Custom_Alert(responseJson.msg);
                                     }
                               
                                    }).catch((error) => {
                                      console.warn(error);
                                    });
                            }
                            getImage = ()=>{
                              ImagePicker.openPicker({
                                  multiple: true,
                                  quality: 1.0,
                                  maxWidth: 500,
                                  maxHeight: 500,
                                  mediaType:'photo'
                                 
                                }).then(image => {
                                  let oldimg = this.state.images.length
                                  let newimg = image.length
                                  let finalLength = oldimg+newimg
                                  console.warn(finalLength)
                                  if(finalLength > 10){
                                    alert("Only a maximum of 10 images are allowed")
                                    return false
                                  }
                                  else{
                             this.setState({imageLoader:true,isUploadImage:true})
                                  console.log(image)
                                  let formdata2 = new FormData();
                                  image.forEach((element, i) => {
                            
                                    const newFile = {
                                      uri: element.path, type: element.mime,
                                      name:element.mime.split("/")[1]==='png'?'images.png':'images.jpg'
                                      
                                    }
                                    
                                    formdata2.append('pic[]', newFile)
                                  });
                                  formdata2.append('uid', this.state.userid)
                                  formdata2.append('type', 'business')
                                  formdata.append("session_id", this.state.session_id);
                                fetch('https://www.markupdesigns.org/paypa/api/uploadImages', {
                                    method: 'POST',
                                    headers: {
                                     'Content-Type': 'multipart/form-data',
                                     'Accept': 'application/json',
                                     
                                    },
                                    body:formdata2
                                   
                                  }).then((response) => response.json()).then((responseJson) => {
                                  
                                        console.warn(JSON.stringify(responseJson))
                                         this.setState({loading:false})
                                         if(responseJson.status === 'Success')
                                         {
                                          // let data = responseJson.Listing;
                                          let myimges = responseJson.Listing
                                          this.setState({images:myimges,imageLoader:false,isUploadImage:false})
                                    
                                          }
                                         else{
                                  
                                          this.Show_Custom_Alert(responseJson.msg);
                                         }
                                   
                                        }).catch((error) => {
                                          console.warn(error);
                                        });
                            
                                }})
                                
                              }

                             GooglePlacesInput = ()=>{
                                return (
                                  
                                    <View >
                                      <GooglePlacesAutocomplete
                                          placeholder= {this.state.baddress ===""?'Address':this.state.baddress}
                                          minLength={4} // minimum length of text to search
                                          autoFocus={false}
                                          fetchDetails={true}
                                         
                                          returnKeyType={'default'}
                                         
                                          
                                          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                              
                                            var data = details;
                                            this.getAdd(data);
                                          }}
                                          query={{
                                            // available options: https://developers.google.com/places/web-service/autocomplete
                                            key: 'AIzaSyCkuCCndhl7YDUKBZvhX9N5yubGNC_LdjU',
                                            language: 'en',
                                             // default: 'geocode'
                                          }}
                                          enablePoweredByContainer={false}
                                          listViewDisplayed={"auto"}
                                          textInputProps={{
                                            onFocus: () => this.setState({ showPlacesList: true }),
                                            onBlur: () => this.setState({ showPlacesList: false }),
                                          }}
                                          styles={{
                                            
                                            textInputContainer: {
                                              backgroundColor: 'rgba(0,0,0,0)',
                                              borderTopWidth: 0,
                                              borderBottomWidth: 0,
                                              width:'92%',
                                              alignContent:'center',justifyContent:'center',alignItems:'center',alignSelf:'center'
                                            },
                                            textInput: {
                                              marginLeft: 0,
                                              marginRight: 0,
                                              height: 50,
                                            
                                              color:'#797b7d',fontSize:15
                                            },
                                            predefinedPlacesDescription: {
                                              color: '#1faadb',
                                            },
                                          }}

                                          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
					// GooglePlacesSearchQuery={{
					// 	rankby: 'distance',
					// 	types: 'mall'
					// }}
                                          filterReverseGeocodingByTypes={['locality','administrative_area_level_4', 'administrative_area_level_3','sublocality','postal_code',]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                                          // predefinedPlaces={[]}
                              
                                          predefinedPlacesAlwaysVisible={true}
                                        />
                                        </View>
                                        
                              )
                              }
                          
                              getAdd =(data) =>{
                                console.log("add",data);
                                this.setState(
                                    {
                                      baddress: data.formatted_address, // selected address
                                      latitude: data.geometry.location.lat,//  selected coordinates latitude
                                      longitude:data.geometry.location.lng, //  selected coordinates longitute
                          

                                    }
                                  );
                               
                          
                            }
                          

                           
    render(){
      if(this.state.mainLoader){
        return(
          <View style={{ position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center'}}>
          <ActivityIndicator
                       animating = {this.state.mainLoader}
                       color = '#1c4478'
                       size={"large"}
                       
                      />
                      </View>
        )
      }

    

  return (
   
 <Container style = {{flex:1,backgroundColor:'#e8edf1'}}>
    <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
          <Left>
          <Icon name='md-arrow-back'  style={{color:'white',fontSize:25,paddingLeft:10}} onPress = {()=>  this.props.navigation.goBack()}/>
          </Left>
          <Body  >
  <Title >Edit Business Profile</Title>
          </Body>
        </Header>
        <ScrollView style={{flex:1}}>
 <Content>
 <Modal transparent={true}
          visible={this.state.isUploadImage}
          onRequestClose={this.closeModal}>

          <View style={{
           flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0.2, 0.7)'
          }}>
           
           <ActivityIndicator
               animating = {this.state.imageLoader}
               color = 'white'
               size={"large"}
               style ={{paddingHorizontal:50,alignItems:'center',width:'100%'}}
              />
            </View>
        </Modal>
 <Modal
         visible={this.state.showImgSelect}
         transparent={true}
         animationType="slide"
         onRequestClose={ () => this.setState({showImgSelect:!this.state.showImgSelect}) } >
<View style={{ flex:1, justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0.8, 0.7)'}}>
<DeckSwiper
   ref={(c) => this._deckSwiper = c}
           dataSource={this.state.images}
           renderItem={item =>
             <Card style={{ elevation: 3 ,width:'100%',alignItems:'center',margin:10}}>
               <CardItem >
              <Left style= {{maxWidth:30,margin:5,}}>
              <Icon name="ios-arrow-back"   style = {{color:'#1c4478',fontSize:35,padding:5}} onPress={() => this._deckSwiper._root.swipeLeft()}/>
              </Left>
          <Body>
            <TouchableOpacity  style={{ height:300,width:'100%',}} onPress = {()=>{this.SetCover(item)}}>
          <Image style={{ height:300,width:'100%',resizeMode:'cover'}}  source={{uri: "https://www.markupdesigns.org/paypa/" + item }}/>
        </TouchableOpacity>
          </Body>
                 <Right style ={{maxWidth:30,margin:5}}>
                 <Icon name="ios-arrow-forward" onPress={() => this._deckSwiper._root.swipeRight()}  
                 style = {{fontSize:35,padding:5,color:'#1c4478'}}/>
                 </Right>
               </CardItem>
               <CardItem>
                </CardItem>
             </Card>
           }
         />
  
</View>
  </Modal>
 <Modal
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          visible={this.state.Alert_Visibility}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => this.setState({Alert_Visibility:!this.state.Alert_Visibility}) } >
            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0.2, 0.7)'}}>
                <View style={styles.Alert_Main_View}>
                <Image source={require('../../img/common/sucess.png')} style={{maxHeight:50,resizeMode: 'contain'}} />
                    <Text style={styles.Alert_Title}>Success</Text>  
                    <Text style={styles.Alert_Message}> Your Profile Updated Successfully</Text>  
                </View>
                <View style={{flexDirection: 'row',height:'10%',width:'70%'}}>
 <TouchableOpacity 
     style={styles.buttonStyle} 
     onPress={this.ok_Button} 
     activeOpacity={0.7} 
     >
     <Text style={styles.TextStyle}> OK </Text>
 </TouchableOpacity>

</View>
 </View>
</ Modal >
<Text></Text>
<Item  regular style ={styles.InputItem} >
<Left>
      <Picker
      itemStyle={{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:25}}
        selectedValue={this.state.cat}
        style={{ height: 50, width: windowWidth/1.1,  paddingLeft:0, paddingRight:0, backgroundColor:'white',}}
        onValueChange={(itemValue, itemIndex) => this.setState({cat:itemValue})}
      >
        <Picker.Item label= 'Select your business category'   color='#797b7d'  />
       {this.state.allCat.map((item)=>{return <Picker.Item label= {item.title}   value={item.id} color='#797b7d'   />})}
        
      </Picker>
     </Left>
     <Right>
      <Icon name='md-arrow-dropdown' style={{paddingRight:10,fontSize:30}} />
 </Right>

      </Item>
          <Text></Text>    
<Item  regular style ={styles.InputItem} >

     <Input placeholder='Business Name' placeholderTextColor="#797b7d" 
     style = {{color:'#797b7d',fontSize:15}}
     onChangeText={(bTitle)=>this.setState({bTitle})}
     value = {this.state.bTitle}
     />
     </Item>
     <Mytext></Mytext>
     {this.GooglePlacesInput()}
          <Item  regular style ={styles.InputItem} >
        
     {/* <Input placeholder='Business Address' placeholderTextColor="#797b7d"
       onChangeText={(baddress)=>this.setState({baddress})} 
       value = {this.state.baddress}
     style = {{color:'#797b7d',fontSize:15}} />


     <TouchableOpacity style = {{backgroundColor:'#1c4478',padding:9,paddingHorizontal:15}} onPress = {this.getAdreess}>
     {this.state.loadingLocation?<ActivityIndicator
               animating = {this.state.loadingLocation}
               color = 'white'
               size={"small"}
               style ={{height:32}}
              />:  <Icon name="md-pin" style={{ color:'white',fontSize:30, }} />}
     </TouchableOpacity> */}
          </Item>
          <Mytext></Mytext>
     <Text style = {{fontFamily: 'Roboto-Medium',paddingHorizontal:20,fontWeight:'bold'}}> Business Hours{this.state.weekdaycheck}</Text>
     <Text></Text>
          <List>
          <ListItem icon >
            <Left>
            <Text style = {{fontFamily: 'Roboto-Medium',fontSize:15,color:'#797b7d',fontWeight:'bold',alignItems:'center',justifyContent:'center',textAlign:'center',paddingVertical:3}}> Weekdays:</Text>
            </Left>
            <Body style={{borderBottomWidth: 0}}>
            <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'column'}}>
            <Text style = {{fontFamily: 'Roboto-Medium',fontSize:15,color:'#797b7d',fontWeight:'bold',alignItems:'center',justifyContent:'center',textAlign:'center',paddingVertical:3}}>Open</Text>
            <TouchableOpacity disabled={this.state.weekdaycheck?true:false}  onPress = {async()=>{

try {
  var {action, hour, minute} = await TimePickerAndroid.open({      
    is24Hour: false,
    mode:'spinner'
  });
  if (action !== TimePickerAndroid.dismissedAction) {
    let am_pm = 'AM';
    if (minute <10) {

      minute = '0' + minute;
      
  } 
if(hour>11){
  am_pm = 'PM';
  if(hour>12){
    hour = hour - 12;
  }
}

if(hour == 0){
  hour = 12;
}
  const selectedTime = `${hour}:${minute}${am_pm}` ;
  console.log(selectedTime)
  this.setState({ Wtime1:selectedTime })
  }
} catch ({code, message}) {
  console.warn('Cannot open time picker', message);
}

         }}
         style ={{backgroundColor:'white',borderRadius:5,padding:8,maxWidth:90,width:90}}
         >
<Text style = {{fontFamily: 'Roboto-Medium',fontSize:15,color:'#797b7d',}}>{this.state.weekdaycheck?null:this.state.Wtime1}</Text>
</TouchableOpacity>
</View>
<Text></Text>
         <View style={{flexDirection:'column'}}>
   <Text style = {{fontFamily: 'Roboto-Medium',fontSize:15,color:'#797b7d',fontWeight:'bold',textAlign:'center',paddingVertical:3}}>Close</Text>
            <TouchableOpacity  disabled={this.state.weekdaycheck?true:false} onPress = {async()=>{

try {
  var {action, hour, minute} = await TimePickerAndroid.open({      
    is24Hour: false,
    mode:'spinner'
  });
  if (action !== TimePickerAndroid.dismissedAction) {
    let am_pm = 'AM';
    if (minute <10) {

      minute = '0' + minute;
      
  } 
if(hour>11){
  am_pm = 'PM';
  if(hour>12){
    hour = hour - 12;
  }
}

if(hour == 0){
  hour = 12;
}
  const selectedTime = `${hour}:${minute}${am_pm}` ;
  console.log(selectedTime)
  this.setState({ Wtime2:selectedTime })
  }
} catch ({code, message}) {
  console.warn('Cannot open time picker', message);
}

         }}
         style ={{backgroundColor:'white',borderRadius:5,padding:8,padding:8,maxWidth:90,width:90}}
         >
        <Text style = {{fontFamily: 'Roboto-Medium',fontSize:15,color:'#797b7d',}}>{this.state.weekdaycheck?null:this.state.Wtime2}</Text>
        </TouchableOpacity>
        </View>
        <Text></Text>
        <View style={{flexDirection:'column'}}>
                    <Text style = {{fontFamily: 'Roboto-Medium',fontSize:15,color:'#797b7d',fontWeight:'bold',alignItems:'center',justifyContent:'center',textAlign:'center',paddingVertical:3}}>Closed</Text>   
        <CheckBox  color = '#1c4478' style={{marginTop:10,alignItems:'flex-start',alignSelf:'flex-start'}} checked={this.state.weekdaycheck}
                     onPress = {()=>{this.setState({weekdaycheck:!this.state.weekdaycheck})}}
                     />              
        </View>
      
        </View>
            </Body>
          
          </ListItem>
          <Text></Text>
          <ListItem icon  style ={{Top:5}}>
            <Left >
            <Text style = {{fontFamily: 'Roboto-Medium',fontSize:15,color:'#797b7d',fontWeight:'bold',alignItems:'center',justifyContent:'center',textAlign:'center',paddingVertical:3}}> Friday:       </Text>
            </Left>
            <Body style={{borderBottomWidth: 0}}>
            <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'column'}}>

            <TouchableOpacity disabled={this.state.fridaycheck?true:false}  onPress = {async()=>{

try {
  var {action, hour, minute} = await TimePickerAndroid.open({      
    is24Hour: false,
    mode:'spinner'
  });
  if (action !== TimePickerAndroid.dismissedAction) {
    let am_pm = 'AM';
    if (minute <10) {

      minute = '0' + minute;
      
  } 
if(hour>11){
  am_pm = 'PM';
  if(hour>12){
    hour = hour - 12;
  }
}

if(hour == 0){
  hour = 12;
}
  const selectedTime = `${hour}:${minute}${am_pm}` ;
  console.log(selectedTime)
  this.setState({ Ftime1:selectedTime })
  }
} catch ({code, message}) {
  console.warn('Cannot open time picker', message);
}

         }}
         style ={{backgroundColor:'white',borderRadius:5,padding:8,maxWidth:90,width:90}}
         >
<Text style = {{fontFamily: 'Roboto-Medium',fontSize:15,color:'#797b7d',}}>{this.state.fridaycheck?null:this.state.Ftime1}</Text>
</TouchableOpacity>
</View>
<Text></Text>
         <View style={{flexDirection:'column'}}>
            <TouchableOpacity disabled={this.state.fridaycheck?true:false}  onPress = {async()=>{

try {
  var {action, hour, minute} = await TimePickerAndroid.open({      
    is24Hour: false,
    mode:'spinner'
  });
  if (action !== TimePickerAndroid.dismissedAction) {
    let am_pm = 'AM';
    if (minute <10) {

      minute = '0' + minute;
      
  } 
if(hour>11){
  am_pm = 'PM';
  if(hour>12){
    hour = hour - 12;
  }
}

if(hour == 0){
  hour = 12;
}
  const selectedTime = `${hour}:${minute}${am_pm}` ;
  console.log(selectedTime)
  this.setState({ Ftime2:selectedTime })
  }
} catch ({code, message}) {
  console.warn('Cannot open time picker', message);
}

         }}
         style ={{backgroundColor:'white',borderRadius:5,padding:8,maxWidth:90,width:90}}
         >
<Text style = {{fontFamily: 'Roboto-Medium',fontSize:15,color:'#797b7d',}}>{this.state.fridaycheck?null:this.state.Ftime2}</Text>
</TouchableOpacity>
</View>
<Text></Text>
<View style={{flexDirection:'column'}}>    
<CheckBox  color = '#1c4478' style={{marginTop:10,alignItems:'flex-start',alignSelf:'flex-start'}} checked={this.state.fridaycheck}
                     onPress = {()=>{this.setState({fridaycheck:!this.state.fridaycheck})}}
                     />
</View>         
</View>
            </Body>
          </ListItem>
          <Text></Text>
          <ListItem icon >
            <Left >
            <Text style = {{fontFamily: 'Roboto-Medium',fontSize:15,color:'#797b7d',fontWeight:'bold',alignItems:'center',justifyContent:'center',textAlign:'center',paddingVertical:3}}> Saturday:  </Text>
            </Left>
            <Body style={{borderBottomWidth: 0}}>
            <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'column'}}>
            <TouchableOpacity disabled={this.state.Satcheck?true:false}  onPress = {async()=>{

try {
  var {action, hour, minute} = await TimePickerAndroid.open({      
    is24Hour: false,
    mode:'spinner'
  });
  if (action !== TimePickerAndroid.dismissedAction) {
    let am_pm = 'AM';
    if (minute <10) {

      minute = '0' + minute;
      
  } 
if(hour>11){
  am_pm = 'PM';
  if(hour>12){
    hour = hour - 12;
  }
}

if(hour == 0){
  hour = 12;
}
  const selectedTime = `${hour}:${minute}${am_pm}` ;
  console.log(selectedTime)
  this.setState({ Stime1:selectedTime })
  }
} catch ({code, message}) {
  console.warn('Cannot open time picker', message);
}

         }}
         style ={{backgroundColor:'white',borderRadius:5,padding:8,maxWidth:90,width:90}}
         >
<Text style = {{fontFamily: 'Roboto-Medium',fontSize:15,color:'#797b7d',}}>{this.state.Satcheck?null:this.state.Stime1}</Text>
</TouchableOpacity>
</View>
<Text></Text>
         <View style={{flexDirection:'column'}}>
           <TouchableOpacity  disabled={this.state.Satcheck?true:false}  onPress = {async()=>{

try {
  var {action, hour, minute} = await TimePickerAndroid.open({      
    is24Hour: false,
    mode:'spinner'
  });
  if (action !== TimePickerAndroid.dismissedAction) {
    let am_pm = 'AM';
    if (minute <10) {

      minute = '0' + minute;
      
  } 
if(hour>11){
  am_pm = 'PM';
  if(hour>12){
    hour = hour - 12;
  }
}

if(hour == 0){
  hour = 12;
}
  const selectedTime = `${hour}:${minute}${am_pm}` ;
  console.log(selectedTime)
  this.setState({ Stime2:selectedTime })
  }
} catch ({code, message}) {
  console.warn('Cannot open time picker', message);
}

         }}
         style ={{backgroundColor:'white',borderRadius:5,padding:8,maxWidth:90,width:90}}
         >
<Text style = {{fontFamily: 'Roboto-Medium',fontSize:15,color:'#797b7d',}}>{this.state.Satcheck?null:this.state.Stime2}</Text>
</TouchableOpacity>
</View>
<Text></Text>
<View style={{flexDirection:'column'}}>
<CheckBox  color = '#1c4478' style={{marginTop:10,alignItems:'flex-start',alignSelf:'flex-start'}} checked={this.state.Satcheck}
                     onPress = {()=>{this.setState({Satcheck:!this.state.Satcheck})}}
                     />
</View>
</View>
 </Body>
          
          </ListItem>
          <Text></Text>
          <ListItem icon >
            <Left >
            <Text style = {{fontFamily: 'Roboto-Medium',fontSize:15,color:'#797b7d',fontWeight:'bold',alignItems:'center',justifyContent:'center',textAlign:'center',paddingVertical:3}}> Sunday:    </Text>
          
            </Left>
            <Body style={{borderBottomWidth: 0}}>
            <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'column'}}>
            <TouchableOpacity disabled={this.state.sundaycheck?true:false} onPress = {async()=>{

try {
  var {action, hour, minute} = await TimePickerAndroid.open({      
    is24Hour: false,
    mode:'spinner'
  });
  if (action !== TimePickerAndroid.dismissedAction) {
    let am_pm = 'AM';
    if (minute <10) {

      minute = '0' + minute;
      
  } 
if(hour>11){
  am_pm = 'PM';
  if(hour>12){
    hour = hour - 12;
  }
}

if(hour == 0){
  hour = 12;
}
  const selectedTime = `${hour}:${minute}${am_pm}` ;
  console.log(selectedTime)
  this.setState({ Sutime1:selectedTime })
  }
} catch ({code, message}) {
  console.warn('Cannot open time picker', message);
}

         }}
         style ={{backgroundColor:'white',borderRadius:5,padding:8,maxWidth:90,width:90}}
         >
<Text style = {{fontFamily: 'Roboto-Medium',fontSize:15,color:'#797b7d',}}>{this.state.sundaycheck?null:this.state.Sutime1}</Text>
</TouchableOpacity>
</View>
<Text></Text>
         <View style={{flexDirection:'column'}}>
 
            <TouchableOpacity disabled={this.state.sundaycheck?true:false}  onPress = {async()=>{

try {
  var {action, hour, minute} = await TimePickerAndroid.open({      
    is24Hour: false,
    mode:'spinner'
  });
  if (action !== TimePickerAndroid.dismissedAction) {
    let am_pm = 'AM';
    if (minute <10) {

      minute = '0' + minute;
      
  } 
if(hour>11){
  am_pm = 'PM';
  if(hour>12){
    hour = hour - 12;
  }
}

if(hour == 0){
  hour = 12;
}
  const selectedTime = `${hour}:${minute}${am_pm}` ;
  console.log(selectedTime)
  this.setState({ Sutime2:selectedTime })
  }
} catch ({code, message}) {
  console.warn('Cannot open time picker', message);
}

         }}
         style ={{backgroundColor:'white',borderRadius:5,padding:8,maxWidth:90,width:90}}
         >
<Text style = {{fontFamily: 'Roboto-Medium',fontSize:15,color:'#797b7d',}}>{this.state.sundaycheck?null:this.state.Sutime2}</Text>
</TouchableOpacity>
</View>
<Text></Text>
<View style={{flexDirection:'column'}}>
<CheckBox  color = '#1c4478' style={{marginTop:10,alignItems:'flex-start',alignSelf:'flex-start'}} checked={this.state.sundaycheck}
                     onPress = {()=>{this.setState({sundaycheck:!this.state.sundaycheck})}}
                     />
</View>         
</View>
            </Body> 
          </ListItem>
        </List>
          <Mytext></Mytext>
         
          <Text style = {{width:'90%',fontFamily: 'Roboto-Medium',paddingHorizontal:17}}> Upload Business Photo</Text>
<View  style = {{width:'90%',height:5,backgroundColor:'grey',alignItems:'center',alignSelf:'center'}}/>
<Mytext></Mytext>
<View  style = {{width:'90%',height:90,backgroundColor:'white',flexDirection:'row',alignSelf:'center'}}>

<FlatList
showsVerticalScrollIndicator={false}
horizontal={true}
          data={this.state.images}
          renderItem={({ item,index }) => (
            <View style={{ padding:2,}}>
               
               {/* <Image name="md-close" source={require('../../img/logo/logo.png')} style={{ height:40, width:40, backgroundColor:'#FF0000'}} onPress={()=>{this.deleteItem(index)}}/> */}
              <ImageBackground style={styles.imageThumbnail} source={{ uri: 'https://www.markupdesigns.org/paypa/' + item}} >
                  <TouchableOpacity onPress={()=>{this.RemovePic(index)}} style = {{backgroundColor:'white',borderRadius:50,width:18,height:18,alignContent:'flex-end',alignItems:'flex-end'}}>
                  <Icon name = "md-close"style={{ fontSize:15,color:'black',borderRadius:20,paddingHorizontal:5}} />

                  </TouchableOpacity>
              
</ImageBackground>
             
            </View>
          )}
          //Setting the number of column
         // numColumns={5}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          style = {{padding:2}}
        />
    </View>
<Mytext></Mytext>
     <View  style = {{width:'90%',backgroundColor:'#a3a7ad',alignItems:'center',alignSelf:'center'}}>

     <TouchableOpacity style = {{padding:5,paddingHorizontal:15}} onPress = {this.getImage}>
     <Icon name="md-camera" style={{ color:'white',fontSize:30, }} />
     </TouchableOpacity>
     </View>
     <Text>
</Text>
{this.state.images.length >0 ?<View  style = {{width:'90%',backgroundColor:'#a3a7ad',alignItems:'center',alignSelf:'center'}}>

<TouchableOpacity style = {{padding:5,paddingHorizontal:15}} onPress = {()=>{this.setState({showImgSelect:true})}}>
<Text style = {{width:'90%',fontFamily: 'Roboto-Medium',paddingHorizontal:17,color:'white'}}> Select Cover Image</Text>
</TouchableOpacity>

</View>:null}
<Text>
          
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
  width:windowWidth/1.1,
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
   top: {
    height: '50%',
    justifyContent: 'center',
        alignItems: 'center',
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
       alignSelf:'center',
         
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


