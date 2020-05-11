
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,Image,
    ImageBackground 
  } from 'react-native';

export default Mytext = (props)=>{

    return  <Text {...props} style={[{fontFamily: 'Roboto-Light'}, props.style]}>{props.children}</Text>
}
