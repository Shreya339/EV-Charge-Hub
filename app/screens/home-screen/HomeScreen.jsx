import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppMapView from './AppMapView.jsx';
import Header from './Header.jsx';
import SearchBar from './SearchBar.jsx';
import PlaceListView from './PlacesListView.jsx'
import { UserLocationContext } from '@/app/contexts/UserLocationContext.jsx';
import { SelectedMarkerContext } from '@/app/contexts/SelectedMarkerContext.jsx';
import  nearbyPlaceAPI from '../../utils/GlobalApi.js';

export default function HomeScreen() {

  const { location, setLocation } = useContext(UserLocationContext);

  const [ placeList, setPlaceList ] = useState([]);

  const [ selectedMarker, setSelectedMarker ] = useState([]); //we can initialize the context like this 

  //This useEffect hook runs every time the location value changes.
 // The [] dependency array contains location, so the effect runs whenever location updates.
  useEffect(()=>{
    location && GetNearbyPlace();
  }, [location])

  function GetNearbyPlace() {
    const data = {
      "includedTypes": ["electric_vehicle_charging_station"],
      "maxResultCount": 10,
      "locationRestriction": {
        "circle": {
          "center": {
            "latitude": location?.latitude,
            "longitude": location?.longitude
          },
          "radius": 5000.0
        }
      }
    }

    nearbyPlaceAPI(data).then(resp => {
      console.log(resp.data);
      setPlaceList(resp.data?.places); //set the placelist using hook
    })
    .catch(error => {
      console.error('Error fetching nearby places:', error); // Handles any errors that occur during the API call
    });
  }
  return (
    <SelectedMarkerContext.Provider value={{selectedMarker, setSelectedMarker}}>
    <View>
      <View style={styles.header}>
        <Header></Header>
        {/* <SearchBar searchedLocation={(location) => {console.log(location)} }/> */}
        <SearchBar searchedLocation={setLocation} />
      </View>
      <AppMapView placeList={placeList}></AppMapView>
      <View style={styles.placeListContainer}>
        { placeList && <PlaceListView placeList={placeList}/> }
      </View>
    </View>
    </SelectedMarkerContext.Provider>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 10,
    padding: 10,
    width: '100%',
    paddingHorizontal: 20
  },
  placeListContainer: {
    position:'absolute',
    bottom:0,
    zIndex:10,
    width:'100%'
  }
});