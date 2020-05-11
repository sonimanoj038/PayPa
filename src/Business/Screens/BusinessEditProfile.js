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

export default class BusinessEditProfile extends React.Component {
   

    

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
    doc2name:'',
    doc1name:'',
    doc3name:'',
    doc4name:'',
    doc3:'',
    doc4:''
    ,userid:'',
    dataFetch:[],
    mainLoader:false,
    Alert_Visibility:false,
    pic:"",
    type:'',
    pic2:""
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
  const { Cmail}  = this.state ;

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
else if (email !==Cmail)
{
  toastr.showToast("Email addresses do not match")
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
      type: [DocumentPicker.types.pdf,DocumentPicker.types.images],
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
      type: [DocumentPicker.types.pdf,DocumentPicker.types.images],
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
      type: [DocumentPicker.types.pdf,DocumentPicker.types.images],
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
 
this.setState({userid:value,mainLoader:true},()=> this.FetchData())
  
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
  const {email} = this.state
  const {userid} = this.state
  let formdata = new FormData();
  const {pic2} = this.state
  formdata.append("fname",fname);
  formdata.append("sname",lname);
  formdata.append("email",email);
  if(pic2!==""){
    const newFile = {
      uri:pic2, type: this.state.type,
      name:this.state.type.split("/") ==='png'?'images.png':'images.jpg'
      
    }
    formdata.append("pic",newFile);
  }
 
  // formdata.append('doc1',
  // {uri:this.state.doc1 , name: this.state.doc1name, type: 'application/pdf'}
    
  // );
  // formdata.append("doc2", {uri:this.state.doc2 , name: this.state.doc2name, type: 'application/pdf'});
  // formdata.append("doc3", {uri:this.state.doc3 , name: this.state.doc3name, type: 'application/pdf'});
  // formdata.append("doc4", {uri:this.state.doc4 , name: this.state.doc4name, type: 'application/pdf'});
  formdata.append("uid",userid);
  if(this.validateInput()){
  await fetch('https://www.markupdesigns.org/paypa/api/editProfile', {
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
          let fetchData= responseJson['data']['Listing'][0];
          let name = fetchData.fname
          AsyncStorage.setItem('name', fetchData.fname)
          console.warn(name)
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


    FetchData = async() =>{
  
      const {userid} = this.state
    
              let formdata = new FormData();
              
              formdata.append("uid",userid);
              await fetch('https://www.markupdesigns.org/paypa/api/viewProfile', {
            
                method: 'POST',
                headers: {
                 'Content-Type': 'multipart/form-data',
                },
      
                body: formdata
              }).then((response) => response.json())
                    .then((responseJson) => {
                  
                      if(responseJson.status ==="Failure"){
                        console.warn("dfd",responseJson)
               
                      }
                      else{
                        console.log("data",JSON.stringify(responseJson))
                        let fetchData= responseJson['data']['Listing'][0];
                     
                        this.setState({mainLoader:false, fname:fetchData.fname,lname:fetchData.sname,email:fetchData.email,isVisible:true,Cmail:fetchData.email,pic:fetchData.pic})
                       
                    
                    } 
                    }).catch((error) => {
                      console.error(error);
                    });
             
            }

               removePic = async()=>{
               const {userid} = this.state;
              let formdata = new FormData();
              formdata.append("filePath",this.state.pic);
              formdata.append("uid",userid);
              formdata.append("type",'pic');
              await fetch('https://www.markupdesigns.org/paypa/api/deletePic', {
            
                method: 'POST',
                headers: {
                 'Content-Type': 'multipart/form-data',
                },
      
                body: formdata
              }).then((response) => response.json())
                    .then((responseJson) => {
                  
                      if(responseJson.status ==="Failure"){
                        console.warn("dfd",responseJson)
               
                      }
                      else{
                        toastr.showToast("Profile Pic Removed")
                       this.FetchData()
                    } 
                    }).catch((error) => {
                      console.error(error);
                    });
             
}
    render(){
      if(this.state.mainLoader){
        return(
          <View style={{ position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center'}}>
          <ActivityIndicator
                       animating = {this.state.mainLoader}
                       color = '#1c4478'
                       size={"large"}
                       
                      />
                      </View>
        )
      }
  return (
   
 <Container style = {{flex:1,backgroundColor:'#e8edf1',}}>
    <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
          <Left style ={{flex:1}}>
          <Icon name='md-arrow-back'  style={{color:'white',fontSize:22,paddingLeft:10}} onPress = {()=>  this.props.navigation.goBack()}/>
          </Left>
          <Body style ={{flex:1,alignItems:'center'}} >
          <Text style = {{color:'white',fontSize:18,fontFamily:''}}> Edit Registration </Text>
          {/* <Title > Business Registration</Title> */}
          </Body>
        <Right style ={{flex:1}}></Right>
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
                    {this.state.msg?<Text style={styles.Alert_Title}>Success </Text>:<Text style={styles.Alert_Title}>Registration Successfull </Text>}
 
                    {this.state.msg? <Text style={styles.Alert_Message}> {this.state.msg}</Text>:<Text style={styles.Alert_Message}> Your Accout will be verify shortly </Text>}
                  
                  
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

<Thumbnail large source={this.state.pic?{uri:"https://www.markupdesigns.org/paypa/" +this.state.pic}:this.state.pic2 ===""?require('../../img/common/profile.png'):this.state.pic ==='null'?require('../../img/common/profile.png'):{uri:this.state.pic2}}  /></TouchableOpacity>
<Text  style = {{alignSelf:'center',color:'grey',fontSize:14,alignItems:'center'}}>Timeline Profile Picture</Text>
<TouchableOpacity style ={{alignItems:'center',justifyContent:'center',alignSelf:'center'}} onPress ={this.removePic}>
{this.state.pic ===""?null:<Text style = {{alignSelf:'center',color:'red',fontSize:14,alignItems:'center'}}>Remove</Text>}
</TouchableOpacity>
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

<Input placeholder='Email' placeholderTextColor="#797b7d"
 onChangeText={(email)=>this.setState({email})}
 value = {this.state.email}

style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}} />
     </Item>
          <Mytext></Mytext>
          <Item  regular style ={styles.InputItem} >

<Input placeholder='Confirm Email' placeholderTextColor="#797b7d" 
 onChangeText={(Cmail)=>this.setState({Cmail})}
 value = {this.state.Cmail}
style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}} />
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


