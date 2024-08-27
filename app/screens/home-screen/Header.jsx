import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Header() {
    const { user } = useUser();
    return (
        <View
            style={styles.container}>
            <Image source={{ uri: user?.imageUrl }}
                style={{ width: 45, height: 45, borderRadius: 99 }} />
            <Image source={require('../../../assets/images/Logo-new.png')} 
                style={{ width: 200, height: 50, objectFit:'contain' }} />
            <FontAwesome name="filter" size={24} color="black" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    }
  });