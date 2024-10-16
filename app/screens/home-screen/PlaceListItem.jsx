import { View, Text, Image, Dimensions, Pressable, ToastAndroid, Platform, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '@/app/utils/colors'
import { LinearGradient } from 'expo-linear-gradient';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { query, doc, getFirestore, setDoc, where, getDocs, collection, deleteDoc } from "firebase/firestore";
import { useUser } from '@clerk/clerk-expo';
import { app } from '../../utils/FirebaseConfig.js';

export default function PlaceListItem({ place, isFav: initialIsFav, updateFav }) { //receiving place as a prop

  // user info
  const { user } = useUser();

  const [isFav, setIsFav] = useState(initialIsFav); // Initialize state

  // we have initialized 'Firebase' with app in firebaseConfig.js
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  /* ======== Function to handle the favorite toggle ======== */
  const handleFavToggle = () => {

    isFav ? removeFav(place) : setFavourite(place);

    // Update the local state
    setIsFav((isFav) => !isFav);
  };

  /* ======== On click, set item as favourite ======= */
  const setFavourite = async (place) => {
    // Add a new document in collection "cities"
    const docId = `${place?.id}_${user?.primaryEmailAddress?.emailAddress}`;
    await setDoc(doc(db, "ev-favourite-item", docId), {
      place: place,
      email: user?.primaryEmailAddress?.emailAddress
    });
    ToastAndroid.show("Added to Favourites!", ToastAndroid.TOP);
    // get updated data from firebase after adding the item as fav
    updateFav();
  }

  /* ========= On click, remove item from favourite ======== */
  const removeFav = async () => {
    try {
      const q = query(
        collection(db, "ev-favourite-item"),
        where("place.id", "==", place?.id),
        where("email", "==", user?.primaryEmailAddress?.emailAddress)
      );

      const docId = `${place?.id}_${user?.primaryEmailAddress?.emailAddress}`;
      const docRef = doc(db, "ev-favourite-item", docId);

      await deleteDoc(docRef);
      ToastAndroid.show("Removed from Favourites", ToastAndroid.TOP);

      // get updated data from firebase after adding the item as fav
      updateFav();

      setIsFav(false); // Update state after deletion

    } catch (error) {
      console.log(error);
      ToastAndroid.show("Error removing from favourites ", ToastAndroid.TOP);
    }
  }

  useEffect(() => {
    setIsFav(initialIsFav);
  }, [initialIsFav]);

  /* ======= Function to get directions ======= */
  const onDirectionClick = async () => {
    const url = Platform.select({
      ios:"maps:"+place?.location?.latitude+","+place?.location?.longitude+"?q="+place?.formattedAddress,
      android:"geo:"+place?.location?.latitude+","+place?.location?.longitude+"?q="+place?.formattedAddress
    });

    Linking.openURL(url);
  }


  const photoBaseURL = 'https://places.googleapis.com/v1/'
  const APIKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY;

  return (
    <View
      style={{
        width: Dimensions.get('screen').width * 0.9,
        backgroundColor: colors.white,
        margin: 5,
        borderRadius: 10
      }}>

      <LinearGradient
        // Background Linear Gradient
        colors={['transparent', '#ffffff', '#ffffff']} >

        <Pressable style={{ position: 'absolute', right: 0, margin: 5 }}
          onPress={handleFavToggle} >
          {isFav ? <Ionicons name="heart-sharp" size={30} color="red" /> : <Ionicons name="heart-outline" size={30} color="white" />}
        </Pressable>

        <Image
          source={
            place?.photos?.[0] ?
              { uri: `${photoBaseURL}${place?.photos?.[0]?.name}/media?key=${APIKey}&maxHeightPx=800&maxWidthPx=1200` }
              : require('./../../../assets/images/EV-Charge-Station.png')}
          style={{ width: '100%', borderRadius: 10, height: 180, zIndex: -1 }}
        />

        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 23, fontFamily: 'outfit-medium' }}>
            {place?.displayName?.text}
          </Text>
          <Text style={{ color: colors.grey, fontFamily: 'outfit' }}>
            {place?.shortFormattedAddress}
          </Text>

          <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ color: colors.grey, fontSize: 17, fontFamily: 'outfit' }}>
                Connectors
              </Text>
              <Text style={{ marginTop: 2, fontSize: 20, fontFamily: 'outfit-medium' }}>
                {place?.evChargeOptions?.connectorCount || '-'} Points
              </Text>
            </View>

            <Pressable
              onPress={()=> onDirectionClick()}>
              <View style={{ padding: 12, backgroundColor: colors.primary, borderRadius: 6, paddingHorizontal: 14 }}>
                <Feather name="navigation" size={25} color="white" />
              </View>
            </Pressable>
          </View>

        </View>

      </LinearGradient>
    </View>
  )
}