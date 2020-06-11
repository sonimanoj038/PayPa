import React, { Component } from 'react';
import {
  View, Alert,
  Text,
  StyleSheet, TextInput,Dimensions,
  Image, TouchableOpacity, FlatList, ActivityIndicator, StatusBar, ImageBackground, Modal, TouchableHighlight
} from "react-native";
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, ActionSheet, Content, Header, Container, Item, Input, List, ListItem } from 'native-base'
import Shimmer from '../../Common/Service/Shimmer';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions, StackActions,withNavigationFocus,NavigationEvents } from 'react-navigation';
import Swiper from 'react-native-swiper'
import moment from 'moment';
const { width } = Dimensions.get('window')
var BUTTONS = [ { text: "Report",icon: "book", iconColor: "#ea943b" },
{ text: "Mute",icon: "eye-off", iconColor: "grey" },
{ text: "Cancel", icon: "close", iconColor: "red" },
]
var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;

const images= [
  "https://source.unsplash.com/1024x768/?nature",
  "https://source.unsplash.com/1024x768/?water",
  "https://source.unsplash.com/1024x768/?girl",
  "https://source.unsplash.com/1024x768/?tree",

]
const baseurl = "https://www.markupdesigns.org/paypa/"
export default class UserTimline extends React.Component {
  static navigationOptions = {
    tabBarVisible: true,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-home" style={{ color: tintColor, fontSize: 30 }} />
    )
  }


  constructor(props) {

    super(props);
    this.showImg = '';

    this.state = {

      type: 0,
      name: '',
      dataSource: [],
      errormsg: '',
      showToast: false,
      heart: false,

      result: 0,
      //uid:this.props.navigation.getParam('mydata')
      uid: '',
      refreshing: false,
      reachEnd: false,
      img: [],
      loading: false,
      page: 0,
      liked: null,
      isVisible: false,
      dataComment: [],
      msg: '', Comments: '',
      comment_id: '',
      isLikeList: false,
      likeData: [],
      commentFoc: false,
      focuskey: false,
      editCommentid: '',
      isShow:true,
      isVisible2:true,empty:false,
      session_id:''


    }

  }
  setModalVisible = (visible) => {
    this.setState({ isVisible: false,dataComment:[], });
  }
  openDetails = (data) => {
    console.warn('clicked')
    this.props.navigation.navigate("UTimlineView", {
      images: data.files,

    });
  };

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
   ;
    let page  = this.state.page +1
        formdata.append("page",page);
    formdata.append("uid", this.state.uid);
    console.log("page no ", page)
    formdata.append("session_id", this.state.session_id);
    await fetch('https://www.markupdesigns.org/paypa/api/timelineListing',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata

      }

    ).then((response) => response.json())
      .then((responseJson) => {
       console.log("fdsf"+JSON.stringify(responseJson))
        if (responseJson.status === "Success") {
          let getData = Object.values(responseJson.data)


          this.setState({
            dataSource: getData,
            loading: false, refreshing: false, reachEnd: false,empty:false
          },
        
          )
          setTimeout(()=> {
            this.setState({
               isVisible2:true
            });
        }, 1000);
        }
        else if (responseJson.status === 'Failure') {
          this.setState({ empty: true,refreshing:false })
        }
        else {
          this.setState({

            loading: false, refreshing: false, reachEnd: false,dataSource:[]
          },
          );
        }

      }).catch((error) => {
        console.error(error);
      })
  }

  FetchComments = async (data) => {
    this.setState({ isVisible: true, comment_id: data.id, msg: "",isShow:false })
  
    let formdata = new FormData();
    formdata.append("uid", this.state.uid);
    formdata.append('timeline_id', data.id);
    formdata.append("session_id", this.state.session_id);
    await fetch('https://www.markupdesigns.org/paypa/api/timelineCommentList', {

      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },

      body: formdata
    }).then((response) => response.json())
      .then((responseJson) => {

        if (responseJson.status === "Failure") {
          console.warn("dfd", responseJson.message)
          this.setState({ msg: responseJson.message })
        }
        else {
          console.log("data", JSON.stringify(responseJson))
          let dataComment = responseJson['data'];
         
          this.setState({ loading: false, dataComment: dataComment, isVisible: true, comment_id: data.id })

          setTimeout(()=> {
            this.setState({
              isShow:true
            });

        }, 1000);
        }

      }).catch((error) => {
        console.error(error);
      });

  }
  FetchAgain = async () => {
    this.setState({ isVisible: true, msg: '' })

    let formdata = new FormData();
    formdata.append("session_id", this.state.session_id);
    formdata.append('timeline_id', this.state.comment_id);
    formdata.append("uid", this.state.uid);
    await fetch('https://www.markupdesigns.org/paypa/api/timelineCommentList', {

      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },

      body: formdata
    }).then((response) => response.json())
      .then((responseJson) => {

        if (responseJson.status === "Failure") {
          console.warn("dfd", responseJson.message)
          this.setState({ msg: responseJson.message })
        }
        else {
          console.log("data", JSON.stringify(responseJson))
          let dataComment = responseJson['data'];
         
          this.setState({ loading: false, dataComment: dataComment, isVisible: true, })
          setTimeout(()=> {
            this.setState({
              isShow:true
            });

        }, 1000);

        }
      }).catch((error) => {
        console.error(error);
      });

  }
  AddComments = async () => {

    this.setState({ Comments: "" })
    let formdata = new FormData();
    formdata.append("session_id", this.state.session_id);
    formdata.append('timeline_id', this.state.comment_id);
    formdata.append("uid", this.state.uid);
    formdata.append("comment", this.state.Comments);
    await fetch('https://www.markupdesigns.org/paypa/api/timelineAddComment', {

      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },

      body: formdata
    }).then((response) => response.json())
      .then((responseJson) => {

        if (responseJson.status === "Failure") {
          alert(responseJson.message)
          this.setState({ msg: responseJson.message })
        }
        else {
          let item = this.state.comment_id
          this.FetchAgain()
          this.handleRefresh();

        }
      }).catch((error) => {
        console.error(error);
      });

  }
  componentDidMount = async () => {
    const value = await AsyncStorage.getItem('uid')
    const session_id = await AsyncStorage.getItem('session_id')
    this.setState({ uid: value,isVisible2:false ,session_id:session_id})

    this.getMoreData();

  }



  likeHandling = async (item) => {
    let formdata = new FormData();
    formdata.append("uid", this.state.uid);
    formdata.append("timeline_id", item.id);
    formdata.append("session_id", this.state.session_id);
    await fetch('https://www.markupdesigns.org/paypa/api/timelineLikeDislike',
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
  handleLoadMore = () => {
   
    this.setState({
     reachEnd: true,
    }, () => {
      this.getMoreData();
    })
  }

  CommentlikeHandling = async (data) => {

    let formdata = new FormData();
    formdata.append("session_id", this.state.session_id);
    formdata.append("user_id", this.state.uid);
    formdata.append("comment_id", data.comment_id);
    await fetch('https://www.markupdesigns.org/paypa/api/timelineCommentLikeDislike',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata

      }

    ).then((response) => response.json())
      .then((responseJson) => {

        this.FetchAgain()


      }).catch((error) => {
        console.error(error);
      })
  }



  GettingLikes = async (data) => {
    this.setState({ isLikeList: true, msg: "" })

    let formdata = new FormData();
    formdata.append("session_id", this.state.session_id);
    formdata.append('timeline_id', data.id);
    await fetch('https://www.markupdesigns.org/paypa/api/timelineLikeList', {

      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },

      body: formdata
    }).then((response) => response.json())
      .then((responseJson) => {

        if (responseJson.status === "Failure") {
          let msg = "No post like"
          this.setState({msg:msg})
          setTimeout(()=> {
            this.setState({
              isShow:true
            });

        }, 1000);
        }
        else {
          console.log("data", JSON.stringify(responseJson))
          let data = responseJson['data'];
          let FinalData = data.reverse().map((data, i) => {
            return data
          })
          this.setState({ loading: false, likeData: FinalData })
          setTimeout(()=> {
            this.setState({
              isShow:true
            });

        }, 1000);

        }

      }).catch((error) => {
        console.error(error);
      });

  }

  EditComment = async (data) => {
    this.myTextInput.focus()
    this.setState({ commentFoc: true, Comments: data.comment, editCommentid: data.comment_id })

  }
  SubmitNewComment = async (data) => {

    let formdata = new FormData();
    formdata.append("session_id", this.state.session_id);
    formdata.append("uid", this.state.uid);
    formdata.append("comment_id", this.state.editCommentid);
    formdata.append("comment", this.state.Comments);

    await fetch('https://www.markupdesigns.org/paypa/api/timelineEditComment',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ commentFoc: false, Comments: "" })
        this.FetchAgain()
      }).catch((error) => {
        console.error(error);
      })
  }


  DeleteComment = async (data) => {
    Alert.alert(
      //title
      'Alert!',
      //body
      'Are You Sure to Delete ?',
      [
        { text: 'Yes', onPress: () => this.deleteConfirm(data) },
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  }
  deleteConfirm = async (data) => {
    console.warn('enter')
    let formdata = new FormData();
    formdata.append("session_id", this.state.session_id);
    formdata.append("uid", this.state.uid);
    formdata.append("comment_id", data.comment_id);

    await fetch('https://www.markupdesigns.org/paypa/api/timelineDeleteComment',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata
      }).then((response) => response.json())
      .then((responseJson) => {
        this.FetchAgain()
        this.handleRefresh();
       }).catch((error) => {
        console.error(error);
      })
    }

  renderPagination = (index, total, context) => {            
    return (
      <View style={styles.paginationStyle}>
        <Text style={{ color: 'white' }}>
          <Text style={styles.paginationText}>{index + 1}</Text>/{total}
        </Text>
      </View>
    )

   }   

   onLikePost=({index,item})=>{
    let {dataSource} = this.state;
    let targetPost = dataSource[index]
   
    if(targetPost.isUserLlike === 0){
     
     targetPost.isUserLlike =1
     targetPost.countLike = targetPost.countLike+1
     dataSource[index] = targetPost
     this.setState({dataSource})
     this.likeHandling(item)
    }
    else{
      targetPost.isUserLlike = 0
      targetPost.countLike = targetPost.countLike-1
   dataSource[index] = targetPost
     this.setState({dataSource})
     this.likeHandling(item)
   
    }
   }

   onLikeComment=({index,item})=>{
    let {dataComment} = this.state;
    let targetPost = dataComment[index]
   
    if(targetPost.isLike === 0){
     targetPost.isLike = 1
     targetPost.countLike = targetPost.countLike+1
     dataComment[index] = targetPost
     this.setState({dataComment})
     this.CommentlikeHandling(item)
    }
    else{
      targetPost.isLike = 0 
      targetPost.countLike = targetPost.countLike-1
      dataComment[index] = targetPost
     this.setState({dataComment})
     this.CommentlikeHandling(item)
   
    }
   }
  render() {
    const { navigate } = this.props.navigation;
    const images2 = {

      "1": require('../../img/business/1.jpg'),
      "2": require('../../img/business/2.jpg'),
      "3": require('../../img/business/3.png')
    }
    return (
      <Container >
         <NavigationEvents
        onWillFocus = {()=>this.handleRefresh()}
        />
        <Header style={{ backgroundColor: '#1c4478' }}>
          <StatusBar barStyle="light-content" backgroundColor="#1c4478" />
          <Left style ={{flex:1}}>
          </Left>
          <Body style ={{flex:1,alignItems:'center'}}>
            <TouchableOpacity onPress= {this.getMoreData}>
            <Text style={{  color: 'white', fontSize: 20, fontFamily: 'Roboto-Medium' }}>PayPa </Text>
            </TouchableOpacity>
            </Body>
          <Right style ={{flex:1}}>
            <Text style={{ color: 'white', fontSize: 15, paddingHorizontal: 5, fontFamily: 'Roboto-Medium' }}
              onPress={() => navigate('UWallet')}
            >Wallet</Text>
            <Icon name="ios-wallet" style={{ color: 'white', fontSize: 20, paddingRight: 5 }} />
          </Right>
        </Header>
        <Modal transparent={true}
          visible={this.state.isVisible}
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
            <TouchableHighlight onPress={this.setModalVisible.bind(this, false)} style={{ alignItems: 'flex-end' }}>

              <Icon name="md-close" style={{ padding: 5, right: 1.5, fontSize: 30, color: 'black', margin: 10 }} />
            </TouchableHighlight>
   
            <View style={{
              flex: 1
            }}>
              {this.state.msg === "" ? <FlatList
                data={this.state.dataComment}
               extraData ={this.state}
                style={{ bottom: 20 }}
                renderItem={({ item, index }) => (
                    <List style ={{padding:2,paddingBottom:2}} listItemPadding={0}>
                    <ListItem  avatar style ={{marginLeft:0,marginTop:0,marginBottom:0,borderBottomWidth:0}} >
                   
                      <Left style ={{borderRadius:10,left:5}}>
                      <Shimmer autoRun={true} style={styles.imagew} visible={this.state.isShow} >
                      
                      <Thumbnail source={ item.pic?{ uri: "https://www.markupdesigns.org/paypa/" + item.pic}:require('../../img/common/profile.png')}  />
                        </Shimmer>
                        <View style ={{flexDirection:'column'}}>
                      <Shimmer autoRun={true} visible={this.state.isShow} style ={{height:50}}>
                      <View style={{backgroundColor:'#e6e8ed',marginLeft:15,borderRadius:1,padding:5}}>
                      <Text style ={{fontSize:15,fontWeight:'bold',paddingHorizontal:5}}>{item.name}</Text>
                  <Text note style ={{fontSize:12,paddingHorizontal:5}}>{item.comment}</Text>
                  </View>
                  </Shimmer>
                  
                  <View style ={{flexDirection:'row',marginLeft:20,maxHeight:20,}}>
                  <Text note style={{color:'#1c4478',fontSize:10,paddingTop:3}}>{moment(item.is_created).fromNow()}</Text>
                  <TouchableOpacity  onPress = {()=>this.onLikeComment({index,item})} style
                   ={{paddingLeft:5}}>
           
                  <Image source={item.isLike ===0?require('../../img/common/like.png'):require('../../img/common/liked_new.png')} style={{maxHeight:20,maxWidth:20,resizeMode:'contain',marginTop:2}} />
                                   </TouchableOpacity>
                                   <Text style= {{fontFamily: 'Roboto-Light',fontSize:12,fontWeight:'bold',paddingTop:5 }}>{item.countLike} </Text>
                                   {this.state.uid === item.user_id?  <TouchableOpacity   onPress={()=>{this.EditComment(item)}}>
         
         <Text style={{color:'#1c4478',fontSize:10,paddingLeft:5,paddingTop:3}}>edit</Text>
      </TouchableOpacity>  :null}     
      {this.state.uid === item.user_id?   <TouchableOpacity onPress={() => this.DeleteComment(item)} >
      
      <Text style={{ color: '#1c4478', fontSize: 10, paddingLeft: 5, paddingTop: 3 }}>delete</Text>
      </TouchableOpacity>:null}
                  </View>
               </View>
                      </Left> 
                    </ListItem>
                  </List>
                 
                )}
                //Setting the number of column

                keyExtractor={(item, index) => index.toString()}
              /> : <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{this.state.msg}</Text>
              }
              <Text></Text>
              <Item style={{
                width: '100%', position: 'absolute', borderColor: '#1c4478', borderWidth: 2,
                bottom: 5,
                left: 0, backgroundColor: 'white'
              }}>
                <Left >
                  <TextInput placeholder="Enter Your Comment Here"
                    onChangeText={Comments => this.setState({ Comments })}
                    ref={(ref) => { this.myTextInput = ref }}
                    multiline={true}

                    value={this.state.Comments}

                    placeholderTextColor='grey' style={{ fontSize: 13, color: 'grey' }} />
                </Left>

                <Right style={{ maxWidth: 60 }}>
                
                  {this.state.commentFoc ? <Button disabled = {this.state.Comments ===""?true:false}  transparent onPress={this.SubmitNewComment} style={{ paddingRight: 5 }}>
                    <Text style={{ color: '#1c4478', fontWeight: 'bold' }}>EDIT</Text></Button> :

                    <Button disabled = {this.state.Comments ===""?true:false} transparent onPress={this.AddComments} style={{ paddingRight: 5 }}><Text style={{ color: '#1c4478', fontWeight: 'bold' }}>POST</Text>
                    </Button>}
                </Right>
              </Item>
              <Text>
              </Text>
            </View>
          </View>
        </Modal>
        <Modal transparent={true}
          visible={this.state.isLikeList}
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
            <TouchableHighlight onPress={() => this.setState({ isLikeList: false })} style={{ alignItems: 'flex-end' }}>
              <Icon name="md-close" style={{ padding: 5, right: 1.5, fontSize: 30, color: 'black', margin: 10 }} />
            </TouchableHighlight>
            <View style={{
              flex: 1
            }}>
              {this.state.msg === "" ? <FlatList
                data={this.state.likeData}
                renderItem={({ item, index }) => (
                  <View style={{ flex: 1, padding: 1 }}>

                    <List style={{ paddingHorizontal: 10 }} listItemPadding={0}>
                      <ListItem  avatar noBorder style={{ marginLeft: 0, marginTop: 0, marginBottom: 0, }} >
                      <Left>              
                <Shimmer autoRun={true} style={styles.imagew} visible={this.state.isShow}>
                <Thumbnail source={ item.pic?{ uri: "https://www.markupdesigns.org/paypa/" + item.pic}:require('../../img/common/profile.png')}  />
                  </Shimmer>
                </Left>
                   <Body>
                    <Shimmer autoRun={true} visible={this.state.isShow} >
                <Text>{item.name}</Text>
               
           </Shimmer>         
                        </Body>
                      </ListItem></List>
                  </View>
                )}

                keyExtractor={(item, index) => index.toString()}
              /> : <Text style={{ fontSize: 15, fontWeight: 'bold' ,padding:10}}>{this.state.msg}</Text>
              }
              <Text></Text>
              <Text>
              </Text>
            </View>
          </View>
        </Modal>
        {this.state.empty?<View style ={{justifyContent:'center',alignItems:'center'}}>
          <Text style ={{fontWeight:'bold',textAlign:'center',alignItems:'center',padding:20}}>No Post Yet,Add providers into your favorite list to see their posts </Text>
          <Button transparent  onPress ={this.getMoreData}>
            <Text style={{color:'red'}}>Refresh</Text>
          </Button>
          </View>:
           <FlatList
           data={this.state.dataSource}
           showsVerticalScrollIndicator={false}
           extraData={this.state}
           refreshing={this.state.refreshing}
           onRefresh={this.handleRefresh}
           onEndReached={this.handleLoadMore}
           onEndReachedThreshold={0}
           ListFooterComponent={<ActivityIndicator
             animating={this.state.reachEnd}
             color='#1c4478'
             size={"large"}
           />}
           renderItem={({ item, index }) => (
 
             item.isUserLlike === 0 ? <Card noShadow={true} style={{
               elevation: 0,
               shadowOpacity: 0, borderColor: 'transparent',borderBottomWidth:0,borderTopWidth:0
             }}>
               <CardItem style={{
              
                 borderColor: 'transparent', maxHeight: 60,borderBottomWidth:0,borderTopWidth:0
               }}>
 
                 <Left>
                 <Shimmer autoRun={true} style={{width:50,height:50,borderRadius:50}} visible={this.state.isVisible2}>
                   <TouchableOpacity  onPress={() => navigate('BusinessView',{user_id:item.user_id})}>
                    <Thumbnail source={ item.pic?{ uri: "https://www.markupdesigns.org/paypa/" + item.pic}:require('../../img/common/profile.png')}  />
                   </TouchableOpacity>
                  </Shimmer>
                   <Body >
                   <Shimmer autoRun={true} visible={this.state.isVisible2}>
                     <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 15,fontWeight:'bold' }}>{item.name}</Text>
                    
                     <Text note style={{ fontFamily: 'Roboto-Light', fontSize: 11 }}>{moment(item.is_created).fromNow()}</Text>
                   </Shimmer>
                   </Body>
                 </Left> 
                 <Right>
              
                </Right>
               </CardItem>
               <CardItem style={{
            
                 borderColor: 'transparent',borderBottomWidth:0,borderTopWidth:0}}>
                 <Body >
                 <Shimmer autoRun={true} visible={this.state.isVisible2}>
                   <Text style = {{textAlign:'justify'}}>
                     {item.message}
                   </Text>
                   </Shimmer>
                 </Body>
               </CardItem>
               <CardItem cardBody >
             {item.files?
             <Shimmer autoRun={true} style ={{height:250,flex:1}} visible={this.state.isVisible2}>
             {/* <View style={[styles.paginationStyle,]}>
               <Text style={{ color: 'grey' }}>
                 <Text style={styles.paginationText}>15</Text>/5
               </Text>
             </View> */}
                <Swiper
           style={styles.wrapper}
           renderPagination={this.renderPagination}
           loop={false}
           height={280}
           loop
         >
          { item.files.split(",").map((item, i) =><View style={styles.slide} title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
             <Image style={styles.image} source={{uri: "https://www.markupdesigns.org/paypa/" + item}} />
             
           </View>)}
          
         </Swiper>
 
          
 </Shimmer>:null}  
              
             
              
               </CardItem> 
               <CardItem style={{ height: 45,
                  borderBottomWidth: 0,borderColor:'transparent' ,borderTopWidth:0}}>
              {!this.state.isVisible2?<Shimmer autoRun={true} visible={this.state.isVisible} ></Shimmer>:     <Left>
 
                 <TouchableOpacity style={{ paddingLeft: 0, maxHeight: 28, justifyContent: 'flex-start', alignContent: 'flex-start' }}  onPress={() => this.onLikePost({index,item})}>
 
 <Image source={require('../../img/common/like.png')} style={{ maxHeight: 25, maxWidth: 23,resizeMode:'cover' }} />
 </TouchableOpacity>
 
 <TouchableOpacity onPress={() => this.GettingLikes(item)}>
 <Text style={{ fontFamily: 'Roboto-Light', fontSize: 12, fontWeight: 'bold' ,paddingTop:2,paddingHorizontal:2}} >Likes- {item.countLike} </Text>
 </TouchableOpacity>
 
 <Button transparent style={{ paddingLeft: 0, justifyContent: 'flex-start', alignContent: 'flex-start' }} onPress={() => { this.FetchComments(item) }}>
 <Image source={require('../../img/common/comment.png')} style={{ maxHeight: 23, maxWidth: 23,resizeMode:'cover' }} />
 <Text style={{ fontFamily: 'Roboto-Light', fontSize: 12, fontWeight: 'bold',paddingTop:2,paddingHorizontal:2 }}>Comments- <Text style={{ fontFamily: 'Roboto-Light', fontSize: 12, fontWeight: 'bold',  }}>{item.countComment} </Text></Text>
 
 </Button>
 
                 </Left>
           }
 
               </CardItem>
             </Card> : <Card  noShadow={true} style={{
               elevation: 0,
               shadowOpacity: 0, borderColor: 'transparent', borderBottomWidth: 0,borderTopWidth:0
             }}>
                 <CardItem style={{
             
                 maxHeight: 60, borderColor: 'transparent',borderBottomWidth:0,borderTopWidth:0
               }}>
 
                 <Left>
                 <Shimmer autoRun={true} style={{width:50,height:50,borderRadius:50}} visible={this.state.isVisible2}>
                 <TouchableOpacity  onPress={() => navigate('BusinessView',{user_id:item.user_id})}>
                   <Thumbnail source={ item.pic?{ uri: "https://www.markupdesigns.org/paypa/" + item.pic}:require('../../img/common/profile.png')}  />
                  </TouchableOpacity>
                   </Shimmer>
                   <Body >
                   <Shimmer autoRun={true} visible={this.state.isVisible2}>
                     <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 15,fontWeight:'bold' }}>{item.name}</Text>
                     <Text note style={{ fontFamily: 'Roboto-Light', fontSize: 11 }}>{moment(item.is_created).fromNow()}</Text>
                  </Shimmer>
                   </Body>
                 </Left>
                 <Right>
              
             
                    </Right>
               </CardItem>
               <CardItem style={{  elevation: 0,
           shadowOpacity: 0,
           borderBottomWidth: 0, }}>
                 <Body style={{ borderColor:'',borderBottomWidth:0,borderTopWidth:0}}>
                 <Shimmer autoRun={true} visible={this.state.isVisible2}>
                   <Text>
                     {item.message}
                   </Text>
                   </Shimmer>
                 </Body>
               </CardItem>
               <CardItem cardBody >
             {item.files?
             <Shimmer autoRun={true} style ={{height:250,flex:1}} visible={this.state.isVisible2}>
             {/* <View style={[styles.paginationStyle,]}>
               <Text style={{ color: 'grey' }}>
                 <Text style={styles.paginationText}>15</Text>/5
               </Text>
             </View> */}
                <Swiper
           style={styles.wrapper}
           renderPagination={this.renderPagination}
           loop={false}
           height={280}
           loop
         >
          { item.files.split(",").map((item, i) =><View style={styles.slide} title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
             <Image style={styles.image} source={{uri: "https://www.markupdesigns.org/paypa/" + item}} />
             
           </View>)}
          
         </Swiper>
 
          
 </Shimmer>:null}  
              
             
              
               </CardItem>         
 
               <CardItem  style={{ height: 45, 
                 borderColor: 'transparent' , elevation: 0,
                 shadowOpacity: 0,
                 borderBottomWidth: 0, }}>
                  {!this.state.isVisible2?<Shimmer autoRun={true} visible={this.state.isVisible} ></Shimmer>:  <Left>
 
                   <TouchableOpacity style={{ paddingLeft: 0, maxHeight: 28, justifyContent: 'flex-start', alignContent: 'flex-start' }}  onPress={() => this.onLikePost({index,item})}>
 
                     <Image source={require('../../img/common/liked_new.png')} style={{ maxHeight: 25, maxWidth: 23,resizeMode:'cover' }} />
                   </TouchableOpacity>
 
                   <TouchableOpacity onPress={() => this.GettingLikes(item)}>
                     <Text style={{ fontFamily: 'Roboto-Light', fontSize: 12, fontWeight: 'bold' ,paddingTop:2,paddingHorizontal:2}} >Likes- {item.countLike} </Text>
                   </TouchableOpacity>
 
                   <Button transparent style={{ paddingLeft: 0, justifyContent: 'flex-start', alignContent: 'flex-start' }} onPress={() => { this.FetchComments(item) }}>
                     <Image source={require('../../img/common/comment.png')} style={{ maxHeight: 23, maxWidth: 23,resizeMode:'cover' }} />
                     <Text style={{ fontFamily: 'Roboto-Light', fontSize: 12, fontWeight: 'bold',paddingTop:2,paddingHorizontal:2 }}>Comments- <Text style={{ fontFamily: 'Roboto-Light', fontSize: 12, fontWeight: 'bold',  }}>{item.countComment} </Text></Text>
                     
                   </Button>
                 </Left>
 
               }
               </CardItem>
               </Card>
           )}
 
           keyExtractor={(item, index) => index.toString()}
           style={{  padding: 0 }}
         />
          }
       

      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  
  },
 
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
  imagew: {
    width: 50,
    height: 50,
    borderRadius:5
  },
  paginationStyle: {
    alignContent:'flex-end',
    alignSelf:'flex-end',
   backgroundColor:'#424241',
   paddingHorizontal:5,
   borderRadius:10,
    position: 'absolute',
    margin: 10
  },
  paginationText: {
    color: 'white',
    fontSize: 14,
    textAlign:'right',
  },
  
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    width,
    resizeMode:'cover',
    height:280,
    
  },

});
