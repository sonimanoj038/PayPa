import React, { Component } from 'react';
import { Container, Header, Left, Text, Body, Right,Input,Item, Button, List,ListItem,CheckBox } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  FlatList,
  View,
  Image,
  StyleSheet, Slider,TouchableOpacity,StatusBar,Modal, TouchableWithoutFeedback,TouchableHighlight, ActivityIndicator,PermissionsAndroid,Platform, TouchableNativeFeedbackBase
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { getDistance, getPreciseDistance } from 'geolib';
import {toastr} from '../../Common/Screens/LoginScreen'
import Geolocation from '@react-native-community/geolocation';



export default class TimelineScreen extends Component {
  static navigationOptions = {

    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-briefcase" style={{ color: tintColor, fontSize: 30 }} />
    )
  }


  constructor(props) {

    super(props);
    this.showImg = '';

    this.state = {

      type: 0,
      selected1: true,
      selected: false,
      loading: true,
      mobile: '',
      pin: '',
      verifyInput: true,
      verifyInput2: true,
      dataSource: [],
      FreshDataList:[],
      errormsg: '',
      showToast: false,
      heart: false,
      result: 0,
      //uid:this.props.navigation.getParam('mydata')
      uid: '',
      text:'',
      refreshing: false,
      reachEnd: false,
      img: [],
      currentLongitude: '',
    currentLatitude: '',
    distance:0,
    isFilter:false,
    value:0,
    isChecked : [],
      selectedLists:[],
      allCat:[],
      disble:true
    }

  }

  checkFilter = ()=>{
console.log("cheking")
    if(this.state.value ==0 || this.state.selectedLists.length ==0)
    {
      toastr.showToast("Apply some filter first..")
    return false
    }
    else
   
    return true
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
  isIconCheckedOrNot = (item,index) => {
    let { isChecked,selectedLists} = this.state;
    isChecked[index] = !isChecked[index];
    this.setState({ isChecked : isChecked});
    if(isChecked[index] == true){
        selectedLists.push(item.id)
    }else {            
        selectedLists.pop(item.id)
    }

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
               currentLatitude:currentLatitude,loading: false,error:false },()=>  this.getMoreData());
             
   
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
  getMoreData = async () => {
    let formdata = new FormData();
    formdata.append("result", this.state.result);
    await fetch('https://www.markupdesigns.org/paypa/api/businessListing',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata

      }

    ).then((response) => response.json())
      .then(async(responseJson) => {
        console.log(JSON.stringify(responseJson))
        if(responseJson.status ==='Success'){         
          let data =  responseJson['data']['Listing']
          this.setState({
            dataSource: data,
            FreshDataList: data,
             refreshing: false, reachEnd: false,
          })
        
        }
        else
        alert(responseJson.msg)
      
      }).catch((error) => {
        console.error(error);
      })
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
           refreshing: false, reachEnd: false,
        },
        );


      }).catch((error) => {
        console.error(error);
      })
  }


  getFilterData= async () => {
    
  let val  = this.state.value
  let selected = this.state.selectedLists
  if(val !=0 || selected.length !=0)
    {
      console.log('hjh')
  this.setState({isFilter:false})
  const {currentLatitude} = this.state
  const {currentLongitude} = this.state
  const {value} = this.state
  const {selectedLists} = this.state
  let formdata = new FormData();

    formdata.append("result", this.state.result);
    formdata.append("latitude", currentLatitude);
    formdata.append("longitude", currentLongitude);
    formdata.append("distance", value);
    formdata.append("category_id",selectedLists.toString());

   
    await fetch('https://www.markupdesigns.org/paypa/api/businessListing',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
   
body:formdata
      }

    ).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if(responseJson.status ==='Success'){

          console.log("filter data ---" ,JSON.stringify(responseJson))
          let getData =  responseJson['data']['Listing']
          console.log("getdata" , JSON.stringify(getData))
       
        
          this.setState({
            dataSource: getData,
            loading: false, refreshing: false, reachEnd: false,
          })
        
        }
        else

        alert(responseJson.msg)
      


      }).catch((error) => {
        console.error(error);
      })
     
    }
    else{
      
    }
  
  }
  componentDidMount = async () => {
    const value = await AsyncStorage.getItem('uid')
    this.setState({ uid: value })
    await this.getAdreess()
   
  
    
    this.getCat()
  }

  openDetails = (data) => {
   
    this.props.navigation.navigate("Time", {
      name: data.name,
      address: data.address,
      week: data.weekdaystart + "-"+ data.weekdayend,
      fri:data.fristart + "-"+ data.friend,
      sat:data.satstart + "-"+ data.satend,
      sun:data.sunstart + "-"+ data.sunend,
      mobile: data.mobile,
      pic: data.pic,
      uids:data.uids,
      uid:this.state.uid,
      distance:Math.floor(getDistance({latitude:this.state.currentLatitude,longitude:this.state.currentLongitude}, {
        latitude: data.latitude,
        longitude: data.longitude,
        
    }, 1)/1000),
     latitude: data.latitude,
        longitude: data.longitude,
         clatitude: this.state.currentLatitude,
        clongitude: this.state.currentLongitude,

    });
  };

  likeHandling = async (data) => {
  

    let formdata = new FormData();

    formdata.append("uid", this.state.uid);
    formdata.append("bid", data.id);
    await fetch('https://www.markupdesigns.org/paypa/api/setFavouriteBusinessListing',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata

      }

    ).then((response) => response.json())
      .then((responseJson) => {

        this.getMoreData();

      }).catch((error) => {
        console.error(error);
      })
  }
  handleRefresh = () => {

    this.setState({ refreshing: true }, () => {
      this.getMoreData();
    })
  }
  // handleLoadMore = () => {
  //   this.setState({
  //     result: this.state.result + 25, reachEnd: true,
  //   }, () => {
  //     this.getMoreData();
  //   })
  // }
 
  change(value) {
    this.setState(() => {
      return {
        value: parseFloat(value),
      };
    });
  }
  searchFilterFunction = (term) => {
    //console.log('term:', term)
    let FreshDataList = [...this.state.FreshDataList]
    if (term === '') {
        this.setState({ dataSource: FreshDataList })
    } else {
        var term = term.toUpperCase()
        var filterList = FreshDataList.filter(item => {
            return item.name.toUpperCase().includes(term)
        })
        this.setState({ dataSource: filterList })
    }

};

