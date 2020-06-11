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
  View,ActivityIndicator,
  TouchableOpacity,
  StatusBar,Image,Platform,
  TouchableWithoutFeedback,PermissionsAndroid,Modal
} from 'react-native';


// @ts-ignore
import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Header,Body,Title, Content,CheckBox,Thumbnail} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Mytext from '../../Common/Component/Mytext';
import DocumentPicker from 'react-native-document-picker';
import Geolocation from '@react-native-community/geolocation';
import {toastr} from '../../Common/Screens/LoginScreen'
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage'; 
export default class UserRegistrationScreen extends React.Component {
   

    

    constructor(props){

        super(props);
   
    this.state ={
      fname:"",
      sname:"",
      Cmail:'',
      dateSalary:null,
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
   userid:'',msg:'',
    checked:false,
    Alert_Visibility:false,
    ModalView:true,
    pic:"",type:'',session_id:''
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
  const { sname }  = this.state ;
  const { Cmail}  = this.state ;
  const { pic }  = this.state ;
  const {term }  = this.state ;
  const { email }  = this.state ;
  const { doc1}  = this.state ;
  const { doc2}  = this.state ;
  const { doc3 }  = this.state ;
  const {doc4} = this.state;
  const{dateSalary} = this.state

 if( fname ===""){

  toastr.showToast("Enter First Name")
return false
}

else if (sname ==="")
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
else if(Cmail ===""){

  toastr.showToast("Enter Confiramtion Email")
  return false
}
else if (email !==Cmail)
{
  toastr.showToast("Email addresses do not match")
  return false

}


else if (doc1 ===""  && this.state.checked)
{
  toastr.showToast("Upload Certified Id Copy")
  return false

}
else if (doc2 ===""  && this.state.checked)
{
  toastr.showToast("Upload 3 Months Bank Statement")
  return false

}
else if (doc3 ==="" && this.state.checked)
{
  toastr.showToast(" Uplaod Latest Payslip")
  return false

}
else if (doc4 ==="" && this.state.checked)
{
  toastr.showToast("Upload Proof of Residence")
  return false

}

else if (term ===false)
{
  toastr.showToast("Please Accept Terms & Conditions")
  return false

}
else
this.setState({loading:true})
return true;
}



Show_Custom_Alert(data) {
 
  this.setState({Alert_Visibility: true,msg:data});
  
}

ok_Button=()=>{
 
  this.setState({Alert_Visibility: false});
  
  this.props.navigation.navigate('User')
 
      
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
componentDidMount = async() => {

  const value = await AsyncStorage.getItem('uid')
  const session_id = await AsyncStorage.getItem('session_id')
  console.warn(value)
  this.setState({userid:value,session_id:session_id})
 
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

 submitData = async()=>{


  const {fname }  = this.state ;
  const { sname }  = this.state
  const {email} = this.state
  const {dateSalary} = this.state
  const {pic} = this.state
 
const {userid} = this.state

  let formdata = new FormData();

  formdata.append("fname",fname);
  formdata.append("sname",sname);
  formdata.append("email",email);
  formdata.append("dateSalary",dateSalary);
  formdata.append("session_id", this.state.session_id);
 if(pic!==""){
  const newFile = {
    uri:pic, type: this.state.type,
    name:this.state.type.split("/") ==='png'?'images.png':'images.jpg'
    
  }
  
  formdata.append("pic",newFile);
 }
 
  if(this.state.checked){

    formdata.append('doc1',{uri:this.state.doc1 , name: this.state.doc1name, type: this.state.doc1type});
    formdata.append("doc2", {uri:this.state.doc2 , name: this.state.doc2name, type: this.state.doc2type});
    formdata.append("doc3", {uri:this.state.doc3 , name: this.state.doc3name, type: this.state.doc3type});
    formdata.append("doc4", {uri:this.state.doc4 , name: this.state.doc4name, type: this.state.doc4type});
  }
 
  formdata.append("uid",userid);
  console.log(this.state.doc1, this.state.doc1name,this.state.doc1type,this.state.userid)
  if(this.validateInput()){
    
      this.setState({loading:true})
  await fetch('https://www.markupdesigns.org/paypa/api/addProfile', {
    method: 'POST',
    headers: {
     'Content-Type': 'multipart/form-data',
     
    },
    body:formdata
   
  }).then((response) => response.json()).then((responseJson) => {
          console.log(responseJson)
        
         this.setState({loading:false,mydata:responseJson})
         if(responseJson.status === 'Success')
         {
          this.Show_Custom_Alert();
        
          }
            
        
         
         else{
          this.setState({loading:false})
          alert(JSON.stringify(responseJson))
         }
   
        }).catch((error) => {
          console.warn(error);
        });
      }  
      
    }

    render(){
  return (
    
 <Container style = {{backgroundColor:'#e8edf1'}}>
  
    <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
         
        
          <Text style = {{alignSelf:'center',color:'white',fontSize:18,fontFamily:'Roboto-Medium'}}>User Registration</Text>
         
       
         
        </Header>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
 <Content  >

 <Modal
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          visible={this.state.Alert_Visibility}
          transparent={true}
 
          animationType={"fade"}
 
          onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } >
 
 
            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0.2, 0.7)'}}>
 
 
                <View style={styles.Alert_Main_View}>
 
                <Image source={require('../../img/common/sucess.png')} style={{maxHeight:50,resizeMode: 'contain'}} />
                    {this.state.msg?<Text style={styles.Alert_Title}>Oops!! </Text>:<Text style={styles.Alert_Title}>Success </Text>}
 
                    { this.state.checked? <Text style={styles.Alert_Message}> Your Accout will be verify shortly{this.state.msg}</Text>:<Text style={styles.Alert_Message}> You are registered successfully </Text>}
                  
                  
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


<Text></Text>
<TouchableOpacity style ={{alignItems:'center',justifyContent:'center',alignSelf:'center'}} onPress ={this.getImage}>
  <Thumbnail large source={this.state.pic?{uri:this.state.pic}:require('../../img/common/profile.png')}  /></TouchableOpacity>
  <Text  style = {{alignSelf:'center',color:'grey',fontSize:14,alignItems:'center'}}>Timeline Profile Picture</Text>
<Text></Text>
<Item  regular style ={styles.InputItem} >

<Input placeholder='Firstname *' placeholderTextColor="#797b7d" style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}}
 onChangeText={(fname)=>this.setState({fname})}
/>
     </Item>
          <Mytext></Mytext>
          <Item  regular style ={styles.InputItem} >
     <Input placeceholder='Surname *' placeholderTextColor="#797b7d" style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}}
      onChangeText={(sname)=>this.setState({sname})}
     />
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

          <Mytext>
