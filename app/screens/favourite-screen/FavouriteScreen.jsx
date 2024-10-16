import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '@/app/utils/colors'
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useUser } from '@clerk/clerk-expo';
import { app } from '../../utils/FirebaseConfig.js'
import PlaceListItem from '../home-screen/PlaceListItem';

export default function FavouriteScreen() {

  const [favList, setFavList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  /* ========== Getting data from Firestore ============ */

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // user info
  const { user } = useUser();

  const getFav = async () => {
    setLoading(true);
    setFavList([])
    const q = query(collection(db, "ev-favourite-item"), where("email", "==", user?.primaryEmailAddress?.emailAddress));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());

      //save results to favList one by one in for each loop
      setFavList(favList => [...favList, doc.data()])
      setLoading(false)
    });
  }

  useEffect(() => {
    user && getFav()
  }, [user]) //executes whenever user data is available and gets changed

  return (
    <View>
      <Text style={{padding:10, marginTop:10, fontFamily:'outfit-medium', fontSize:25, color: colors.primary}}>My Favourites</Text>
      {!favList ? <View style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator
          size={'large'} color={colors.primary} />
        <Text style={{ fontFamily: 'outfit', marginTop: 15, color: colors.black }}>Loading...</Text>
      </View> : null}

      <View style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom:200 }}>
        
        <FlatList data={favList}
        onRefresh={() => getFav()}
        refreshing={isLoading}
          renderItem={({ item, index }) => (
            <PlaceListItem place={item.place} isFav={true} updateFav={ ()=> getFav()}/>
          )}></FlatList>

      </View>
    </View>
  )
}