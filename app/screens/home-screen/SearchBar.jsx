import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import colors from '@/app/utils/colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function SearchBar({searchedLocation}) {
    return (
        <View style={{
            display:'flex',
            flexDirection:'row',
            marginTop:15,
            paddingHorizontal:10,
            backgroundColor:colors.white,
            borderRadius:6
        }}>
            <FontAwesome6 name="location-dot" size={24} color={colors.grey} style={{paddingTop:10}}/>
            <GooglePlacesAutocomplete
                placeholder='Search EV Charge Station'
                fetchDetails={true} //to fetch lat and long of the places as well
                onPress={(data, details) => {
                     // call the function defined in HomeScreen
                    searchedLocation({
                        latitude: details?.geometry?.location.lat,
                        longitude: details?.geometry?.location.lng,
                      });
                }}
                query={{
                    key: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY,
                    language: 'en',
                }}
            />
        </View>
    );
}