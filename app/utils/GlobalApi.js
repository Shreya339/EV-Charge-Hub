import axios from "axios";

const BASE_URL="https://places.googleapis.com/v1/places:searchNearby";
const API_KEY=process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY

//API POST request

const config={
    headers:{
        'Content-Type':'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask':[
            'places.displayName', 
            'places.formattedAddress',
            'places.location',
            'places.evChargeOptions',
            'places.photos',
            'places.shortFormattedAddress',
            'places.id'
        ]
    }
}

export default function nearbyPlaceAPI(data){
    return axios.post(BASE_URL, data, config)
}
