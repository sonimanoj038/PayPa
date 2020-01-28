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
import { Container, Radio,Right,Text, Left,Input,Item ,Button, Footer,Header,Body,Title, Content,CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Mytext from '../../Common/Component/Mytext';
import DocumentPicker from 'react-native-document-picker';
import Geolocation from '@react-native-community/geolocation';
import {toastr} from '../../Common/Screens/LoginScreen'
import AsyncStorage from '@react-native-community/async-storage';
export default class UserEditProfile extends React.Component {
   

    

    constructor(props){

        super(props);
   
    this.state ={
      fname:"",
      lname:"",
      mobile:'',
      dateSalary:null,
      email:'',
      loading:false,
term:false,
password:'',
currentLongitude: 'unknown',//Initial Longitude
    currentLatitude: 'unknown',
    doc1:'',
    doc2:'',
    doc2name:'',
    doc1name:'',
    doc3name:'',
    doc4name:'',
    doc3:'',
    doc4:''
    ,userid:'',
    
    Alert_Visibility:false
    }
}


validateInput = ()=>{
  const {fname }  = this.state ;
  const { lname }  = this.state ;
  const { mobile}  = this.state ;
  const { dateSalary }  = this.state ;
  const { password }  = this.state ;
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
else if (mobile ==="")
{
  toastr.showToast("Enter Mobile Number")
  return false

}
else if (doc1 ==="")
{
  toastr.showToast("Upload Certified Id Copy")
  return false

}
else if (doc2 ==="")
{
  toastr.showToast("Upload 3 Months Bank Statements")
  return false

}
else if (doc3 ==="")
{
  toastr.showToast(" Uplaod latest payslips")
  return false

}
else if (doc4 ==="")
{
  toastr.showToast("Upload proof of residance")
  return false

}
else if (dateSalary ==="")
{
  toastr.showToast("Enter Date of Salary")
  return false

}
else if (password ==="")
{
  toastr.showToast("Enter password")
  return false

}
else
this.setState({loading:true})
return true;
}



Show_Custom_Alert(visible) {
 
  this.setState({Alert_Visibility: visible});
  
}

ok_Button=()=>{
 
  this.setState({Alert_Visibility: false});
  this.props.navigation.navigate('User')
          
}
 getFile =async()=>

{
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
    })
   
   
    this.setState({doc1:res.uri,
    doc1name:res.name})
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
      type: [DocumentPicker.types.pdf],
    })
   

    this.setState({doc2:res.uri,
    doc2name:res.name})
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
      type: [DocumentPicker.types.pdf],
    })
   
    
    this.setState({doc3:res.uri,doc3name:res.name})
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
      type: [DocumentPicker.types.pdf],
    })
   
    
    this.setState({doc4:res.uri,
    doc4name:res.name})
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
  console.warn(value)
  this.setState({userid:value})
 
 }


 submitData = async()=>{


  const {fname }  = this.state ;
  const { sname }  = this.state ;
  const {mobile} = this.state
  const {email} = this.state
  const {dateSalary} = this.state
  const {password} = this.state
  
const {userid} = this.state

  let formdata = new FormData();
  formdata.append("mobile",mobile);
  formdata.append("fname",fname);
  formdata.append("sname",sname);
  formdata.append("email",email);
  formdata.append("dateSalary",dateSalary);
  formdata.append("pass",password);
  formdata.append('doc1',
  {uri:this.state.doc1 , name: this.state.doc1name, type: 'application/pdf'}
    
  );
  formdata.append("doc2", {uri:this.state.doc2 , name: this.state.doc2name, type: 'application/pdf'});
  formdata.append("doc3", {uri:this.state.doc3 , name: this.state.doc3name, type: 'application/pdf'});
  formdata.append("doc4", {uri:this.state.doc4 , name: this.state.doc4name, type: 'application/pdf'});
  formdata.append("uid",userid);
  if(this.validateInput()){
  await fetch('https://www.markupdesigns.org/paypa/api/addEditProfile', {
    method: 'POST',
    headers: {
     'Content-Type': 'multipart/form-data',
     
    },
    body:formdata
   
  }).then((response) => response.json()).then((responseJson) => {
          
        
        
         this.setState({loading:false,mydata:responseJson})
         if(responseJson.status === 'Success')
         {
          this.Show_Custom_Alert();
       
             this.props.navigation.navigate('Uregister')
          
        
          }
            
  
         
         else{
  
          alert(responseJson)
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
          <Left>
          <Icon name='md-arrow-back'  style={{color:'white',fontSize:25,paddingLeft:10}} onPress = {()=>  this.props.navigation.goBack()}/>
          </Left>
          <Body  >
          <Title > Edit User Profile</Title>
          </Body>
         
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
 
 
                    <Text style={styles.Alert_Title}>Registration Successfull </Text>
 
                    <Text style={styles.Alert_Message}> Your Accout will be verify shortly </Text>
                  
                  
                </View>
                <View style={{flexDirection: 'row',height:'10%',width:'70%'}}>
 <TouchableOpacity 
     style={styles.buttonStyle} 
     onPress={this.ok_Button} 
     activeOpacity={0.7} 
     >
     <Text style={styles.TextStyle}> Let's Start </Text>
 </TouchableOpacity>

</View>
 </View>
</ Modal >
<Text></Text>
<Item  regular style ={styles.InputItem} >

     <Input placeholder='First Name' placeholderTextColor="#797b7d" 
     style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}}
     
     onChangeText={(fname)=>this.setState({fname})}
     />
          </Item>

          <Mytext></Mytext>
          
          <Item  regular style ={styles.InputItem} >

     <Input placeholder='Surname' placeholderTextColor="#797b7d" style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}}
      onChangeText={(lname)=>this.setState({lname})}
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

<Input placeholder='Mobile/Phone' placeholderTextColor="#797b7d" 
 onChangeText={(mobile)=>this.setState({mobile})}
style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}} />
     </Item>

          <Mytext>


