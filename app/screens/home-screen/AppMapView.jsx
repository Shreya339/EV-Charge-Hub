import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import MapStyle from '../../utils/MapStyle.json';
import { UserLocationContext } from '../../contexts/UserLocationContext.jsx'
import Markers from'./Markers.jsx'

export default function AppMapView({placeList}) {

  const { location, setLocation } = useContext(UserLocationContext);

  //render map only if location is not null
  return location?.latitude && (
    <View>
      {/* map */}
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapStyle}
        region={{
          latitude: location?.latitude,
          longitude: location?.longitude,
          latitudeDelta: 0.0522, // zoom factor
          longitudeDelta: 0.0521
        }}>

        {/* user location marker */}
        { location && <Marker
          coordinate={{
            latitude: location?.latitude,
            longitude: location?.longitude
          }}>
            <Image source={require("../../../assets/images/Car-Marker.png")}
                style={{width:30, height:60}}/>
        </Marker> }

        {/* EV charge station marker */}
        {placeList && placeList.map((item, index) => (
          <Markers key={index} place={item} index={index}/>
        ))}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});