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
  Alert,FlatList,BackHandler,ImageBackground
} from 'react-native';


import ImagePicker from 'react-native-image-crop-picker';
import { Container, Radio,Right,Text, Left,Input,Item ,Button,ActionSheet, Footer,Header,Body,Title, Content,CheckBox, ListItem} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

  
  var BUTTONS = [ 
  { text: "Discard Post", icon: "trash", iconColor: "#fa213b" },
  { text: "Continue Edit", icon: "close", iconColor: "#25de5b"  }];
  var DESTRUCTIVE_INDEX = 3;
  var CANCEL_INDEX = 4;
export default class UAddPost extends React.Component {

  
    constructor(props){

        super(props);
   
    this.state ={

term:false,
images:[],
staticimg:[ {

    "first": require('../../img/business/1.jpg'),
    "2": require('../../img/business/2.jpg'),
    "3": require('../../img/business/3.png')
}]
    }
}

componentWillMount() {
  this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
}

componentWillUnmount() {
  this.backHandler.remove()
}

goBack = ()=>{

  ActionSheet.show(
    {
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      
    },
    buttonIndex => {
      this.setState({ click: BUTTONS[buttonIndex] }, ()=>{
        if(buttonIndex == '0'){
          this.backHandler.remove()
         this.props.navigation.goBack(null);
         
        }
      });
    
      
      
    }
  )}


handleBackPress = () => {
  this.goBack()
  return true
}
getImage = ()=>{


    ImagePicker.openPicker({
       cropping: true,
        multiple: true,
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        freeStyleCropEnabled :true
      }).then(image => {
         
          let source = Object.values(image);
         
         this.setState({images:[...this.state.images,...source]})
        //  
        // for (var i = 0; i < image.length; i++) {
           //  this.state.images.push(image[i].path)//image[i].data=>base64 string
         // }
          
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


    render(){

     
  return (
   
 <Container style ={{backgroundColor:'#e8edf1'}} >
    <Header  style={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478"/>
        <Text style = {{alignSelf:'center',color:'white',fontSize:18,fontFamily:'Roboto-Medium'}}>Create Post </Text>
        </Header>
        <Text>
            <Text></Text>
        </Text>
 <Content style = {{paddingHorizontal:10}}>

 <Item regular>
            <Input placeholder='Write your post..' style={{backgroundColor:'white'}} />
            <TouchableOpacity style = {{backgroundColor:'#e46c0b',padding:9}} onPress = {this.getImage}>
            <Icon name="md-camera" style={{ color:'white',fontSize:30, }} />
            </TouchableOpacity>
            
          </Item>
<Text></Text>
   <FlatList
          data={this.state.images}
          renderItem={({ item,index }) => (
            <View style={{  flex:1,padding:2 }}>
              <TouchableOpacity onPress={()=>{this.deleteItem(index)}} style = {{backgroundColor:'white',borderRadius:50,width:18,height:18,alignContent:'flex-end',alignItems:'flex-end',}}>
                  <Icon name = "md-close"style={{ fontSize:15,color:'black',borderRadius:20,paddingHorizontal:5}} /></TouchableOpacity>
               {/* <Image name="md-close" source={require('../../img/logo/logo.png')} style={{ height:40, width:40, backgroundColor:'#FF0000'}} onPress={()=>{this.deleteItem(index)}}/> */}
              <ImageBackground style={styles.imageThumbnail} source={{ uri: item.path }} />

             
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          extraData={this.state.images}
          keyExtractor={(item, index) => index.toString()}
        />
    
   

 </Content>



 <Footer style = {{
// @ts-ignore
color:'#dce0e6',
  backgroundColor:'#e46c0b'}}>
<TouchableWithoutFeedback onPress= {()=>Alert.alert("hello")}>
            <Text style = {{color:'white',fontFamily:'Roborto ',fontSize:18,fontWeight:'800',padding:15}}>SUBMIT POST</Text>
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
    zIndex: 5,
    borderColor:'black',
    borderWidth:1,
    resizeMode:'contain'
    
  },
});


