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

export default class ShowStaff extends React.Component {
   

  static navigationOptions = {

    tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-contact" style={{ color: tintColor,fontSize:30 }} />
    )
}

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
    pin:'',
    session_id:''
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
else if (pin ==="")
{
  toastr.showToast("Enter Pin")
  return false

}
else if (pin.length<5) {
    toastr.showToast('Please Enter a Valid 5 digit Pin');
    return false
  }


else
this.setState({loading:true})
return true;
}




componentDidMount = async() => {
  const id = await AsyncStorage.getItem('id')
  const mobile = await AsyncStorage.getItem('mobile')
  const session_id = await AsyncStorage.getItem('session_id')
  const name =await AsyncStorage.getItem('name')
  let fname  =  name.split(" ")[0];
  let lname  =  name.split(" ")[1];
  const pin =await AsyncStorage.getItem('pin')
  const pic =await AsyncStorage.getItem('pic')
     
this.setState({mainLoader:true,fname:fname,lname:lname,mobile:mobile,pin:pin,pic:pic,Cmobile:mobile,staff_id:id,session_id:session_id})
  
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
  formdata.append("sname",lname);
  formdata.append("pin",pin);
  formdata.append("session_id", this.state.session_id);
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
   
  }).then((response) => response.json()).then(async(responseJson) => {
          
        
        console.log("registartionlog " + JSON.stringify(responseJson))
         this.setState({loading:false,mydata:responseJson})
         if(responseJson.status === 'Success')
         {
        
   
          let pic = responseJson['data'][0]['pic']
          let pin = responseJson['data'][0]['pin']
          console.warn(pic,pin)

 await AsyncStorage.setItem('pic',pic)
 await AsyncStorage.setItem('pin',pin)
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


    // FetchData = async() =>{
  
    //   const {userid} = this.state
    
    //           let formdata = new FormData();
              
    //           formdata.append("uid",userid);
    //           await fetch('https://www.markupdesigns.org/paypa/api/viewProfile', {
            
    //             method: 'POST',
    //             headers: {
    //              'Content-Type': 'multipart/form-data',
    //             },
      
    //             body: formdata
    //           }).then((response) => response.json())
    //                 .then((responseJson) => {
                  
    //                   if(responseJson.status ==="Failure"){
    //                     console.warn("dfd",responseJson)
               
    //                   }
    //                   else{
    //                     console.log("data",JSON.stringify(responseJson))
    //                     let fetchData= responseJson['data']['Listing'][0];
                     
    //                     this.setState({mainLoader:false, fname:fetchData.fname,lname:fetchData.sname,email:fetchData.email,isVisible:true,Cmail:fetchData.email,pic:fetchData.pic})
                       
                    
    //                 } 
    //                 }).catch((error) => {
    //                   console.error(error);
    //                 });
             
    //         }

    render(){
     
     
  return (
   
 <Container style = {{flex:1,backgroundColor:'#e8edf1',}}>
    <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
          <Left style ={{flex:1}}> 
          <Icon name='md-arrow-back'  style={{color:'white',fontSize:22,paddingLeft:10}} onPress = {()=>  this.props.navigation.goBack()}/>
          </Left>
          <Body  style ={{flex:1,alignItems:'center'}}>
          <Text style = {{color:'white',fontSize:18,fontFamily:''}}> Profile </Text>
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
 
 
                    {this.state.msg?<Text style={styles.Alert_Title}>Note </Text>:<Text style={styles.Alert_Title}>Registration Successfull </Text>}
 
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

<Thumbnail large source={this.state.pic?{uri:"https://www.markupdesigns.org/paypa/" +this.state.pic}:this.state.pic2 ===""?require('../../img/common/profile.png'):{uri:this.state.pic2}}  /></TouchableOpacity>

<Text></Text>

<Item  regular style ={styles.InputItem} >

     <Input placeholder='First Name' placeholderTextColor="#797b7d" 
     style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15,opacity:0.7}} 
     value = {this.state.fname}
     editable = {false}
     onChangeText={(fname)=>this.setState({fname})}
     
     />
          </Item>

          <Mytext></Mytext>
          
          <Item  regular style ={styles.InputItem} >

     <Input placeholder='Surname' placeholderTextColor="#797b7d" 
      onChangeText={(lname)=>this.setState({lname})}
      value = {this.state.lname}
      editable = {false}
     style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15,opacity:0.7}} />
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
<Item  regular style ={styles.InputItem} >

<Input placeholder='Pin' placeholderTextColor="#797b7d" 
 onChangeText={(pin)=>this.setState({pin})}
 value = {this.state.pin}
 secureTextEntry={true}
            keyboardType="numeric" maxLength={5} 
style = {{color:'#797b7d',fontFamily: 'Roboto-Light',fontSize:15}} />
     </Item>

    <Text></Text>
    <Button block  onPress= {this.submitData} style = {{
color:'#dce0e6',backgroundColor:'#e46c0b',width:'90%',justifyContent:'center',alignItems:'center',alignSelf:'center',}}>
{this.state.loading?<ActivityIndicator
               animating = {this.state.loading}
               color = 'white'
               size={"large"}
               style ={{paddingHorizontal:50,alignItems:'center',width:'100%'}}
              />: 
              <Text style = {{color:'white',fontFamily:'Roborto ',fontSize:18,fontWeight:'800',padding:15}}>Submit</Text>}
            </Button>
</Content>
</ScrollView>


         
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


