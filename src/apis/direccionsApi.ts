import axios from "axios";

export  const direccionsApi = axios.create( {
   baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving/",
   params: {
      alternatives: false,
      geometries:   "geojson",
      language:     "en",
      overview:     "simplified",
      steps:        true,
      access_token: 'pk.eyJ1IjoiaHVndWV6IiwiYSI6ImNsMjMyMHZpdzE2YjUzam1qdGJ3dzJmdmUifQ.SSn9uQNLZFktRQreo7-u4g'
   }
} )

export default direccionsApi;