</Mytext>

<View style = {{flexDirection:'row',justifyContent:"space-around",paddingHorizontal:10}}>
    <Text style={{fontSize:11,fontFamily: 'Roboto-Medium'}}>Certified ID Copy</Text>
    <Text style={{fontSize:11,fontFamily: 'Roboto-Medium'}}>3 months Bank statments</Text>
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
    <Text style={{fontSize:11,fontFamily: 'Roboto-Medium'}}>latest pay Slip</Text>
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
    <Text></Text>
    <Item  regular style ={styles.InputItem} >

<Input placeholder='Date of Salary' placeholderTextColor="#797b7d"
 onChangeText={(dateSalary)=>this.setState({dateSalary})}
style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}} />
     </Item>
     <Text></Text>
     <Item  regular style ={styles.InputItem} >

<Input placeholder='Paasword' placeholderTextColor="#797b7d" 
 onChangeText={(password)=>this.setState({password})}
style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}} />
     </Item>

     <View style = {{flexDirection:'row',paddingHorizontal:20,paddingVertical:10}}>

     <TouchableOpacity onPress = {()=>{this.setState({term:!this.state.term})}} >
     <CheckBox checked={
        this.state.term} onPress ={()=>{this.setState({term:!this.state.term})}} color ='#575a5e'/>
     </TouchableOpacity>
    <Text style = {{color:'#9ca0a6',paddingHorizontal:15,fontFamily: 'Roboto-Light',fontSize:15}}>Term & Condition</Text>
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
  borderWidth: 1,
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
    color: "black",
    textAlign: 'center',
    padding: 10,
    height: '35%',
    fontFamily:'Roboto-Light'
  },
 
buttonStyle: {
    
  width:'100%',
  backgroundColor:'#1c4478',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
 marginVertical:5,
 
 
  borderRadius:7,
},
   
TextStyle:{
    color:'white',
    textAlign:'center',
    fontSize: 23,
    marginTop: -5, fontFamily:'Roboto-Medium'
    
},
});


