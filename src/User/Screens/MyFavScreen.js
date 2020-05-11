import React, { Component } from 'react';
import { Container, Header, Left, Text, Body, Right,Input,Item, Button, Title, Content, } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  FlatList,
  View,
  Image,
  StyleSheet, StatusBar, TouchableWithoutFeedback, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {toastr} from '../../Common/Screens/LoginScreen'
const BaseUrl = "https://www.markupdesigns.org/paypa/";

export default class MyFavScreen extends Component {
  
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
      errormsg: '',
      showToast: false,
      heart: false,
      page:0,
      //uid:this.props.navigation.getParam('mydata')
      uid: '',
      refreshing: false,
      reachEnd: false,
      img: [],
      empty:false
      
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
 

  getMoreData = async () => {


    let formdata = new FormData();
let page  = this.state.page +1
    formdata.append("page",page);
    formdata.append("uid", this.state.uid);
    console.log("page no ", page)
    await fetch('https://www.markupdesigns.org/paypa/api/getFavouriteBusinessListing',
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

        if(responseJson.status ==="Success"){
        let getData = Object.values(responseJson.data)


        this.setState({
          dataSource: getData,
          loading: false, refreshing: false, reachEnd: false,
        },
        );
    }
    else if (responseJson.status ==='Failure'){
        this.setState({empty:true,loading: false, refreshing: false, reachEnd: false,})
    }
   else{
    this.setState({
     
        loading: false, refreshing: false, reachEnd: false,
      },
      );
   }

      }).catch((error) => {
        console.error(error);
      })
  }
  componentDidMount = async () => {
    const value = await AsyncStorage.getItem('uid')
  
    this.setState({ uid: value })

     this.getMoreData();

  }

  openDetails = (data) => {
   
    this.props.navigation.navigate("Time", {
      name: data.name,
      address: data.address,
      week: data.weekly,
      weekend:data.weekend,
      holiday:data.holiday,
      mobile: data.mobile,
      pic: data.pic,
      uids:this.state.uid,
      uid:this.state.uid
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
console.log("data after delete" + JSON.stringify(responseJson))
toastr.showToast("Removed Successfully")
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
  handleLoadMore = () => {
    this.setState({
     reachEnd: true,
    }, () => {
      this.getMoreData();
    })
  }
 

  render() {


    return (

      <Container styles={{ backgroundColor: "#e9edf0" }}>


        <Header style={{ backgroundColor: '#1c4478' }}>
          <StatusBar barStyle="light-content" backgroundColor="#1c4478" />


          <Text style={{alignSelf:'center',color:'white',fontSize:18,fontFamily:'Roboto-Medium'}}>My Favourites</Text>

        </Header>
        {/* <Header searchBar rounded style={{ backgroundColor: '#1c4478', }}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478" />
          <Item>
            
            <Input placeholder="Search" />
            <Icon name="md-search" style={{fontSize:25,paddingHorizontal:15,color:'#1c4478'}}/>
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header> */}
        {this.state.loading ? <ActivityIndicator
          animating={this.state.loading}
          color='#1c4478'
          size={"large"}
          style={{ paddingHorizontal: 50, alignItems: 'center' }} /> : 
        this.state.dataSource.length ===0 || this.state.empty ?
         <Text style = {{textAlign:'center'}}>No favourites available</Text> : <FlatList
            data={this.state.dataSource}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={20}
            ListFooterComponent={<ActivityIndicator
              animating={this.state.reachEnd}
              color='#1c4478'
              size={"large"}
            />}

            renderItem={({item, index}) => {
              if (item.uids != null) {
                  return <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', paddingRight: 10 }}>

<Image source={ item.CoverPic===null && item.pic !==null?{uri:"https://www.markupdesigns.org/paypa/" + JSON.parse(item.pic)[0]}:item.pic ===null?require('../../img/common/defaultImg.png'):{ uri:"https://www.markupdesigns.org/paypa/" + item.CoverPic}} style={styles.imageView} />
                  <TouchableWithoutFeedback >
                    <View style={{ flexDirection: 'column', width: "55%", paddingVertical: 5 }}>
                      <Text style={{ fontSize: 11, paddingHorizontal: 5, fontWeight: 'bold' }}>{item.name} </Text>
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
  
                        <Text style={{ fontSize: 11, color: '#c2612d', paddingHorizontal: 5 }}>1.5km</Text>
  
                      </View>
  
                    </View>
                  </TouchableWithoutFeedback>
  
                  <Icon name='md-trash'  style={{ color: '#e26d0e', fontSize: 25, paddingVertical: 10 }} onPress={() => this.likeHandling(item)} />
                  {/* <Icon name={item.uids?'md-heart':'md-heart-empty' } style={{color:'#e26d0e',fontSize:25,paddingVertical:10}} onPress = {() => this.likeHandling(item)}/> */}
                </View>
              }
              else{
                return <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', paddingRight: 10 }}>

<Image source={ item.CoverPic===null && item.pic !==null?{uri:"https://www.markupdesigns.org/paypa/" + JSON.parse(item.pic)[0]}:item.pic ===null?require('../../img/common/defaultImg.png'):{ uri:"https://www.markupdesigns.org/paypa/" + item.CoverPic}} style={styles.imageView} />
                <TouchableWithoutFeedback >
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

                      <Text style={{ fontSize: 11, color: '#c2612d', paddingHorizontal: 5 }}>1.5km{item.uids}</Text>

                    </View>

                  </View>
                </TouchableWithoutFeedback>

                <Icon  name= 'md-trash' style={{ color: 'grey', fontSize: 25, paddingVertical: 10 }} onPress={() => this.likeHandling(item)} />
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

  }

});