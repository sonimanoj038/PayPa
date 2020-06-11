import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  StatusBar, Image,
  TouchableWithoutFeedback, BackHandler, ActivityIndicator, FlatList, DatePickerAndroid, Modal, TouchableHighlight
} from 'react-native';

import Moment from 'moment';
import QRCode from 'react-native-qrcode-svg';
import { Container, Radio, Right, Text, Left, Input, Item, Button, Footer, Header, Body, Title, Thumbnail, Content, CheckBox, ListItem, List } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {checkSession} from '../../Common/Screens/LoginScreen'
import { NavigationActions, StackActions, withNavigationFocus,NavigationEvents } from 'react-navigation';
import Shimmer from '../../Common/Service/Shimmer';

export default class BPassbook extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-wallet" style={{ color: tintColor, fontSize: 30 }} />
    )
  }
  constructor(props) {
    super(props);
    this.state = {
      term: false,
      payments: [], loading: true,
      myBalance: '0',
      reachEnd: false, page: '1',
      refreshing: false,
      isVisible: true,
      msg: '',
      startDate: '', endDate: '',
      staff: [],
      selectedLists: [],
      isChecked: [],
      isFilter: false,
      isFilterDate: false,
      status: '',
      type: '',
      session_id: ''
    }
  }


  isIconCheckedOrNot = (item, index) => {
    console.warn(item)
    let { isChecked, selectedLists } = this.state;
    isChecked[index] = !isChecked[index];
    this.setState({ isChecked: isChecked });
    if (isChecked[index] == true) {
      selectedLists.push(item.id)
    } else {
      selectedLists.pop(item.id)
    }
  }

  getFilterData = async () => {
    this.setState({ isFilter: false })
    const { uid } = this.state;
    const { page } = this.state;
    const { selectedLists } = this.state;
    let formdata = new FormData();
    formdata.append("uid", uid);
    formdata.append("page", page);
    formdata.append("staff_id", selectedLists.toString());
    formdata.append("session_id", this.state.session_id);
    await fetch('https://www.markupdesigns.org/paypa/api/paymentHistory', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ loading: false, refreshing: false })
        console.log("his " + JSON.stringify(responseJson))
        if (responseJson.status === "Failure") {
          alert(responseJson.msg)
        }
        else {
          let Rdata = responseJson['data']
          console.log(JSON.stringify(Rdata))
          this.setState({ loading: false, payments: Rdata, reachEnd: false, msg: responseJson.msg })
        }
      }).catch((error) => {
        console.error(error);
      });
  }
  componentDidMount = async () => {
    const value = await AsyncStorage.getItem('uid')
    const type = await AsyncStorage.getItem('type')
    const session_id = await AsyncStorage.getItem('session_id')
    this.navListener = this.props.navigation.addListener('didFocus',(value)=>{
      this.PaymentHistory()
     this.GetBalance()
     } )
    this.setState({ uid: value, isVisible: false, type: type, session_id: session_id }, () => this.PaymentHistory())
    console.warn("userid", value)
    await this.GetStatus()
    await this.GetBalance();
    await this.getStaff()

  }

  PaymentHistory = async () => {

    checkSession(this.state.session_id).then(result=>{

      if(result){
        this.setState({ loadiing: true })
        const { uid } = this.state;
        const { page } = this.state;
        let formdata = new FormData();
        formdata.append("uid",uid);
        formdata.append("page", page);
        formdata.append("session_id", this.state.session_id);
         fetch('https://www.markupdesigns.org/paypa/api/paymentHistory', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formdata
    
        }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({ loading: false, refreshing: false })
            console.log("his " + JSON.stringify(responseJson))
            if (responseJson.status === "Failure") {
              alert(responseJson.msg)
            }
            else {
              let Rdata = responseJson['data']
              console.log(JSON.stringify(Rdata))
              this.setState({ loading: false, payments: Rdata, reachEnd: false, msg: responseJson.msg, isFilter: false })
            }
          }).catch((error) => {
            console.error(error);
          });
    

      }else{
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

  GetBalance = async () => {
    const { uid } = this.state;
    let formdata = new FormData();
    formdata.append("uid", uid);
    formdata.append("session_id", this.state.session_id);
    await fetch('https://www.markupdesigns.org/paypa/api/myBalance', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata

    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ loading: false })
        console.log("bal " + JSON.stringify(responseJson))
        if (responseJson.status === "Failure") {
          alert(responseJson.msg)
        }
        else {
          let bal = responseJson.paypamoney;
          this.setState({ loading: false, myBalance: bal, isVisible: true, })
        }
      }).catch((error) => {
        console.error(error);
      });
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#d9dbda",
        }}
      />
    );
  }
  handleRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.PaymentHistory();
      this.GetBalance()
    })
  }
  handleLoadMore = () => {
    this.setState({
      result: this.state.page + 1, reachEnd: true,
    }, () => {
      this.PaymentHistory();
    })
  }

  
  startDate = async () => {
    try {
      await DatePickerAndroid.open({
        date: new Date(),
        minDate: new Date(2019, 4, 25),
      }).then((date) => {
        if (date.action !== DatePickerAndroid.dismissedAction) {
          // let date =  `${year}-${month + 1}-${day}`;
          let final = Moment(date).format("YYYY-MM-DD")
          this.setState({ startDate: final });
          // this.searchFilterFunction(final)
        }
      });

    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message)
    }
  };
  endDate = async () => {
    try {
      await DatePickerAndroid.open({
        date: new Date(),
        minDate: new Date(2019, 4, 25),
      }).then((date) => {
        if (date.action !== DatePickerAndroid.dismissedAction) {
          // let date =  `${year}-${month + 1}-${day}`;
          let final = Moment(date).format("YYYY-MM-DD")
          this.setState({ endDate: final });
          // this.searchFilterFunction(final)
        }
      })
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message)
    }
  };


  searchFilterFunction = async () => {
    this.setState({ loadiing: true })
    if (this.state.startDate === "") {
      alert("Enter start date")
      return false
    }
    else if (this.state.endDate === "") {
      alert("Enter end date")
      return false
    }
    else {

      this.setState({ isFilterDate: false })
      const { uid } = this.state;
      const { startDate } = this.state;
      const { endDate } = this.state;
      const { page } = this.state;
      let formdata = new FormData();
      formdata.append("uid", uid);
      formdata.append("page", page);
      formdata.append("startdate", startDate);
      formdata.append("enddate", endDate);
      formdata.append("session_id", this.state.session_id);
      await fetch('https://www.markupdesigns.org/paypa/api/paymentHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata


      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({ loading: false, refreshing: false })
          console.log("filterdata " + JSON.stringify(responseJson))
          if (responseJson.status === "Failure") {
            this.setState({ msg: responseJson.msg })
          }
          else {
            let Rdata = responseJson['data']
            console.log(JSON.stringify(Rdata))
            this.setState({ loading: false, payments: Rdata, isVisible: true, reachEnd: false })
          }
        }).catch((error) => {
          console.error(error);
        });
    }
  }
  GetStatus = async () => {
    this.setState({ loadiing: true })
    const { uid } = this.state;
    const { type } = this.state;
    let formdata = new FormData();
    formdata.append("uid", uid);
    formdata.append("type", type);
    formdata.append("session_id", this.state.session_id);
    await fetch('https://www.markupdesigns.org/paypa/api/checkUserStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata

    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ loading: false })
        console.log("bal " + JSON.stringify(responseJson))

        this.setState({ status: responseJson.msg })

      }).catch((error) => {
        console.error(error);
      });
  }

  getStaff = async () => {
    const { uid } = this.state;
    let formdata = new FormData();
    formdata.append("bid", uid);
    formdata.append("session_id", this.state.session_id);
    await fetch('https://www.markupdesigns.org/paypa/api/staffList', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ loading: false, refreshing: false })
        console.log("his " + JSON.stringify(responseJson))
        if (responseJson.status === "Failure") {
          console.log(responseJson.msg)
        }
        else {
          let Rdata = responseJson['data']['Listing']
          console.log(JSON.stringify(Rdata))
          this.setState({ loading: false, staff: Rdata, reachEnd: false, isVisible: true, })
        }
      }).catch((error) => {
        console.error(error);
      });
  }
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#e8edf1' }}>
         
        <Header style={{ backgroundColor: '#1c4478' }}>
          <StatusBar barStyle="light-content" backgroundColor="#1c4478" />
          <Text style={{ alignSelf: 'center', color: 'white', fontSize: 18, fontWeight: 'bold' }}>Payments Received</Text>
        </Header>
        <Content>
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
              <TouchableHighlight onPress={() => this.setState({ isFilter: false }, () => { this.PaymentHistory() })} style={{ alignItems: 'flex-end' }}>

                <Icon name="md-close" style={{ padding: 5, right: 1.5, fontSize: 30, color: 'black', margin: 10 }} />
              </TouchableHighlight>
              <View style={{
                flex: 1
              }}>
                <List style={{ borderColor: '#e26d0e', borderWidth: 1, backgroundColor: '#f2dece' }}>
                  <ListItem itemDivider style={{ backgroundColor: '#e26d0e', padding: 0 }}>
                    <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Sort By Staff Name</Text>
                  </ListItem>
                </List>
                <FlatList
                  data={this.state.staff}
                  renderItem={({ item, index }) => (
                    <View style={{ flex: 1, padding: 1 }}>
                      <List style={{ borderColor: 'white', borderWidth: 1, backgroundColor: 'white' }}>
                        <ListItem avtar style={{ backgroundColor: 'white', padding: 0 }} >

                          <Left style={{ maxWidth: 60 }}>
                            <Thumbnail source={item.pic ? { uri: "https://www.markupdesigns.org/paypa/" + item.pic } : require('../../img/common/profile.png')} />
                          </Left>
                          <Body>
                            <View style={{ flexDirection: 'row' }}>
                              <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium' }}>{this.Capitalize(item.fname) + " " + this.Capitalize(item.lname)}</Text>
                              <CheckBox color='#e26d0e' style={{ paddingHorizontal: 5 }} checked={this.state.isChecked[index]}
                                onPress={() => this.isIconCheckedOrNot(item, index)} />
                            </View>
                          </Body>
                          <Right>
                          </Right>
                        </ListItem>
                      </List>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
                <Text></Text>

                <Button block style={{ marginHorizontal: 20, backgroundColor: '#e26d0e', }} onPress={this.
                  getFilterData}>
                  <Text>Apply</Text>
                </Button>
                <Text>
                </Text>
              </View>
            </View>
          </Modal>

          <Modal transparent={true}
            visible={this.state.isFilterDate}
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
              <TouchableHighlight onPress={() => this.setState({ isFilterDate: false }, () => { this.PaymentHistory() })} style={{ alignItems: 'flex-end' }}>
                <Icon name="md-close" style={{ padding: 5, right: 1.5, fontSize: 30, color: 'black', margin: 10 }} />
              </TouchableHighlight>
              <View style={{
                flex: 1
              }}>
                <List style={{ borderColor: '#e26d0e', borderWidth: 1, backgroundColor: '#f2dece' }}>
                  <ListItem itemDivider style={{ backgroundColor: '#e26d0e', padding: 0 }}>
                    <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Sort by Date</Text>
                  </ListItem>
                  <ListItem itemDivider style={{ backgroundColor: 'white', padding: 0 }}>
                    <Left>
                      <Text style={{ color: '#e26d0e', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Start Date</Text>
                    </Left>
                    <Body>
                      <TouchableOpacity onPress={this.startDate}>
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', padding: 5, borderColor: 'grey', borderBottomWidth: 1 }}>
                          {this.state.startDate === "" ? null : Moment(this.state.startDate).format("DD-MM-YYYY")}</Text>
                      </TouchableOpacity>
                    </Body>
                  </ListItem>
                  <ListItem itemDivider style={{ backgroundColor: 'white', padding: 0 }}>
                    <Left>
                      <Text style={{ color: '#e26d0e', fontSize: 16, fontFamily: 'Roboto-Medium' }}>End Date</Text>
                    </Left>
                    <Body>
                      <TouchableOpacity onPress={this.endDate}>
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', padding: 5, borderColor: 'grey', borderBottomWidth: 1 }}>

                          {this.state.endDate === "" ? null : Moment(this.state.endDate).format("DD-MM-YYYY")}</Text>
                      </TouchableOpacity>
                    </Body>
                  </ListItem>
                </List>
                <Text></Text>

                <Button block style={{ marginHorizontal: 20, backgroundColor: '#e26d0e', }} onPress={this.searchFilterFunction}>
                  <Text>Apply</Text>
                </Button>
                <Text>
                </Text>
              </View>
            </View>
          </Modal>
          <View style={{ flex: 1, backgroundColor: '#0c3263', height: 150 }}>
            <Icon name="ios-wallet" style={{ color: 'white', fontSize: 45, alignItems: 'center', alignSelf: 'center', paddingTop: 15 }} />
            <Shimmer autoRun={true} visible={this.state.isVisible} style={{ alignSelf: 'center', color: 'grey', fontSize: 20, fontWeight: '600', height: 30 }}>
              <Text style={{ alignSelf: 'center', color: 'white', fontSize: 20, fontWeight: '600' }}>R {this.state.myBalance} </Text>
            </Shimmer>
            <Shimmer autoRun={true} visible={this.state.isVisible} style={{ alignSelf: 'center', color: 'grey', fontSize: 20, fontWeight: '600', height: 30 }}>
              <Text style={{ alignSelf: 'center', color: 'white', fontSize: 20, fontWeight: '600' }}>Status:
<Text style={{ alignSelf: 'center', color: this.state.status === 'Approved' ? 'green' : 'red', fontSize: 20, fontWeight: 'bold', paddingHorizontal: 5 }}>{this.state.status}</Text>  </Text>
            </Shimmer>
          </View>
          <View style={{ backgroundColor: 'white', marginTop: -30, marginHorizontal: 15 }}>
            <View style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ActivityIndicator animating={this.state.loading} color='#1c4478' size={"large"}
              />
            </View>
            <List>
              <ListItem itemHeader first noBorder>
                <Left>
                  <Text>History</Text>
                </Left>
                <Right>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <Text style={{ color: '#e46c0b', paddingHorizontal: 5, paddingVertical: 5, fontWeight: 'bold' }}>FILTER</Text>
                    <TouchableOpacity onPress={() => { this.setState({ isFilterDate: true }) }}>
                      <Icon name="md-calendar" style={{ color: '#1c4478', fontSize: 30, alignItems: 'center', alignSelf: 'center', paddingHorizontal: 2 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.setState({ isFilter: true }) }}>
                      <Icon name="md-person" style={{ color: '#1c4478', fontSize: 30, alignItems: 'center', alignSelf: 'center', paddingHorizontal: 5 }} />
                    </TouchableOpacity>
                  </View>
                </Right>
              </ListItem>
            </List>
            <FlatList
              data={this.state.payments}
              showsVerticalScrollIndicator={false}
              // ItemSeparatorComponent={this.FlatListItemSeparator}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
              // onEndReached={this.handleLoadMore}
              // onEndReachedThreshold={20}
              initialNumToRender={50}
              ListFooterComponent={<ActivityIndicator
                animating={this.state.reachEnd}
                color='#1c4478'
                size={"large"}
              />}
              renderItem={({ item }) =>
                <List>

                  <ListItem noBorder avatar style={{ marginLeft: 5 }} >
                    <Left>
                      <Shimmer autoRun={true} style={styles.imagew} visible={this.state.isVisible}>
                        <Thumbnail source={item.pic ? { uri: "https://www.markupdesigns.org/paypa/" + item.pic } : require('../../img/common/profile.png')} />
                      </Shimmer>
                    </Left>
                    <Body>
                      <Shimmer autoRun={true} visible={this.state.isVisible}>

                        <View style={{ flexDirection: 'column' }}>
                          <Text style={{ fontSize: 15 }}>{item.name}</Text>
                          <Text style={{ fontSize: 12, color: 'grey' }}>{Moment(item.is_created).format('DD-MM-YYYY H:mm')}</Text>
                          {item.staffname === null ? null : <Text style={{ fontSize: 12, color: '#2d2e30', fontWeight: 'bold' }}> Staff: {item.staffname}</Text>}
                          {item.comment === "" ? null : <Text style={{ fontSize: 12, color: 'grey' }}> {item.comment}</Text>}
                        </View>
                      </Shimmer>
                    </Body>
                    <Right style={{ flex: 1, justifyContent: 'center' }}>
                      <Shimmer autoRun={true} visible={this.state.isVisible}>

                        <Text style={{ color: '#1c4478' }}>R{item.amount}</Text>
                        {item.status === '0' ? <Text style={{ color: '#fcca3d', fontSize: 11 }}>Pending</Text> : item.status === '1' ? <Text style={{ color: 'green', fontSize: 11 }}>Accepted</Text> : <Text style={{ color: 'red', fontSize: 11 }}>Rejected</Text>}
                      </Shimmer>
                    </Right>
                  </ListItem>
                </List>
              } />

          </View>
        </Content>
      </Container>
    )
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
  imagew: {
    width: 80,
    height: 80
  },
  mcontent: {
    marginTop: 8,
    marginBottom: 8
  }
});


