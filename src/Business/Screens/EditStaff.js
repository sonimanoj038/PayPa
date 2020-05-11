/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  // @ts-ignore
  SafeAreaView,
  StyleSheet,
  // @ts-ignore
  ScrollView,
  View,
  TouchableOpacity,
  StatusBar,Image,Platform,
  TouchableWithoutFeedback,PermissionsAndroid,ActivityIndicator,Modal, ImageBackground
} from 'react-native';


// @ts-ignore
import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Header,Body,Title, Content,CheckBox,Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Mytext from '../../Common/Component/Mytext';
import DocumentPicker from 'react-native-document-picker';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';
import {toastr} from '../../Common/Screens/LoginScreen';
import ImagePicker from 'react-native-image-crop-picker';

export default class EditStaff extends React.Component {
   

    

    constructor(props){

        super(props);
   
    this.state ={
      fname:"",
      lname:"",
     
      mobile:'',
      loading:false,
staff_id:'',
    dataFetch:[],
    mainLoader:false,
    Alert_Visibility:false,
    pic:"",
    type:'',
    pic2:"",
    Cmobile:'',
    pin:''
    }
}
getImage = ()=>{
  ImagePicker.openPicker({
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
     
    }).then(image => {
       this.setState({pic2:image.path,type:image.mime,pic:""})
    }) 
  }
  validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
      return true;
    }
    return false;
  }
validateInput = ()=>{
  const {fname }  = this.state ;
  const { lname }  = this.state ;
 
  const { pin }  = this.state ;

if( fname ===""){

  toastr.showToast("Enter First Name")
return false
}

else if (lname ==="")
{
  toastr.showToast("Enter Surname")
  return false

}


else
this.setState({loading:true})
return true;
}




componentDidMount = async() => {
  const value = await AsyncStorage.getItem('uid')
  let  pic = this.props.navigation.state.params.data.pic;
      let  fname = this.props.navigation.state.params.data.fname;
      let  lname = this.props.navigation.state.params.data.lname;
      let  mobile = this.props.navigation.state.params.data.mobile;
      let  pin= this.props.navigation.state.params.data.pin;
      let  id= this.props.navigation.state.params.data.id;
this.setState({userid:value,mainLoader:true,fname:fname,lname:lname,mobile:mobile,pin:pin,pic:pic,Cmobile:mobile,staff_id:id})
  
 }


 Show_Custom_Alert(data) {
 
  this.setState({Alert_Visibility: true,msg:data});
  
}

