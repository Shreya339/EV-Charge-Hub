import { View, Text, FlatList } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import PlaceListItem from './PlaceListItem.jsx'
import { SelectedMarkerContext } from '@/app/contexts/SelectedMarkerContext.jsx';
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useUser } from '@clerk/clerk-expo';
import {app} from '../../utils/FirebaseConfig.js'

export default function PlacesListView({ placeList }) { //receiving placeList as a prop

  const { selectedMarker, setSelectedMarker } = useContext(SelectedMarkerContext);
  const [favList, setFavList] = useState([]);
  console.log("***", placeList);


  /* ======== on selection of a marker, scroll the place list to the respective item ========== */
  const flatListRef = useRef(null); // Create a reference to the FlatList

  useEffect(() => {
    if (selectedMarker !== undefined && flatListRef.current) {
      if (selectedMarker >= 0 && selectedMarker < placeList.length)
        placeList && flatListRef.current.scrollToIndex({ index: selectedMarker, animated: true });
    }
  }, [selectedMarker]);


  /* ========== Getting data from Firestore ============ */

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // user info
  const { user } = useUser();

  const getFav = async () => {
    setFavList([])
    const q = query(collection(db, "ev-favourite-item"), where("email", "==", user?.primaryEmailAddress?.emailAddress));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());

      //save results to favList one by one in for each loop
      setFavList(favList => [...favList, doc.data()])
    });

  }

  useEffect(() => {
    user && getFav()
  }, [user]) //executes whenever user data is available and gets changed

  /* ======== Check if item is a Fav or not ======== */

  const isFav = (place) =>{  
  // Check if the place's id exists in the favList
  const result = favList.some(item => item.place.id === place.id);
  return result;
  }

  return (
    <View>
      <FlatList
        ref={flatListRef}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        data={placeList}
        renderItem={({ item, index }) => (
          <View key={index}>
            <PlaceListItem place={item}
              isFav = {isFav(item)} 
              updateFav = {() => getFav()} //we are passing the function itself as a prop
            />
          </View>
        )} />
    </View>
  )
}