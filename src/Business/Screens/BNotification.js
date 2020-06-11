import React from 'react';
import {
  FlatList,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  StatusBar, Image,
  ActivityIndicator,Alert
} from 'react-native';


import QRCode from 'react-native-qrcode-svg';
import { Container, Radio, Right, Text, Left, Input, ListItem, List, Thumbnail, Footer, Header, Body, Title, Content, CheckBox } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { pushNotifications } from '../../Common/Service/index';
import {checkSession} from '../../Common/Screens/LoginScreen'
import { NavigationActions, StackActions, withNavigationFocus,NavigationEvents } from 'react-navigation';
import Shimmer from '../../Common/Service/Shimmer';

 class BNotification extends React.Component {

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-notifications-outline" style={{ color: tintColor, fontSize: 30 }} />
    )
  }
  constructor(props) {
      super(props);
      this.state = {
      loading: false, dataNotifcation: [], uid: '',
      isVisible: true,
      msg: '', reachEnd: false, page: '1',
      refreshing: false,
      session_id:'',
     
    }
  }

  componentDidMount = async () => {
   const value = await AsyncStorage.getItem('uid')
    const session_id = await AsyncStorage.getItem('session_id')
    console.warn("sess"+session_id)
    this.navListener = this.props.navigation.addListener('didFocus',(value)=>{
      this.FetchNotification()
    
     } )
    this.setState({session_id:session_id})
    this.setState({ uid: value, isVisible: false }, () => this.FetchNotification())
  }
   FetchNotification = async () => {
 checkSession(this.state.session_id).then(result=>{
  if(result){
    
    this.setState({ msg: ''})
    let formdata = new FormData();
    const { page } = this.state;
    formdata.append("user_id", this.state.uid);
    formdata.append("page", page);
    formdata.append("session_id", this.state.session_id);
     fetch('https://www.markupdesigns.org/paypa/api/timelineNotification', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata
    }).then((response) => response.json())
      .then((responseJson) => {
        
        if (responseJson.status === "Failure") {
          this.setState({ msg: responseJson.message, mainLoader: false, refreshing: false, reachEnd: false })
        }
        else {
          let dataComment = responseJson['data'];
          this.setState({ mainLoader: false, dataNotifcation: dataComment, refreshing: false, reachEnd: false })
          setTimeout(() => {
            this.setState({
              isVisible: true
            });
          }, 1000);
        }
      
      }
      
    ).catch((error) => {
        console.error(error);
      });
    }
    else{

      Alert.alert(
        //title
        'Oops!',
        //body
        'Your session has been expire login again',
        [
          { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
          
        ],
        { cancelable: false }
        
      )

    }

 })

  }
  openNotifcation = async (data) => {
    if (data.view === '0') {
      this.setState({ mainLoader: true, msg: '' })
      let formdata = new FormData();
      formdata.append("user_id", this.state.uid);
      formdata.append("notification_id", data.id);
      formdata.append("session_id", this.state.session_id);
      formdata.append("type", 1);
      await fetch('https://www.markupdesigns.org/paypa/api/updateViewNotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata
      }).then((response) => response.json())
        .then((responseJson) => {
          
          if (responseJson.status === "Failure") {
            this.setState({ msg: responseJson.message, mainLoader: false, })
          }
          else {
            this.FetchNotification()
            this.props.navigation.navigate('PostView', {
              rid: data.ref_id
            })
          }
        }).catch((error) => {
          console.error(error);
        });
    }
    else
      this.props.navigation.navigate('PostView', {
        rid: data.ref_id
      })
  }
    handleRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.FetchNotification();
    })
  }
  handleLoadMore = () => {
    console.log('hande')
    this.setState({
      result: this.state.page + 1, reachEnd: true,
    }, () => {
      this.FetchNotification();
    })
  }
  render() {
    return (
      <Container >
         
        <Header style={{ backgroundColor: '#1c4478' }}>
          <StatusBar barStyle="light-content" backgroundColor="#1c4478" />
          <TouchableOpacity onPress = {this.FetchNotification} style={{alignItems:'center',justifyContent:'center'}}>
          <Text style={{ alignSelf: 'center', color: 'white', fontSize: 18, fontFamily: 'Roboto-Medium',textAlign:'center',justifyContent:'center' }}>Notifications </Text>
          </TouchableOpacity>
          
        </Header>
        <Content>
          {this.state.msg ? <Text style={{ fontSize: 15, fontWeight: 'bold', alignItems: 'center', textAlign: 'center', padding: 30 }}>{this.state.msg}</Text> : null}
          <FlatList
            data={this.state.dataNotifcation}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            initialNumToRender={50}
            maxToRenderPerBatch={50}
            onEndReached={this.handleLoadMore}
            extraData={this.state}
            style={{ margin: 2 }}
            renderItem={({ item, index }) => (
              item.view === '0' ? <List >
                <ListItem avatar style={{ marginLeft: 0, borderBottomColor: 'transparent', borderBottomWidth: 0, backgroundColor: '#e1eafa' }}>
                  <Left>
                    <Shimmer autoRun={true} style={styles.imagew} visible={this.state.isVisible}>
                      <Thumbnail small source={item.pic ? { uri: "https://www.markupdesigns.org/paypa/" + item.pic } : require('../../img/common/profile.png')} style={styles.imagew} />
                    </Shimmer>
                  </Left>

                  <Body style={{ borderBottomWidth: 0 }}>
                    <Shimmer autoRun={true} visible={this.state.isVisible} >
                      <TouchableOpacity onPress={() => this.openNotifcation(item)}>
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                      <View style={{ flexDirection: 'row' }}>
                        {item.type === "like" ? <Text note>Like</Text> : <Text note>Comment</Text>}
                        <Text note style={{ color: '#0e58cf', fontSize: 12 }}>{moment(item.is_created).fromNow()}</Text>
                      </View>
                    </Shimmer>
                  </Body>

                  <Right style={{ borderBottomWidth: 0 }}>
                    <Shimmer autoRun={true} visible={this.state.isVisible} style={{ maxWidth: 50 }}>
                      <Image source={item.type === "like" ? require('../../img/common/like.png') : require('../../img/common/comment.png')} style={{ maxWidth: 30, maxHeight: 25, resizeMode: 'contain', }} />
                      {/* <Icon name={item.type ==="like"?"md-thumbs-up":"md-chatbubbles"} style={{ color: '#0e58cf' ,fontSize:25,paddingHorizontal:2}} /> */}
                    </Shimmer>
                  </Right>
                </ListItem>

              </List>
                :
                <List>
                 <ListItem avatar style={{ marginLeft: 0, marginTop: 0 }}>
                    <Left>
                      <Shimmer autoRun={true} style={styles.imagew} visible={this.state.isVisible}>
                        <Thumbnail small source={item.pic ? { uri: "https://www.markupdesigns.org/paypa/" + item.pic } : require('../../img/common/profile.png')} style={styles.imagew} />
                      </Shimmer>
                    </Left>
                    <Body style={{ borderBottomWidth: 0 }}>
                      <Shimmer autoRun={true} visible={this.state.isVisible}>
                        <TouchableOpacity onPress={() => this.openNotifcation(item)}>
                          <Text>{item.name}</Text>
                        </TouchableOpacity>
                      </Shimmer>
                      <Shimmer autoRun={true} visible={this.state.isVisible}>
                        <View style={{ flexDirection: 'row' }}>
                          {item.type === "like" ? <Text note>Liked</Text> : <Text note>Commented</Text>}
                          <Text note style={{ color: '#0e58cf', fontSize: 12 }}>{moment(item.is_created).fromNow()}</Text>
                        </View>
                      </Shimmer>
                   </Body>
                    <Right style={{ borderBottomWidth: 0 }}>
                      <Shimmer autoRun={true} visible={this.state.isVisible} style={{ maxWidth: 50 }}>
                        <Image source={item.type === "like" ? require('../../img/common/like.png') : require('../../img/common/comment.png')} style={{ maxWidth: 30, maxHeight: 25, resizeMode: 'contain' }} />
                      </Shimmer>
                    </Right>
                  </ListItem>
                </List>

            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </Content>
      </Container>

    );
  };
}
const styles = StyleSheet.create({

  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    fontSize: 18,
  },
  InputItem: {

    backgroundColor: 'white',
    width: '90%',
    borderColor: 'white',
    alignSelf: 'center',
    borderRadius: 8
  },
  imageContent: {
    flexDirection: 'row',
    margin: 16
  },
  movieContent: {
    margin: 8,
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  imagew: {
    width: 40,
    height: 40, borderRadius: 40 / 2

  },
  mcontent: {
    marginTop: 8,
    marginBottom: 8
  }
});


export default withNavigationFocus(BNotification)