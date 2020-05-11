import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  StatusBar,Image,
  TouchableWithoutFeedback,toDataURL,Share,ToastAndroid,
} from 'react-native';

import CameraRoll from "@react-native-community/cameraroll";
import QRCode from 'react-native-qrcode-svg';
import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Header,Body,Title, Content,CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import RNFS from "react-native-fs"

export default class QrCodeScreen extends React.Component {


    constructor(props){

        super(props);
   
    this.state ={

uid:'11'
    }
}

componentDidMount = async() => {
  
  const value = await AsyncStorage.getItem('uid')

  this.setState({uid:value})
 console.warn(value)
  //Checking for the permission just after component loaded
  


 }
 shareQR() {
  this.svg.toDataURL((data) => {
    const shareImageBase64 = {
      title: "QR",
      message: "Ehi, this is my QR code",
      url: `data:image/png;base64,${data}`
    };
    Share.open(shareImageBase64);
  });
}
callback(dataURL) {
  console.log(dataURL);
  let shareImageBase64 = {
    title: 'React Native',
    url: `data:image/png,${dataURL}`,
    
  };
  
  Share.share(shareImageBase64).catch(error => console.log(error));
}
saveQRCode = () => {
  this.svg.toDataURL((data) => {

   		RNFS.writeFile(RNFS.DocumentDirectoryPath+"/Qrcode.png", data, 'base64')
   		  .then((success) => {
   			  return CameraRoll.saveToCameraRoll(RNFS.DocumentDirectoryPath +"/Qrcode.png", 'photo')
   		  })
   		  .then(() => {
   			  this.setState({ busy: false, imageSaved: true  })
   			  ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
   		  })
   		  .catch((err) => {
   		    console.warn(err.message);
   		  });

   	})

}
    render(){
  return (
   
 <Container  >
    <Header  style={{backgroundColor:'white'}} noShadow>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
          <Left>
          <Icon name='md-arrow-back'  style={{color:'#1c4478',fontSize:25,paddingLeft:10}} onPress = {()=>  this.props.navigation.goBack()}/>
          </Left>
          <Body>
          <Title >My QR Code</Title>
          </Body>
         <Right>
         <Button transparent onPress = {this.saveQRCode}>
            <Text style = {{color:'#1c4478',fontFamily:'Roboto-Medium',fontWeight:'bold'}}>Save</Text>
          </Button>
         </Right>
        </Header>
 <View style = {styles.body}>
<View style = {styles.qrcode}>

<QRCode
 size = {300}
getRef={(c) => (this.svg = c)}
quietZone ={5}
logoBackgroundColor = 'white'
      logoSize={50}
      value={this.state.uid}
      style ={{justifyContent:'center',alignSelf:'center',padding:20}}
    />

</View>
 

 </View>




 </Container>

  );
};
}
const styles = StyleSheet.create({
 
  body: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  
  
    fontSize:18,
  },
 InputItem:{

  backgroundColor:'white',
  width:'90%',
  borderColor:'white',
alignSelf:'center',
borderRadius:8
 },
 qrcode:{
  borderWidth:1,
  borderColor:'grey',
  padding:15,

 }
});


