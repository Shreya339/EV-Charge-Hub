import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import { Marker } from 'react-native-maps'
import { SelectedMarkerContext } from '../../contexts/SelectedMarkerContext.jsx';

export default function Markers({index, place}) { //'place' props will be passed

  const { selectedMarker, setSelectedMarker } = useContext(SelectedMarkerContext); 

  return place && (
    <View>
      <Marker style={{width:'auto', height: 80}}
          coordinate={{
            latitude: place?.location?.latitude,
            longitude: place?.location?.longitude
          }}
          onPress={()=> {setSelectedMarker(index); console.log("index is"+index);}}
          >
            <Image 
                 source={
                  selectedMarker === index
                    ? require("../../../assets/images/EV-Marker-Selected.png")
                    : require("../../../assets/images/EV-Marker.png")
                }
                style={{width:80, height:60 }}
                resizeMode="contain"/>
        </Marker>
    </View>
  )
}