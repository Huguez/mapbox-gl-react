import { MapState } from './MapProvider'
import { Map, Marker } from 'mapbox-gl'

type MapAction = 
| { type: "setMap", payload: Map }
| { type: "removeMarkers" }
| { type: "setMarkers", payload: Marker[] }

export const mapReducer = ( state:any, action : MapAction ):MapState => {
   switch( action.type ){
      case "setMap":
         return { ...state, isMapReady: true, map: action.payload }

      case "setMarkers": 
         return { ...state, markers: action.payload }

      default:
         return state
   }
}
