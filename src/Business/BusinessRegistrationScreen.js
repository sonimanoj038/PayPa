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
  ScrollView,
  View,
  TouchableOpacity,
  StatusBar,Image,Platform,
  TouchableWithoutFeedback,PermissionsAndroid,ActivityIndicator
} from 'react-native';

import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Header,Body,Title, Content,CheckBox,Thumbnail} from 'native-base';
import Mytext from '../Common/Component/Mytext';
import DocumentPicker from 'react-native-document-picker';

import AsyncStorage from '@react-native-community/async-storage';
import {toastr} from '../Common/Screens/LoginScreen';
import ImagePicker from 'react-native-image-crop-picker';
export default class BusinessRegistrationScreen extends React.Component {
  
    constructor(props){
        super(props);
    this.state ={
      fname:"",
      lname:"",
      email:'',
      loading:false,
     term:false,
     password:'',
currentLongitude: 'unknown',//Initial Longitude
    currentLatitude: 'unknown',
    doc1:'',
    doc2:'',
    doc3:'',
    doc4:'',
    doc2name:'',
    doc1name:'',
    doc3name:'',
    doc4name:'',
    doc1type:'',
    doc2type:'',
    doc3type:'',
    doc4type:'',
    userid:'',
    Contact:'',
    pic:'',
    type :'',
    Cmail:'',
    session_id:''
   
    }
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
  const { Cmail}  = this.state ;
  const { Contact}  = this.state ;
  const { email }  = this.state ;
  const { doc1}  = this.state ;
  const { doc2}  = this.state ;
  const { doc3 }  = this.state ;
  const {doc4} = this.state;
if( fname ===""){

  toastr.showToast("Enter First Name")
return false
}

else if (lname ==="")
{
  toastr.showToast("Enter Surname")
  return false

}
else if (email ==="")
{
  toastr.showToast("Enter Email")
  return false

}
else if (email && !this.validateEmail(email)) {
  toastr.showToast('Please enter valid Email ID');
  return false
}
else if (Cmail ==="")
{
  toastr.showToast("Enter Confirm Email")
  return false

}
else if (email !==Cmail)
{
  toastr.showToast("Email addresses do not match")
  return false

}
else if (doc1 ==="")
{
  toastr.showToast("Upload Certified Id Copy")
  return false

}
else if (doc2 ==="")
{
  toastr.showToast("Upload Proof of Business Account")
  return false

}
else if (doc3 ==="")
{
  toastr.showToast("Proof of Business Address")
  return false

}
else if (doc4 ==="")
{
  toastr.showToast("Upload Business Bank Account")
  return false

}else if (this.state.term ===false)
{
  toastr.showToast("Please Accept Terms & Conditions ")
  return false

}

else
this.setState({loading:true})
return true;
}

getFile =async()=>

{
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf,DocumentPicker.types.images],
    })
   
   console.log(res)
    this.setState({doc1:res.uri,
    doc1name:res.name,doc1type:res.type})
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.warn(err)
    } else {
      throw err;
    }
  }

}

getFile2 =async()=>
{
 try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf,DocumentPicker.types.images],
    })

    this.setState({doc2:res.uri,
    doc2name:res.name,doc2type:res.type})
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.warn(err)
    } else {
      throw err;
    }
  }

}
getFile3 =async()=>

{
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf,DocumentPicker.types.images],
    }) 
    this.setState({doc3:res.uri,doc3name:res.name,doc3type:res.type})
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.warn(err)
    } else {
      throw err;
    }
  }

}
getFile4 =async()=>

{
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf,DocumentPicker.types.images],
    })
   
    
    this.setState({doc4:res.uri,
    doc4name:res.name,doc4type:res.type})
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.warn(err)
    } else {
      throw err;
    }
  }

}
getImage = ()=>{
  ImagePicker.openPicker({
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
    }).then(image => {
       this.setState({pic:image.path,type:image.mime})
    }) 
  }

