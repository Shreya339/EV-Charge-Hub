import { Text, View, StyleSheet, Image } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "./screens/login-screen/LoginScreen.jsx";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ClerkProvider, ClerkLoaded, SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import * as SecureStore from "expo-secure-store";
import { Link } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./navigations/TabNavigation.jsx";
import * as Location from 'expo-location';
import { UserLocationContext } from "./contexts/UserLocationContext.jsx";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Index() {

  //load google font
  const [loaded, error] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-SemiBold.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
  });

  //expo api key
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
  }

  //user token
  const tokenCache = {
    async getToken(key) {
      try {
        return await SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key, value) {
      try {
        return await SecureStore.setItemAsync(key, value);
      } catch (err) {
        //return null;
      }
    },
  };

  // get user location on app launch
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);


  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={publishableKey}>
      <ClerkLoaded>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <UserLocationContext.Provider value={{ location, setLocation }}>
            <View style={styles.container}>
              <SignedIn>
                <TabNavigation />
              </SignedIn>
              <SignedOut>
                <LoginScreen />
              </SignedOut>
            </View>
          </UserLocationContext.Provider>
        </GestureHandlerRootView>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});