// searchFilterFunction = text => {
  // this.setState({
  //     value: text
  // });

//   const newData = data.filter(item => {
    
//       const itemData = item.name.toUpperCase();
//       const textData = text.toUpperCase();
//       return itemData.includes(textData); // this will return true if our itemData contains the textData
//   });

//   this.setState({
//       dataSource: newData
//   });
// };
  render() {


    return (

      <Container style={{ backgroundColor: "#e9edf0" }}>


        <Header style={{ backgroundColor: '#1c4478' }}>
          <StatusBar barStyle="light-content" backgroundColor="#1c4478" />

          <Text style={{alignSelf:'center',color:'white',fontSize:18,fontFamily:'Roboto-Medium'}}>Providers</Text>


        </Header>
        <Header style={{ backgroundColor: '#1c4478' }} searchBar rounded noLeft noShadow>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478" />
                    <Item>
                        <Input placeholder="Search"  onChangeText={text => this.searchFilterFunction(text)}/>
                        <Icon name="md-search" style={{fontSize:25,paddingHorizontal:15,color:'#1c4478'}}/>
                    </Item>
                    <Right style={{ backgroundColor: '#e26d0e', maxWidth: 45, marginLeft: 10, justifyContent: 'center', marginRight: 5 }}>
                
                    <TouchableWithoutFeedback style ={{backgroundColor:'#e26d0e',margin:5}} onPress ={()=>this.setState({isFilter:true})}>
                    <Image source={require('../../img/user/filter3.png')} style={{maxHeight:41,maxWidth:35,resizeMode:'cover',borderRadius:20}} />
          {/* <Icon name="ios-outline-funnel" style={{fontSize:25,padding:6,color:'white',backgroundColor:'#e26d0e'}}/> */}
        </TouchableWithoutFeedback>
                    </Right>
                </Header>
               
        <Modal transparent={true}
          visible={this.state.isFilter}
          animationType='slide'
          onRequestClose={this.closeModal}>

          <View style={{
            position: 'relative',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            flex: 1,
            justifyContent: 'space-between',

            backgroundColor: 'white'
          }}>
            <TouchableHighlight onPress={() => this.setState({ isFilter: false, },()=>{this.getMoreData
            ()})} style={{ alignItems: 'flex-end' }}>

              <Icon name="md-close" style={{ padding: 5, right: 1.5, fontSize: 30, color: 'black', margin: 10 }} />
            </TouchableHighlight>
            <View style={{
              flex: 1
            }}>
                 <List style = {{borderColor:'#e26d0e',borderWidth:1,backgroundColor:'white'}}>
        <ListItem itemDivider  style = {{backgroundColor:'#e26d0e',padding:0,}}>
        <Text style = {{color:'white',fontSize:16,fontFamily:'Roboto-Medium'}}>Sort By Distance</Text>
            </ListItem>
          
            <ListItem style = {{backgroundColor:'white',padding:0}} >
            <Left>
            <Slider
          step={1}
          maximumValue={45}
          onSlidingComplete={this.change.bind(this)}
          onValueChange={this.change.bind(this)}
          style ={{flex:1}}
          value={this.state.value}
          thumbTintColor = '#e26d0e'
          maximumTrackTintColor='black'
          minimumTrackTintColor ='#e26d0e'
        />
        </Left>
        <Right>
        <Text style= {{color:'#5c391b',fontSize:14}}>{this.state.value} km</Text>
        </Right>
            </ListItem>
            </List>
                      
                       <List style = {{borderColor:'#e26d0e',borderWidth:1,backgroundColor:'#f2dece'}}>
        <ListItem itemDivider  style = {{backgroundColor:'#e26d0e',padding:0}}>
        <Text style = {{color:'white',fontSize:16,fontFamily:'Roboto-Medium'}}>Sort By Category</Text>
            </ListItem>
            </List>

           <FlatList
                data={this.state.allCat}
                renderItem={({ item, index }) => (
                  <View style={{ flex: 1, padding: 1 }}>

<List style = {{borderColor:'white',borderWidth:1,backgroundColor:'white'}}>
      
            <ListItem  style = {{backgroundColor:'white',padding:0}} >
            
              <Left>
                  <TouchableOpacity onPress ={()=> this.props.navigation.navigate('USregister')}> 
                <Text style= {{color:'#5c391b',fontSize:14}}>{item.title}</Text>
                </TouchableOpacity>
              </Left>
              <Right>
              <CheckBox  color = '#e26d0e' style={{paddingHorizontal:5}} checked={this.state.isChecked[index]}
                onPress={() => this.isIconCheckedOrNot(item,index)}/>
              </Right>
            </ListItem>
            </List>
                  </View>
                )}

                keyExtractor={(item, index) => index.toString()}
              /> 
              <Text></Text>
           
              <Button  block style ={{marginHorizontal:20,backgroundColor:'#e26d0e',}} onPress = {this.
  getFilterData}>
            <Text>Apply</Text>
          </Button>
              <Text>
              </Text>
            </View>
          </View>
        </Modal>

        {this.state.error?<View style ={{justifyContent:'center',alignItems:'center'}}><Text>Please activate your mobile location and try again </Text>
          <Button transparent  onPress ={()=>this.setState({loading:true},()=>this.getAdreess())}>
            <Text style={{color:'red'}}>Try Again</Text>
          </Button> 
        </View>:null}
        {this.state.loading ? <ActivityIndicator
          animating={this.state.loading}
          color='#1c4478'
          size={"large"}
          style={{ paddingHorizontal: 50, alignItems: 'center' }} /> : null}
        {this.state.loading ?
          null : <FlatList
            data={this.state.dataSource.sort((a,b) => {
              const aDist = Math.floor(getDistance({latitude:this.state.currentLatitude,longitude:this.state.currentLongitude}, {
                latitude: a.latitude,
                longitude: a.longitude,
            }, 1)/1000)
           
              const bDist = Math.floor(getDistance({latitude:this.state.currentLatitude,longitude:this.state.currentLongitude}, {
                latitude: b.latitude,
                longitude: b.longitude,
            }, 1)/1000)
              return aDist-bDist
 })}

             showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
           
            onEndReachedThreshold={1}
            ListFooterComponent={<ActivityIndicator
              animating={this.state.reachEnd}
              color='#1c4478'
              size={"large"}
            />}                                                                                         

            renderItem={({item, index}) => {
              if (item.uids != null) {
                  return <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', paddingRight: 10 }}>
            <Image source={ item.CoverPic===null && item.pic !==null?{uri:"https://www.markupdesigns.org/paypa/" + JSON.parse(item.pic)[0]}:item.pic ===null?require('../../img/common/defaultImg.png'):{ uri:"https://www.markupdesigns.org/paypa/" + item.CoverPic}} style={styles.imageView} />


                  <TouchableWithoutFeedback onPress={() => this.openDetails(item)}>
                    <View style={{ flexDirection: 'column', width: "55%", paddingVertical: 5 }}>
                      <Text style={{ fontSize: 13, paddingHorizontal: 5, fontWeight: 'bold' }}>{item.name} </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Icon name='md-pin' style={{ color: 'black', fontSize: 20, }} />
  
                        <Text style={{ fontSize: 11, paddingHorizontal: 5 }}>{item.address}</Text>
  
                      </View>
  
                      <View style={{ flexDirection: 'row' }}>
                        <Icon active name='md-phone-portrait' style={{ color: "black", fontSize: 20 }} />
  
                        <Text style={{ fontSize: 11, padding: 5 }}>{item.mobile}</Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Icon active name='md-time' style={{ color: "black", fontSize: 20 }} />
  
                        <Text style={{ fontSize: 11, padding: 5, color: '#3268a8' }}>Business Hours</Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: "black", fontSize: 11, fontWeight: 'bold' }}>Distance</Text>
  
                        <Text style={{ fontSize: 11, color: '#c2612d', paddingHorizontal: 5 }}>{Math.floor(getDistance({latitude:this.state.currentLatitude,longitude:this.state.currentLongitude}, {
               latitude: item.latitude,
               longitude: item.longitude,
           },1)/1000)} km away</Text>
  
                      </View>
  
                    </View>
                  </TouchableWithoutFeedback>
  
                  <Icon name={item.uids.includes(this.state.uid) ? 'md-heart' : 'md-heart-empty'} style={{ color: '#e26d0e', fontSize: 25, paddingVertical: 10 }} onPress={() => this.likeHandling(item)} />
                  {/* <Icon name={item.uids?'md-heart':'md-heart-empty' } style={{color:'#e26d0e',fontSize:25,paddingVertical:10}} onPress = {() => this.likeHandling(item)}/> */}
                </View>
              }
              else{
                return <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', paddingRight: 10 }}>

<Image source={ item.CoverPic===null && item.pic !==null?{uri:"https://www.markupdesigns.org/paypa/" + JSON.parse(item.pic)[0]}:item.pic ===null?require('../../img/common/defaultImg.png'):{ uri:"https://www.markupdesigns.org/paypa/" + item.CoverPic}} style={styles.imageView} />
                <TouchableWithoutFeedback onPress={() => this.openDetails(item)}>
                  <View style={{ flexDirection: 'column', width: "55%", paddingVertical: 5 }}>
                    <Text style={{ fontSize: 11, paddingHorizontal: 5, fontWeight: 'bold' }}>{item.name} </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Icon name='md-pin' style={{ color: 'black', fontSize: 20, }} />

                      <Text style={{ fontSize: 11, padding: 5 }}>{item.address}</Text>

                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <Icon active name='md-phone-portrait' style={{ color: "black", fontSize: 20 }} />

                      <Text style={{ fontSize: 11, padding: 5 }}>{item.mobile}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Icon active name='md-time' style={{ color: "black", fontSize: 20 }} />

                      <Text style={{ fontSize: 11, padding: 5, color: '#3268a8' }}>Business Hours</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ color: "black", fontSize: 11, fontWeight: 'bold' }}>Distance</Text>

                      <Text style={{ fontSize: 11, color: '#c2612d', paddingHorizontal: 5 }}>{Math.floor(getDistance({latitude:this.state.currentLatitude,longitude:this.state.currentLongitude}, {
               latitude: item.latitude,
               longitude: item.longitude,
           }, 1)/1000)} km away</Text>

                    </View>

                  </View>
                </TouchableWithoutFeedback>

                <Icon  name= 'md-heart-empty' style={{ color: '#e26d0e', fontSize: 25, paddingVertical: 10 }} onPress={() => this.likeHandling(item)} />
                {/* <Icon name={item.uids?'md-heart':'md-heart-empty' } style={{color:'#e26d0e',fontSize:25,paddingVertical:10}} onPress = {() => this.likeHandling(item)}/> */}
              </View>
              }
            }
          }
            keyExtractor={(item, index) => index.toString()}
            style={{ backgroundColor: '#e9edf0', padding: 10 }}
          />}




      </Container>
    );
  }
}
const styles = StyleSheet.create({

  MainContainer: {

    justifyContent: 'center',
    flex: 1,
    margin: 5,
    marginTop: (Platform.OS === 'ios') ? 20 : 0,

  },

  imageView: {
    backgroundColor: "grey",
    width: '35%',
    height: 120,
    margin: 7,
    borderRadius: 7,
    justifyContent: 'center'

  },

  textView: {
    backgroundColor: '#e6ede8',

    padding: 5,
    color: '#000'

  },
  

});