ok_Button=()=>{
 
  this.setState({Alert_Visibility: false});
  this.props.navigation.goBack(null)
          
}
 submitData = async()=>{

  const {fname }  = this.state ;
  const { lname }  = this.state ;
  const {pin} = this.state
  const {staff_id} = this.state
  let formdata = new FormData();
  const {pic2} = this.state
  formdata.append("fname",fname);
  formdata.append("lname",lname);
  
  if(pic2!==""){
    const newFile = {
      uri:pic2, type: this.state.type,
      name:this.state.type.split("/") ==='png'?'images.png':'images.jpg'
      
    }
    formdata.append("pic",newFile);
  }
 
  formdata.append("staff_id",staff_id);
  if(this.validateInput()){
  await fetch('https://www.markupdesigns.org/paypa/api/editStaff', {
    method: 'POST',
    headers: {
     'Content-Type': 'multipart/form-data',
     
    },
    body:formdata
   
  }).then((response) => response.json()).then((responseJson) => {
          
        
        console.log("registartionlog " + JSON.stringify(responseJson))
         this.setState({loading:false,mydata:responseJson})
         if(responseJson.status === 'Success')
         {
         
          let msg = " You profile is updated"
          this.Show_Custom_Alert(msg);
        
          
        
          }
         else{
  
          alert(responseJson.msg)
         }
   
        }).catch((error) => {
          console.warn(error);
        });

      }
    }



    render(){
     
     
  return (
   
 <Container style = {{flex:1,backgroundColor:'#e8edf1',}}>
    <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
          <Left style ={{flex:1}}> 
          <Icon name='md-arrow-back'  style={{color:'white',fontSize:22,paddingLeft:10}} onPress = {()=>  this.props.navigation.goBack()}/>
          </Left>
          <Body  style ={{flex:1,alignItems:'center'}}>
          <Text style = {{color:'white',fontSize:18,fontFamily:''}}> Edit Staff </Text>
          {/* <Title > Business Registration</Title> */}
          </Body>
        <Right
        style ={{flex:1,alignItems:'center'}}
        ></Right>
        </Header>
        <Modal
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          visible={this.state.Alert_Visibility}
          transparent={true}
 
          animationType={"fade"}
 
          onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } >
 
 
            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0.2, 0.7)'}}>
 
 
                <View style={styles.Alert_Main_View}>
 
                <Image source={require('../../img/common/sucess.png')} style={{maxHeight:50,resizeMode: 'contain'}} />
                    {this.state.msg?<Text style={styles.Alert_Title}>Success </Text>:<Text style={styles.Alert_Title}>Registration Successful </Text>}
 
                    <Text style={styles.Alert_Message}> {this.state.msg} </Text>
                  
                  
                </View>
                <View style={{flexDirection: 'row',height:'10%',width:'70%'}}>
 <TouchableOpacity 
     style={styles.buttonStyleFull} 
     onPress={this.ok_Button} 
     activeOpacity={0.7} 
     >
    {this.state.msg?<Text style={styles.TextStyle}> OK</Text>:<Text style={styles.TextStyle}> Let's Start</Text>}
 </TouchableOpacity>

</View>
 </View>
</ Modal >
        <ScrollView style={{}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
 <Content  >
 

 
<Text></Text>
<TouchableOpacity style ={{alignItems:'center',justifyContent:'center',alignSelf:'center'}} onPress ={this.getImage}>

<Thumbnail large source={this.state.pic?{uri:"https://www.markupdesigns.org/paypa/" +this.state.pic}:this.state.pic2 ===""?require('../../img/common/profile.png'):{uri:this.state.pic2}}  /></TouchableOpacity>

<Text></Text>

<Item  regular style ={styles.InputItem} >

     <Input placeholder='First Name' placeholderTextColor="#797b7d" 
     style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}} 
     value = {this.state.fname}
     onChangeText={(fname)=>this.setState({fname})}
     
     />
          </Item>

          <Mytext></Mytext>
          
          <Item  regular style ={styles.InputItem} >

     <Input placeholder='Surname' placeholderTextColor="#797b7d" 
      onChangeText={(lname)=>this.setState({lname})}
      value = {this.state.lname}
     style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}} />
          </Item>

          <Mytext></Mytext>
          <Item  regular style ={styles.InputItem} >

<Input placeholder='Call Number' placeholderTextColor="#797b7d"
 onChangeText={(mobile)=>this.setState({mobile})}
 value = {this.state.mobile}
 keyboardType ='numeric'
 editable = {false}
style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15,opacity:0.7}} />
     </Item>
          <Mytext></Mytext>
          <Item  regular style ={styles.InputItem} >

<Input placeholder='Confirm Call Number' placeholderTextColor="#797b7d" 
 onChangeText={(Cmobile)=>this.setState({Cmobile})}
 value = {this.state.Cmobile}
 keyboardType ='numeric'
 editable = {false}
style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15,opacity:0.7}} />
     </Item>

          <Mytext>
</Mytext>


    <Text></Text>
    
</Content>
</ScrollView>
<Footer style = {{
// @ts-ignore
color:'#dce0e6',
  backgroundColor:'#e46c0b'}}>
<TouchableWithoutFeedback onPress= {this.submitData}>
{this.state.loading?<ActivityIndicator
               animating = {this.state.loading}
               color = 'white'
               size={"large"}
               style ={{paddingHorizontal:50,alignItems:'center',width:'100%'}}
              />: <Text style = {{color:'white',fontFamily:'Roborto ',fontSize:18,fontWeight:'800',padding:15}}>Submit</Text>}
            </TouchableWithoutFeedback>
          </Footer>
 </Container>

  );
};
}
const styles = StyleSheet.create({
 
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


