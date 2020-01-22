const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
 
import React from 'react';
import {View,
  AppRegistry,
  StyleSheet,
 StatusBar,
  TouchableOpacity,BackHandler,Dimensions,
  Linking,TouchableWithoutFeedback
} from 'react-native';
 
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Header,Body,Title, Content,CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import { NavigationActions, StackActions,withNavigationFocus } from 'react-navigation';

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
                            reactivate={true}
                            showMarker={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                            
                            // bottomContent={
                            //     <View>
                                   
                            //         <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.setState({ scan: false })}>
                            //             <Text style={styles.buttonTextStyle}>Cancel</Text>
                         
                            //         </TouchableOpacity>
                            //     </View>

                            // }
                        />

                      :null}  
                    
                     {this.state.ScanResult &&
                      
                           
                            <View style={this.state.ScanResult ? styles.scanCardView : styles.cardView}>
                                <Text>Type : {this.state.result.type}</Text>
                                <Text>Result : {this.state.result.data}</Text>
                                <Text numberOfLines={1}>RawData: {this.state.result.rawData}</Text>
                                <TouchableOpacity onPress={this.scanAgain} >
                                    <Text>Click to Scan again!</Text>
                                </TouchableOpacity>

                            </View>
                       
                    }
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
 scanCardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white'
},
cardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 2,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white'
},
});
 
export default withNavigationFocus(ScannerScreen)