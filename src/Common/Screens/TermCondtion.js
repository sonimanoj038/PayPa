/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity, BackHandler,
  StatusBar,Modal,
  TouchableWithoutFeedback,ActivityIndicator,Dimensions
} from 'react-native';


import { Container, Radio,Right,Text, Left,Input,Item ,Button, Textarea ,Header,Body,Title, Content,CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
const width = Dimensions.get('window').width;
const height=  Dimensions.get('window').height;

export default class TermCondition extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { visible: true,canGoBack:false };
      }
      componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      }
    
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }
    
      handleBackButton = ()=>{
    
      this.webView.goBack();
           return true;
       
    }
    onNavigationStateChange(navState) {
      this.setState({
        canGoBack: navState.canGoBack
      });
    }
    
      hideSpinner() {
        this.setState({ visible: false });
      }
    
    
    render(){
  return (
   
 <Container style = {{backgroundColor:'#e8edf1',width:'100%',flex:1}}>
    <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
          <Left style ={{flex:1}}>
          <Icon name='md-arrow-back'  style={{color:'white',fontSize:25,}} onPress = {()=>  this.props.navigation.goBack()}/>
          </Left>
          <Body style ={{flex:1,alignItems:'center'}} >
          <Title >Term & Condition</Title>
          </Body>
         <Right style ={{flex:1}}></Right>
        </Header>
 
 <WebView
 javaScriptEnabled={true}
       
       onLoad={() => this.hideSpinner()}
       injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
       scalesPageToFit={false}
       onNavigationStateChange={this.onNavigationStateChange.bind(this)}
       ref={(webView) => { this.webView = webView }}
       useWebKit={true}
      source={{ uri: 'https://www.markupdesigns.org/paypa/terms-conditions' }}
      style={{ height: height, width, resizeMode: 'cover', flex: 1 }}
    />
    {this.state.visible && (
         <View style={{ position: 'absolute',
         left: 0,
         right: 0,
         top: 0,
         bottom: 0,
         alignItems: 'center',
         justifyContent: 'center'}}>
         <ActivityIndicator
                      
                      color = '#1c4478'
                      size={"large"}
                      
                     />
                     </View>
        )}

</Container>

  );
};
}
const styles = StyleSheet.create({
 
  body: {
    flex:1,
   
  },
 InputItem:{

  backgroundColor:'white',
  width:'100%',
  borderColor:'white',
alignSelf:'center',
borderRadius:8
 },
 Alert_Main_View:{
 
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor : "white",
   
  height: 200 ,
  width: '70%',

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
   
    textAlign: 'center',
    padding: 10,
   
    fontFamily:'Roboto-Light'
  },
 
buttonStyleFull: {
    
  width:'100%',
  backgroundColor:'#1c4478',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
 margin:3,
 
 
  borderRadius:7,
},
buttonStyle: {
    
  width:'48%',
  backgroundColor:'#1c4478',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
 margin:3,
 
 
  borderRadius:7,
},
   
TextStyle:{
    color:'white',
    textAlign:'center',
    fontSize: 16,
    marginTop: -5, fontFamily:'Roboto-Medium'
    
},
});