componentDidMount = async () => {
  const value = await AsyncStorage.getItem('uid')
  const session_id = await AsyncStorage.getItem('session_id')
  this.setState({
    userid: value,session_id:session_id
  })

}


 submitData = async()=>{
  const {fname }  = this.state ;
  const { lname }  = this.state ;
  const {email} = this.state
  const {pic} = this.state
const {userid} = this.state
  let formdata = new FormData();
  formdata.append("session_id", this.state.session_id);
  formdata.append("fname",fname);
  formdata.append("sname",lname );
  formdata.append("email",email);
 if(pic!==""){
  const newFile = {
    uri:pic, type: this.state.type,
    name:this.state.type.split("/") ==='png'?'images.png':'images.jpg'
  }
  formdata.append("pic",newFile);
 }
  formdata.append('doc1',{uri:this.state.doc1 , name: this.state.doc1name, type: this.state.doc1type});
  formdata.append("doc2", {uri:this.state.doc2 , name: this.state.doc2name, type: this.state.doc2type});
  formdata.append("doc3", {uri:this.state.doc3 , name: this.state.doc3name, type: this.state.doc3type});
  formdata.append("doc4", {uri:this.state.doc4 , name: this.state.doc4name, type: this.state.doc4type});
  formdata.append("uid",userid);
  console.log(this.state.doc1type,this.state.doc1)
  if(this.validateInput()){
  await fetch('https://www.markupdesigns.org/paypa/api/addProfile', {
    method: 'POST',
    headers: {
     'Content-Type': 'multipart/form-data',
    },
    body:formdata
  }).then((response) => response.json()).then((responseJson) => {
         this.setState({loading:false,mydata:responseJson})
         if(responseJson.status === 'Success')
         {
             this.props.navigation.navigate('UploadBusiness')
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
          <Text style = {{alignSelf:'center',color:'white',fontSize:18,fontFamily:'Roboto-Medium'}}> Business Registration </Text>
          {/* <Title > Business Registration</Title> */}

        </Header>
        <ScrollView  showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
 <Content  >

<Text></Text>
<TouchableOpacity style ={{alignItems:'center',justifyContent:'center',alignSelf:'center'}} onPress ={this.getImage}>
  <Thumbnail large source={this.state.pic?{uri:this.state.pic}:require('../img/common/profile.png')}  /></TouchableOpacity>

<Text></Text>
<Item  regular style ={styles.InputItem} >

     <Input placeholder='First Name' placeholderTextColor="#797b7d" 
     style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}} 
     
     onChangeText={(fname)=>this.setState({fname})}
     
     />
          </Item>

          <Mytext></Mytext>
          
          <Item  regular style ={styles.InputItem} >

     <Input placeholder='Surname' placeholderTextColor="#797b7d" 
      onChangeText={(lname)=>this.setState({lname})}
     style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}} />
          </Item>

          <Mytext></Mytext>
          <Item  regular style ={styles.InputItem} >

<Input placeholder='Email' placeholderTextColor="#797b7d"
 onChangeText={(email)=>this.setState({email})}


style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}} />
     </Item>
          <Mytext></Mytext>
          <Item  regular style ={styles.InputItem} >

<Input placeholder='Confirm Email' placeholderTextColor="#797b7d" 
 onChangeText={(Cmail)=>this.setState({Cmail})}
style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}} />
     </Item>
    <Mytext></Mytext>
  
<View style = {{flexDirection:'row',justifyContent:"space-around",paddingHorizontal:10}}>
    <Text style={{fontSize:11,fontFamily: 'Roboto-Medium'}}>Director Certified Id Copy</Text>
    <Text style={{fontSize:11,fontFamily: 'Roboto-Medium'}}>Business Registration Document</Text>
    </View>
    <View style={{ flexDirection:'row',justifyContent:"space-around",paddingHorizontal:10,paddingVertical:5}}>
        <TouchableOpacity style = {{backgroundColor:'white',

        backgroundColor:'white',paddingHorizontal:30,paddingVertical:20}}
        onPress ={this.getFile}
        >
            <Image source={require( '../img/common/upload3.png')} />
            
               {this.state.doc1name? <Text style ={{fontSize:11,fontWeight:'600',color:'#686e6a',textAlign:'center'}}>{this.state.doc1name.substring(0,12) }...</Text>:null}
    
            </TouchableOpacity>
           
            <TouchableOpacity style = {{backgroundColor:'white',
// @ts-ignore

            backgroundColor:'white',paddingHorizontal:30,paddingVertical:20}}
            onPress ={this.getFile2}
            >
            <Image source={require(
// @ts-ignore
            '../img/common/upload3.png')} />
             {this.state.doc2name? <Text style ={{fontSize:11,fontWeight:'600',color:'#686e6a',textAlign:'center'}}>{this.state.doc2name.substring(0,12) }...</Text>:null}
            </TouchableOpacity>
    </View>


    <View style = {{flexDirection:'row',justifyContent:"space-around",paddingHorizontal:10}}>
    <Text style={{fontSize:11,fontFamily: 'Roboto-Medium'}}>Proof of Business Address</Text>
    <Text style={{fontSize:11,fontFamily: 'Roboto-Medium'}}>Proof of Business Bank Account</Text>
    </View>
    <View style={{ flexDirection:'row',justifyContent:"space-around",paddingHorizontal:10,paddingVertical:5}}>
        <TouchableOpacity style = {{backgroundColor:'white',paddingHorizontal:30,paddingVertical:20}}
         onPress ={this.getFile3}
        >
            <Image source={require(
// @ts-ignore
            '../img/common/upload3.png')} />
             {this.state.doc3name? <Text style ={{fontSize:11,fontWeight:'600',color:'#686e6a',textAlign:'center'}}>{this.state.doc3name.substring(0,12) }...</Text>:null}
            </TouchableOpacity>
    
            <TouchableOpacity style = {{backgroundColor:'white',paddingHorizontal:30,paddingVertical:20}}
             onPress ={this.getFile4}
            >
            <Image source={require(
// @ts-ignore
            '../img/common/upload3.png')} />
             {this.state.doc4name? <Text style ={{fontSize:11,fontWeight:'600',color:'#686e6a',textAlign:'center'}}>{this.state.doc4name.substring(0,12) }...</Text>:null}
            </TouchableOpacity>
    </View>
    
     <View style = {{flexDirection:'row',paddingHorizontal:20,paddingVertical:5}}>
        <TouchableOpacity onPress = {this.submitData} >
        <CheckBox checked={
        this.state.term} onPress ={()=>{this.setState({term:!this.state.term})}} color ='#575a5e'/>
        </TouchableOpacity>
        <Text style = {{color:'#9ca0a6',paddingHorizontal:15,fontFamily: 'Roboto-Light',fontSize:15}}>Terms & Conditions</Text>
     </View>
     
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
              />: <Text style = {{color:'white',fontFamily:'Roborto ',fontSize:18,fontWeight:'800',padding:15}}>SUBMIT NOW</Text>}
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
 }
});


