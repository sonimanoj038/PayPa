import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,TouchableOpacity 
} from "react-native";

import { Card, CardItem, Thumbnail, Body, Left, Right, Button,ActionSheet } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons';

var BUTTONS = [ { text: "Edit", icon: "create", iconColor: "#ea943b" },
{ text: "Delete", icon: "trash", iconColor: "#fa213b" },
{ text: "Cancel", icon: "close", iconColor: "#25de5b" }];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
class CardComponent extends Component {
    constructor(props){

        super(props);
   
    this.state ={

click:[]
    }
}

    render() {

        const images = {

            "1": require('../../img/business/1.jpg'),
            "2": require('../../img/business/2.jpg'),
            "3": require('../../img/business/3.png')
        }

        return (
            <Card  noShadow={true} style={{ elevation: 0,
                shadowOpacity: 0,borderColor:'transparent'}}>
                <CardItem  style ={{backgroundColor:'#e8edf1',elevation: 0,
                maxHeight:60,borderColor: 'transparent'}}>
                    <Left>
                        <Thumbnail source={require('../../img/business/me.png')} style={{}} />
                        <Body>
                            <Text style= {{fontFamily: 'Roboto-Medium',fontSize:15}}>Varun </Text>
                            <Text note style= {{fontFamily: 'Roboto-Light',fontSize:12}}>Jan 15, 2018</Text>
                        </Body>
                    </Left>
                    <Right>
         <TouchableOpacity onPress={() =>{
       
             ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                
              },
              buttonIndex => {
                this.setState({ click: BUTTONS[buttonIndex] });
               
              }
            )}}
        style={{width:10,}}
            >
               
<Icon name="md-more" style={{ color: '#1c4478',fontSize:25 }}  onPress={() =>{
             
             ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                
              },
              buttonIndex => {
                this.setState({ click: BUTTONS[buttonIndex] });
                
              }
            )}}
        
 />    
 </TouchableOpacity>
                    </Right>
                </CardItem>
                <CardItem>
                    <Body style ={{backgroundColor:'white'}}>
                        <Text>
                            <Text style= {{fontFamily: 'Roboto-Medium',fontSize:15}}>varun
                            </Text>
                            Ea do Lorem occaecat laborum do. Minim ullamco ipsum minim eiusmod dolore cupidatat magna exercitation amet proident qui. Est do irure magna dolor adipisicing do quis labore excepteur. Commodo veniam dolore cupidatat nulla consectetur do nostrud ea cupidatat ullamco labore. Consequat ullamco nulla ullamco minim.
                        </Text>
                    </Body>
                </CardItem>
                <CardItem cardBody>
                    <Image source={images[this.props.imageSource]} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
                <CardItem style={{ height: 45 }}>
                    <Left>
                        <Button transparent >
                            <Icon name="md-thumbs-up" style={{ color: 'grey',fontSize:25,paddingHorizontal:2 }} />
                            <Text  style= {{fontFamily: 'Roboto-Medium',fontSize:15}} >Likes- </Text>
                            <Text style= {{fontFamily: 'Roboto-Medium',fontSize:15}}>{this.props.likes} </Text>
                        </Button>
                        <Text></Text>
                        <Button transparent>
                            <Icon name="md-chatbubbles" style={{ color: 'grey' ,fontSize:25,paddingHorizontal:2}} />
                            <Text style= {{fontFamily: 'Roboto-Medium',fontSize:15}}>Comments- </Text>
                            <Text style= {{fontFamily: 'Roboto-Medium',fontSize:15}}>{this.props.likes} </Text>
                        </Button>
                      
                        </Left>

                    
                </CardItem>

                
               
            </Card>
        );
    }
}
export default CardComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});