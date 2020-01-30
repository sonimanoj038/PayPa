import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  StatusBar,Image,
  TouchableWithoutFeedback
} from 'react-native';


import QRCode from 'react-native-qrcode-svg';
import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Header,Body,Title, Content,CheckBox,ListItem,List} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';



export default class BPassbook extends React.Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-wallet" style={{ color:tintColor,fontSize:30 }} />
        )
    }
    constructor(props){

        super(props);
   
    this.state ={

term:false
    }
}
    render(){
  return (
   
 <Container style ={{backgroundColor:'#e8edf1'}}>
    <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
       <Text style = {{alignSelf:'center',color:'white',fontSize:18,fontWeight:'bold'}}>Passbook </Text>
        
       
        </Header>
 <Content>

<View style = {{flex:1,backgroundColor:'#0c3263',height:150}}> 
<Icon name="ios-wallet" style={{ color:'white',fontSize:45,alignItems:'center',alignSelf:'center',paddingTop:15}} />
<Text style = {{alignSelf:'center',color:'white',fontSize:35,fontWeight:'600'}}>$ 12200 </Text>
</View>
<View style = {{backgroundColor:'white',marginTop:-30,marginHorizontal:30,height:450}}>
<List  >

<ListItem itemHeader first>
              <Text>Payments History</Text>
            </ListItem>
            <ListItem noBorder >
              <Left>
                <View style={{flexDirection:'column'}}> 
                <Text style ={{fontSize:13,paddingLeft:5}}>Simon Mignolet</Text>
                <Text style ={{fontSize:11,color:'grey',paddingRight:18}}>07/05/2019</Text>
                </View>
                
              </Left>
              <Right>
               <Text style={{color:'#1c4478'}}>$255</Text>
              </Right>
            </ListItem>
            <ListItem  noBorder>
              <Left>
                <View style={{flexDirection:'column'}}> 
                <Text style ={{fontSize:13,paddingLeft:5}}>Simon Mignolet</Text>
                <Text style ={{fontSize:11,color:'grey',paddingRight:18}}>07/05/2019</Text>
                </View>
                
              </Left>
              <Right>
               <Text>$255</Text>
              </Right>
            </ListItem>
            <ListItem noBorder>
              <Left>
                <View style={{flexDirection:'column'}}> 
                <Text style ={{fontSize:13,paddingLeft:5}}>Simon Mignolet</Text>
                <Text style ={{fontSize:11,color:'grey',paddingRight:18}}>02/05/2019</Text>
                </View>
                
              </Left>
              <Right>
               <Text>$25</Text>
              </Right>
            </ListItem>
            <ListItem  noBorder>
              <Left>
                <View style={{flexDirection:'column'}}> 
                <Text style ={{fontSize:13,paddingLeft:5}}>Simon Mignolet</Text>
                <Text style ={{fontSize:11,color:'grey',paddingRight:18}}>08/11/2019</Text>
                </View>
                
              </Left>
              <Right>
               <Text>$211</Text>
              </Right>
            </ListItem>
          </List>

</View>
 </Content>




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
 }
});


