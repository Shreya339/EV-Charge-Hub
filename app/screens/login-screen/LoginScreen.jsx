import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../utils/colors';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import GoogleOAuth from './GoogleOAuth.jsx';

export default function LoginScreen() {
  return (
    <View style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70
    }}>

      <Image source={require(`../../../assets/images/Logo-new.png`)}
        style={styles.logoImage}
      />
      <Image source={require(`../../../assets/images/EV-Charge-Station.png`)}
        style={styles.bgImage}
      />

      <View style={{ padding: 20 }}>
        <Text style={styles.heading}>Your Ultimate EV Charging Station Finder App</Text>
        <Text style={styles.desc}>Find EV charging station near you, plan trip and so much more in just one click</Text>
        
        <GoogleOAuth></GoogleOAuth>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logoImage: {
    width: 400,
    height: 100,
    objectFit: 'contain'
  },
  bgImage: {
    width: '100%',
    height: 260,
    marginTop: 10,
    objectFit: 'cover'
  },
  heading: {
    fontSize: 25,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    marginTop: 20
  },
  desc: {
    fontSize: 17,
    fontFamily: 'outfit',
    textAlign: 'center',
    marginTop: 15,
    color: colors.grey,
  }
})
