import React, { Component } from 'react';
import {
    View,
  
    StyleSheet,
    Image,TouchableOpacity ,FlatList,ActivityIndicator,StatusBar,Dimensions,ImageBackground
  } from "react-native";
  import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Header, Content, List, ListItem, Thumbnail, Text,Card,CardItem, Left, Body, Right, Button } from 'native-base';
export default class ShowTimelineImage extends Component {

    constructor(props){

        super(props);
   
    this.state ={

term:false,
payments:[],loading:true,
myBalance:'0',
reachEnd:false,page:'1',
refreshing:false,
showDefault:true
    }
}


  render() {
     let  images = this.props.navigation.state.params.images;
     let finalImg = images.split(",")
  
     console.warn(finalImg)
    return (
      <Container>
        <Header  style ={{backgroundColor:'#1c4478'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4478" />
      <Text style = {{alignSelf:'center',color:'white',fontSize:20, fontFamily:'Roboto-Medium'}}>PayPa </Text>
        
       
            </Header>
        <Content style ={{}}>

        {/* <FlatList
            data={this.state.payments}
            // ItemSeparatorComponent={this.FlatListItemSeparator}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
            // onEndReachedThreshold={20}
            ListFooterComponent={<ActivityIndicator
              animating={this.state.reachEnd}
              color='#1c4478'
              size={"large"}
            />}
            renderItem = {({item})=>
            <List>
           
            <ListItem noBorder >
          
                              <Left>
                              <TouchableOpacity onPress={()=>{this.openDetails(item)}}>
                                <View style={{flexDirection:'column'}}> 
              <Text style ={{fontSize:13}}>{item.name}</Text>
                              <Text style ={{fontSize:11,color:'grey'}}>{Moment(item.is_created).format('MM, YYYY H:mma')}</Text>
                               </View>
                              
                               </TouchableOpacity>
                               </Left>
                               <Right>
                               <TouchableOpacity onPress={()=>{this.openDetails(item)}}>
               <Text style={{color:'#1c4478'}}>R{item.amount}</Text>
               </TouchableOpacity>
                              </Right>
                              
                            </ListItem>
                            
            </List>

  }

            /> */}
 {finalImg.map(element=> {
    return(  <List >
        <ListItem  noBorder>
            <Body >
      
           
                
   <Image  loadingIndicatorSource ={require('../../img/common/defaultImg.png')} onLoadEnd={() => this.setState({showDefault: false})} source={this.state.showDefault?require('../../img/common/defaultImg.png'):{ uri: "https://www.markupdesigns.org/paypa/" +element}} style={{ height:250,resizeMode:'cover' }} />
  
       
            </Body>
            </ListItem>
            </List>)
   
}) 

}
          
        </Content>
      </Container>
    );
}
}