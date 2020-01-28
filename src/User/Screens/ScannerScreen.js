const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
 
import React from 'react';
import {View,
  AppRegistry,
  StyleSheet,
 StatusBar,
  TouchableOpacity,BackHandler,Dimensions,FlatList,ImageBackground,
  Linking,TouchableWithoutFeedback
} from 'react-native';
 
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Header,Body,Title, Content,CheckBox,Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import { NavigationActions, StackActions,withNavigationFocus } from 'react-navigation';
const myitems = [{"key": "r", "image": require("../../img/user/sample1.jpg")},
   {"key": "b", "image": require("../../img/user/sample2.jpg")},
   {"key": "j", "image": require("../../img/user/sample3.jpg")},
   {"key": "h", "image": require("../../img/user/sample3.jpg")},
   {"key": "k", "image": require("../../img/user/sample1.jpg")}
 ];
 class ScannerScreen extends React.Component {


    constructor(props){

        super(props);
   
    this.state ={

result:"",
ScanResult:false,
scan:false
    }
}

onSuccess = (e) => {
//  let mydata= e.data
//   this.setState({
//     result: mydata,
    
// })

this.props.navigation.navigate('pay',{


  id:e.data
})
    // const check = e.data.substring(0, 4);
    
    // this.setState({
    //     result: e,
    //     scan: false,
    //     ScanResult: true
    // })
    // if (check === 'http') {
    //     Linking
    //         .openURL(e.data)
    //         .catch(err => console.error('An error occured', err));


    // } else {
        
    

}
scanAgain = () => {
    this.setState({
        scan: true,
        ScanResult: false
    })

}
  render() {
  
    return (
        <Container style = {{flex:1,backgroundColor:'#e8edf1'}}>
        <Header  style={{backgroundColor:'#1c4478'}}>
            <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
              <Left>
              <Icon name='md-arrow-back'  style={{color:'white',fontSize:25}}/>
              </Left>
              <Body  >
              <Title >Scan & Pay</Title>
              </Body>
             
            </Header>
     <Content >
    
    
                      {this.props.isFocused?

<QRCodeScanner

markerStyle = {styles.markStyle}
                            reactivate={true}
                            showMarker={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                            topContent={ <View>
                                   
                                    
                              <Text style={{color:'white',fontSize:18,fontFamily:'Roboto-Medium',padding:10}}>Scan PayPa QR Code</Text>
               
                         
                      </View> }
                            bottomContent={
                                <View>
                                   
                                    
                                        <Text style={{color:'white',fontSize:18,fontFamily:'Roboto-Medium',padding:10}}>Scan PayPa QR Code</Text>
                         
                                   
                                </View>

                            }
                        />

                      :null}  
                    
                     
<View style = {{paddingTop:20}}>
<Text style={{fontSize:18,fontFamily:'Roboto-Medium',padding:10}}>Recent Payments</Text>
<FlatList
          data={myitems}
          
          renderItem={({ item,index }) => (
            <View style={{  flex:1,padding:10}}>
             
               {/* <Image name="md-close" source={require('../../img/logo/logo.png')} style={{ height:40, width:40, backgroundColor:'#FF0000'}} onPress={()=>{this.deleteItem(index)}}/> */}
              {/* <ImageBackground style={styles.imageThumbnail} source={{ uri: item.path }} /> */}
              <Thumbnail large source={item.image} />

             
            </View>
          )}
          //Setting the number of column
          numColumns={4}
          extraData={this.state.images}
          keyExtractor={(item, index) => index.toString()}
        />
</View>

    </Content>
    {/* <Footer style = {{color:'#dce0e6',
      backgroundColor:'#e46c0b'}}>
    <TouchableWithoutFeedback onPress= {this.onScan}>
                <Text style = {{color:'white',fontFamily:'Roborto ',fontSize:18,fontWeight:'800',padding:15}}>PAY NOW</Text>
                </TouchableWithoutFeedback>
              </Footer> */}
     </Container>
    );
  }
}
 
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
    backgroundColor:'#e46c0b'
  },
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
 markStyle:{

  borderColor:'#1c4478',
  borderWidth:2

 }
});
 
export default withNavigationFocus(ScannerScreen)