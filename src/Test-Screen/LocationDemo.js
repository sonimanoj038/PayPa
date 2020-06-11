import React, {Component} from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default class LocationDemo extends Component {
        constructor(props) {
                super(props);
                this.state = {
                    address:null,
                    lat:null,
                    lng:null,
                }
            }

     getAdd(data){
        console.log("add",data);
        this.setState(
            {
              address: data.formatted_address, // selected address
              lat: data.geometry.location.lat,//  selected coordinates latitude
              lng:data.geometry.location.lng, //  selected coordinates longitute

            }
          );
       console.log("this.state.address",this.state.address); ///to console address
       console.log("this.state.coordinates",this.state.lat,this.state.lng); /// to console coordinates

    }


  render(){

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            fetchDetails={true}
            returnKeyType={'default'}
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true

              var data = details;
              this.getAdd(data);
            }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyCkuCCndhl7YDUKBZvhX9N5yubGNC_LdjU',
              language: 'en',
              types: 'geocode', // default: 'geocode'
            }}
            enablePoweredByContainer={false}
            listViewDisplayed={this.state.showPlacesList}
            textInputProps={{
              onFocus: () => this.setState({ showPlacesList: true }),
              onBlur: () => this.setState({ showPlacesList: false }),
            }}
            styles={{
                
                textInputContainer: {
                  width: '100%'
                },
                description: {
                  fontWeight: 'bold'
                },
                predefinedPlacesDescription: {
                  color: '#1faadb'
                }
              }}

            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            // predefinedPlaces={[]}

            predefinedPlacesAlwaysVisible={true}
          />

            </View>

            { this.state.address !=null ?(
            <View style={styles.container2}>
            <Text>
                Address: {this.state.address}
            </Text>
            </View>
            ):null }
            </View>

  );
}
}

const styles = StyleSheet.create({
  container: {
  width: '100%',
height: '100%',

  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
color:'black',
  },
  instructions: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
  },
top: {
height: '50%',
justifyContent: 'center',
    alignItems: 'center',
  },

container2: {
   height:'75%',
   justifyContent: 'center',
  },
buttonContainer: {
alignItems: 'center',
    backgroundColor: 'rgba(255, 255,255, 0.5)',
    padding: 1,
    margin: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#0B0B3B'

     },
textoboton: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    fontSize: 12

  },

})    