</Mytext>
   
     <Item  style ={[styles.InputItem,{backgroundColor:'#dfeaf2',justifyContent:'space-around',borderRadius:0,borderColor:'#dfeaf2'}]} >
    <Text style={{fontSize:16,fontFamily: 'Roboto-Medium',paddingVertical:10,fontWeight:'bold'}}>Apply for PayPa credit?</Text>
    <CheckBox checked={this.state.checked}  color='#1c4478' onPress= {()=>{this.setState({checked:!this.state.checked})}}/>
     </Item>
  <Text></Text>
 
{this.state.checked?<View>
  <Text style={{fontSize:11,fontFamily: 'Roboto-Light',paddingVertical:10,paddingHorizontal:10,color:'#e46c0b',textAlign:'center'}}>Note:-You must earn a minimum net income of R8000 in order to apply. </Text>
  <Item  regular style ={styles.InputItem}>


     </Item>
     <Text></Text><View style = {{flexDirection:'row',justifyContent:"space-around",paddingHorizontal:10}}>
    <Text style={{fontSize:11,fontFamily: 'Roboto-Medium'}}>Certified ID Copy</Text>
    <Text style={{fontSize:11,fontFamily: 'Roboto-Medium'}}>3 Months Bank Statment</Text>
    </View>
    <View style={{ flexDirection:'row',justifyContent:"space-around",paddingHorizontal:10,paddingVertical:5}}>
        <TouchableOpacity style = {{backgroundColor:'white',

        backgroundColor:'white',paddingHorizontal:30,paddingVertical:20}}
        onPress ={this.getFile}
        >
            <Image source={require( '../../img/common/upload3.png')} />
            
               {this.state.doc1name? <Text style ={{fontSize:11,fontWeight:'600',color:'#686e6a',textAlign:'center'}}>{this.state.doc1name.substring(0,12) }...</Text>:null}
    
            </TouchableOpacity>
           
            <TouchableOpacity style = {{backgroundColor:'white',
// @ts-ignore

            backgroundColor:'white',paddingHorizontal:30,paddingVertical:20}}
            onPress ={this.getFile2}
            >
            <Image source={require(
// @ts-ignore
            '../../img/common/upload3.png')} />
             {this.state.doc2name? <Text style ={{fontSize:11,fontWeight:'600',color:'#686e6a',textAlign:'center'}}>{this.state.doc2name.substring(0,12) }...</Text>:null}
            </TouchableOpacity>
    </View>

    <View style = {{flexDirection:'row',justifyContent:"space-around",paddingHorizontal:10}}>
    <Text style={{fontSize:11,fontFamily: 'Roboto-Medium'}}>Latest Payslip</Text>
    <Text style={{fontSize:11,fontFamily: 'Roboto-Medium'}}>Proof of Residence</Text>
    </View>
    <View style={{ flexDirection:'row',justifyContent:"space-around",paddingHorizontal:10,paddingVertical:5}}>
        <TouchableOpacity style = {{backgroundColor:'white',paddingHorizontal:30,paddingVertical:20}}
         onPress ={this.getFile3}
        >
            <Image source={require(
// @ts-ignore
            '../../img/common/upload3.png')} />
             {this.state.doc3name? <Text style ={{fontSize:11,fontWeight:'600',color:'#686e6a',textAlign:'center'}}>{this.state.doc3name.substring(0,12) }...</Text>:null}
            </TouchableOpacity>
    
            <TouchableOpacity style = {{backgroundColor:'white',paddingHorizontal:30,paddingVertical:20}}
             onPress ={this.getFile4}
            >
            <Image source={require(
// @ts-ignore
            '../../img/common/upload3.png')} />
             {this.state.doc4name? <Text style ={{fontSize:11,fontWeight:'600',color:'#686e6a',textAlign:'center'}}>{this.state.doc4name.substring(0,12) }...</Text>:null}
            </TouchableOpacity>
    </View>
    </View>
    :null}
    <Text></Text>
   
 
<Text></Text>
     <View style = {{flexDirection:'row',paddingHorizontal:20,paddingVertical: 5,bottom:0,position:'absolute'}}>

     <TouchableOpacity onPress = {()=>{this.setState({term:!this.state.term})}} >
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


