// @ts-nocheck
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  StatusBar,Image,
  TouchableWithoutFeedback,
  Alert,FlatList,BackHandler,ImageBackground,ActivityIndicator,ProgressBarAndroid,Modal, TouchableNativeFeedbackBase
} from 'react-native';
import { StackActions,NavigationActions ,withNavigationFocus} from 'react-navigation';

import ImagePicker from 'react-native-image-crop-picker';
import { Container, Radio,Right,Text, Left,Input,Item ,Button,ActionSheet, Footer,Header,Body,Title, Content,CheckBox, ListItem} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {toastr} from '../../Common/Screens/LoginScreen'
  var BUTTONS = [ 
  { text: "Discard Post", icon: "trash", iconColor: "#fa213b" },
  { text: "Continue Edit", icon: "close", iconColor: "#25de5b"  }];
  var DESTRUCTIVE_INDEX = 3;
  var CANCEL_INDEX = 4;
 class EditPost extends React.Component {

  
    constructor(props){

        super(props);
   
    this.state ={
loading:false,
message:this.props.navigation.state.params.data.message,
progress:null,
images:[],imagesUpload:[],
userid:'',timeline_id:'',
progress_Visibility:false,
removeItems:[],
editdata: this.props.navigation.state.params.data,
staticimg:[ {


    "first": require('../../img/business/1.jpg'),
    "2": require('../../img/business/2.jpg'),
    "3": require('../../img/business/3.png')
}]
    }
  
}


validateInput = ()=>{
  const {message }  = this.state ;
 
if( message ===""){

  toastr.showToast("Write Your Post")
return false
}
else
this.setState({progress_Visibility:true})
return true;
}




componentDidMount = async() => {
 
  const value = await AsyncStorage.getItem('uid')
  let  images = this.props.navigation.state.params.data.files;
  let timeline_id =   this.props.navigation.state.params.data.id;
  let finalImg = images.split(",")

  this.setState({userid:value,imagesUpload:finalImg,timeline_id:timeline_id})
 
  //Checking for the permission just after component loaded
  
}
 
getImage = ()=>{


    ImagePicker.openPicker({
       
        multiple: true,
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
      }).then(image => {
         console.log(JSON.stringify(image))
        this.setState({images:[...this.state.images,...image]})
         for (var i = 0; i < image.length; i++) {
          this.state.imagesUpload.push(image[i].path)
      }
          
        })

       
    }
    deleteItem = (e)=>{
      var array = [...this.state.images]; // make a separate copy of the array
      var index = e
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({
          images: array
        });
      }
    //   console.warn(item.path)
    //  let final =this.state.images.filter(data=> data.path item.path)
    

    }

    upload = ()=>{
      const {message }  = this.state ;
      const {progress} = this.state
      const {userid} = this.state
    
    
        
        let formdata = new FormData();
        formdata.append("uid",userid);
       
        formdata.append("message",message);
        formdata.append("timeline_id", this.props.navigation.state.params.data.id);
       this.state.images.forEach((element, i) => {
    
          const newFile = {
            uri: element.path, type: element.mime,
            name:element.mime.split("/")[1]==='png'?'images.png':'images.jpg'
          }
          formdata.append('file[]', newFile)
        });
       
      var xhr = new XMLHttpRequest();
     
      return new Promise((resolve, reject) => {
        xhr.upload.onprogress  = (e)=> {
     
          var progress = Math.ceil((e.loaded / e.total) * 100);
          this.setState({progress})
      }
     
     xhr.onreadystatechange = function(e) {
      if (xhr.readyState == XMLHttpRequest.DONE){
          let data = JSON.parse(xhr.responseText);
          resolve(data)
      }
      
  }
  xhr.open('POST', 'https://www.markupdesigns.org/paypa/api/editTimeline',true);
  xhr.setRequestHeader('Content-Type', 'multipart/form-data');
  xhr.send(formdata)
    })
 
}
    submitData = async()=>{
      if(this.validateInput()){
      
      await this.upload().then((res)=>{
      this.RemoveOnSubmit();
        console.warn(res)
        this.setState({data:res,progress_Visibility:false})}).catch((error)=> {
          console.log(error);
      })
      
      this.props.navigation.navigate('Business')
        
    
    }
  }

  RemoveOnSubmit = async()=>{
    let formdata = new FormData();
    formdata.append("uid",this.state.userid);
    formdata.append("timeline_id",this.state.timeline_id);
    this.state.removeItems.forEach((element, i) => {

      formdata.append('filePath',element);
    });
   
    await fetch('https://www.markupdesigns.org/paypa/api/removeTimeLineFile', {
  
      method: 'POST',
      headers: {
       'Content-Type': 'multipart/form-data',
      },

      body: formdata
    }).then((response) => response.json())
                  .then((responseJson) => {
                console.warn(responseJson)
                    
                  });
          }


  RemovePic = async(e,item) =>{
    var array = [...this.state.imagesUpload]; // make a separate copy of the array
    var index = e
    var item = array[e];
    this.state.removeItems.push(item)
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({
        imagesUpload: array
      });
      console.log(this.state.removeItems)
    }
  }
    render(){
      
    
  return (
   
 <Container style ={{backgroundColor:'#e8edf1'}} >
    <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
        <Text style = {{alignSelf:'center',color:'white',fontSize:18,fontFamily:'Roboto-Medium'}}>Edit Post </Text>
        </Header>
        <Text>
            <Text></Text>
        </Text>
        <ScrollView>

        <Modal
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          visible={this.state.progress_Visibility}
          transparent={true}
 
          animationType={"fade"}
 
          onRequestClose={ () => this.setState({Alert_Visibility:!this.state.Alert_Visibility}) } >
 
 
            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0.2, 0.7)'}}>
          {this.state.progress!=100?  
          <View style={{height:'10%',width:'70%'}}>
       
       <Text style={styles.TextStyle}> Uploading... </Text>
  
   <ProgressBarAndroid
   animating={true}
   style ={ [{ scaleX: 1.0 }, { scaleY: 2.5 }]}
             styleAttr="Horizontal"
             color ="white"
             indeterminate={false}
             progress={this.state.progress/100}
           />
  </View>: 
        
        <View style={{height:'10%',width:'70%'}}>
       
            <Text style={styles.TextStyle}> Posting... </Text>
       
        <ProgressBarAndroid
        animating={true}
        style ={ [{ scaleX: 1.0 }, { scaleY: 2.5 }]}
                  styleAttr="Horizontal"
                  color ="white"
                  indeterminate={true}
                 
                />
       </View>}
 
                
               
 </View>
</ Modal >
 <Content style = {{paddingHorizontal:10}}>

 <Item regular>
            <Input placeholder='Write your post..' style={{backgroundColor:'white'}} 
              onChangeText={(message)=>this.setState({message})} 
            value = {this.state.message}
            
            />
            {/* <TouchableOpacity style = {{backgroundColor:'#e46c0b',padding:9}} onPress = {this.getImage}>
            <Icon name="md-camera" style={{ color:'white',fontSize:30, }} />
            </TouchableOpacity> */}
            
          </Item>
          <Text></Text>

        
  {this.state.imagesUpload!= ""? <FlatList
          data={this.state.imagesUpload}
          renderItem={({ item,index }) => (
            <View style={{  flex:1,padding:1 }}>
                <ImageBackground style={styles.imageThumbnail} source={{ uri: "https://www.markupdesigns.org/paypa/" + item}} >
                  <TouchableOpacity onPress={()=>{this.RemovePic(index,item)}} style = {{backgroundColor:'white',borderRadius:50,width:18,height:18,alignContent:'flex-end',alignItems:'flex-end'}}>
                  <Icon name = "md-close"style={{ fontSize:15,color:'black',borderRadius:20,paddingHorizontal:5}} />
       
                  </TouchableOpacity>
                 
</ImageBackground>
                
             <Text>
               
             </Text>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
        //   extraData={this.state.images}
          keyExtractor={(item, index) => index.toString()}
        />
    :null}
    <FlatList
          data={this.state.images}
          renderItem={({ item,index }) => (
            <View style={{  flex:1,padding:1 }}>
                <ImageBackground style={styles.imageThumbnail} source={{ uri: item.path }} >
                  <TouchableOpacity onPress={()=>{this.deleteItem(index)}} style = {{backgroundColor:'white',borderRadius:50,width:18,height:18,alignContent:'flex-end',alignItems:'flex-end'}}>
                  <Icon name = "md-close"style={{ fontSize:15,color:'black',borderRadius:20,paddingHorizontal:5}} />

                  </TouchableOpacity>
              
</ImageBackground>
                
             <Text>
               
             </Text>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          extraData={this.state.images}
          keyExtractor={(item, index) => index.toString()}
        />
    

 </Content>

</ScrollView>

 <Footer style = {{
// @ts-ignore
color:'#dce0e6',
  backgroundColor:'#e46c0b'}}>
    <Text></Text>
<Text></Text>
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
    alignItems:'center',
   
    fontSize:18,
  },
 InputItem:{

  backgroundColor:'white',
  width:'90%',
  borderColor:'white',
alignSelf:'center',
borderRadius:8
 },
 imageThumbnail: {
  flex:1,
    height: 180,
   
    
  },     
  TextStyle:{
      color:'white',
      textAlign:'center',
      fontSize: 23,
      marginTop: -5, fontFamily:'Roboto-Medium'
      
}
});

export default withNavigationFocus(EditPost)
