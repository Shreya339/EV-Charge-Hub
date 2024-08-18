import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import profileScreen from '../screens/profile-screen/ProfileScreen';
import homeScreen from '../screens/home-screen/HomeScreen';
import favouriteScreen from '../screens/favourite-screen/FavouriteScreen';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import colors from '../utils/colors';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>

      <Tab.Screen name="Home" component={homeScreen} 
          options={{
            tabBarLabel:"Search",
            tabBarActiveTintColor: colors.primary,
            tabBarIcon:({color, size})=>(
              <FontAwesome6 name="searchengin" size={size} color={color} />
            )
          }}/>

      <Tab.Screen name="Favourites" component={favouriteScreen} 
          options={{
            tabBarLabel:"Favourites",
            tabBarActiveTintColor: colors.primary,
            tabBarIcon:({color, size})=>(
              <Fontisto name="heart" size={size} color={color} />
            )
          }}/>

      <Tab.Screen name="Profile" component={profileScreen} 
          options={{
            tabBarLabel:"Profile",
            tabBarActiveTintColor: colors.primary,
            tabBarIcon:({color, size})=>(
              <FontAwesome name="user-circle" size={size} color={color} />
            )
          }}/>
    </Tab.Navigator>
  )
}