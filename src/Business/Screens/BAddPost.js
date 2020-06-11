// @ts-nocheck
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  StatusBar, Image,
  TouchableWithoutFeedback,
  Alert, FlatList, BackHandler, ImageBackground, ActivityIndicator, ProgressBarAndroid, Modal
} from 'react-native';
import { StackActions, NavigationActions, withNavigationFocus } from 'react-navigation';
import ImagePicker from 'react-native-image-crop-picker';
import { Container, Radio, Right, Text, Left, Input, Item,Textarea, Button, ActionSheet, Footer, Header, Body, Title, Content, CheckBox, ListItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {checkSession} from '../../Common/Screens/LoginScreen'
import AsyncStorage from '@react-native-community/async-storage';
import { toastr } from '../../Common/Screens/LoginScreen'


class AddPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      message: "",
      progress: null,
      images: [],
      imagesUpload: [],
      userid: '',
      progress_Visibility: false,
      session_id:''
    }
  }


  validateInput = () => {
    const { message } = this.state;
    const { images } = this.state
    if (message === "") {
      toastr.showToast("Write Your Post")
      return false
    }
    if (images.length < 1) {
      toastr.showToast("Attach at least one image")
      return false
    }
    else
      this.setState({ progress_Visibility: true })
    return true;
  }

  componentDidMount = async () => {
    const value = await AsyncStorage.getItem('uid')
    const session_id = await AsyncStorage.getItem('session_id')
    this.setState({session_id:session_id})
    this.setState({ userid: value })
  }

  getImage = () => {
    ImagePicker.openPicker({
      multiple: true,
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
       mediaType:'photo'
    }).then(image => {
      let oldimg = this.state.images.length
      let newimg = image.length
      let finalLength = oldimg + newimg
      console.warn(image.length)
      if (finalLength > 5) {
        alert("Only a maximum of 5 images are allowed")
        return false
      } else
        console.log(JSON.stringify(image))
      for (var i = 0; i < image.length; i++) {
        this.state.imagesUpload.push(image[i].path)
      }
      this.setState({ images: [...this.state.images, ...image] })
    })
  }

  deleteItem = (e) => {
    var array = [...this.state.images]; // make a separate copy of the array
    var index = e
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({
        images: array
      });
    }
  }

  upload = () => {
    
    const { message } = this.state;
    const { progress } = this.state
    const { userid } = this.state
    let formdata = new FormData();
    formdata.append("uid", userid);
    formdata.append("message", message);
    formdata.append("session_id",this.state.session_id);
    this.state.images.forEach((element, i) => {
      const newFile = {
        uri: element.path, type: element.mime,
        name: element.mime.split("/")[1] === 'png' ? 'images.png' : 'images.jpg'
      }
      formdata.append('file[]', newFile)
      console.log(newFile.name)
    });
    var xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.upload.onprogress = (e) => {
        var progress = Math.ceil((e.loaded / e.total) * 100);
        this.setState({ progress })
      }
      xhr.onreadystatechange = function (e) {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          let data = JSON.parse(xhr.responseText);
          resolve(data)
        }
      }
      xhr.open('POST', 'https://www.markupdesigns.org/paypa/api/addTimeline', true);
      xhr.setRequestHeader('Content-Type', 'multipart/form-data');
      xhr.send(formdata)
    })
  }
  submitData = async () => {
    checkSession(this.state.session_id).then(result=>{

      if(result){
        if (this.validateInput()) {
           this.upload().then((res) => {
            this.setState({ message: "" })
            console.warn(res)
            this.setState({ data: res, progress_Visibility: false, images: [], message: "" })
          }).catch((error) => {
            console.log(error);
          })
          this.props.navigation.navigate('Home');
        }

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
  render() {
    return (
      <Container style={{ backgroundColor: '#e8edf1' }} >
        <Header style={{ backgroundColor: '#1c4478' }}>
          <StatusBar barStyle="light-content" backgroundColor="#1c4478" />
          <Text style={{ alignSelf: 'center', color: 'white', fontSize: 18, fontFamily: 'Roboto-Medium' }}>Create Post </Text>
        </Header>
        <Text>
          <Text></Text>
        </Text>
        <ScrollView>
          <Modal
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            visible={this.state.progress_Visibility}
            transparent={true}
            animationType={"fade"}
            onRequestClose={() => this.setState({ Alert_Visibility: !this.state.Alert_Visibility })} >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0.2, 0.7)' }}>
              {this.state.progress != 100 ?
                <View style={{ height: '10%', width: '70%' }}>
                  <Text style={styles.TextStyle}> Uploading... </Text>
                  <ProgressBarAndroid
                    animating={true}
                    style={[{ scaleX: 1.0 }, { scaleY: 2.5 }]}
                    styleAttr="Horizontal"
                    color="white"
                    indeterminate={false}
                    progress={this.state.progress / 100}
                  />
                </View> : <View style={{ height: '10%', width: '70%' }}>
                  <Text style={styles.TextStyle}> Posting... </Text>
                  <ProgressBarAndroid
                    animating={true}
                    style={[{ scaleX: 1.0 }, { scaleY: 2.5 }]}
                    styleAttr="Horizontal"
                    color="white"
                    indeterminate={true}
                  />
                </View>}
            </View>
          </Modal>

          <Content style={{ paddingHorizontal: 10 }}>
            <Item regular style = {{borderWidth:0}}>
              <Textarea
                value={this.state.message}
                placeholder='Write something here..' style={{ backgroundColor: 'white' ,width:'100%',borderColor:'transparent'}}
                onChangeText={(message) => this.setState({ message })}
                selectTextOnFocus={true}
                maxLength={150}
               
                 rowSpan={5} 
              />
            </Item>
             <TouchableOpacity style={{ backgroundColor: 'grey', padding: 9 ,alignItems:'center',margin:5}} onPress={this.getImage}>
                <Icon name="md-camera" style={{ color: 'white', fontSize: 30, }} />
              </TouchableOpacity>
            <Text></Text>
            <FlatList
              data={this.state.images}
              renderItem={({ item, index }) => (
                <View style={{ flex: 1, padding: 1 }}>
                  <ImageBackground style={styles.imageThumbnail} source={{ uri: item.path }} >
                    <TouchableOpacity onPress={() => { this.deleteItem(index) }} style={{ backgroundColor: 'white', borderRadius: 50, width: 18, height: 18, alignContent: 'flex-end', alignItems: 'flex-end' }}>
                      <Icon name="md-close" style={{ fontSize: 15, color: 'black', borderRadius: 20, paddingHorizontal: 5 }} />
                    </TouchableOpacity>
                  </ImageBackground>
                  <Text>
                  </Text>
                </View>
              )}
              numColumns={2}
              extraData={this.state.images}
              keyExtractor={(item, index) => index.toString()}
            />
          </Content>
        </ScrollView>

        <Footer style={{
          // @ts-ignore
          color: '#dce0e6',
          backgroundColor: '#e46c0b'
        }}>
          <Text></Text>
          <Text></Text>
          <TouchableWithoutFeedback onPress={this.submitData}>
            {this.state.loading ? <ActivityIndicator
              animating={this.state.loading}
              color='white'
              size={"large"}
              style={{ paddingHorizontal: 50, alignItems: 'center', width: '100%' }}
            /> : <Text style={{ color: 'white', fontFamily: 'Roborto ', fontSize: 18, fontWeight: '800', padding: 15 }}>SUBMIT NOW</Text>}
          </TouchableWithoutFeedback>
        </Footer>
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
  imageThumbnail: {
    flex: 1,
    height: 180,
  },
  TextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 23,
    marginTop: -5, fontFamily: 'Roboto-Medium'

  }
});

export default withNavigationFocus(AddPost)
