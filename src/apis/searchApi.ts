import axios from 'axios'

export const searchApi = axios.create( {
   baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
   params: {
      limit : 10,
      language: "es",
      access_token: 'pk.eyJ1IjoiaHVndWV6IiwiYSI6ImNsMjMyMHZpdzE2YjUzam1qdGJ3dzJmdmUifQ.SSn9uQNLZFktRQreo7-u4g'
   },

} )

export default  searchApi;