import { useEffect, useReducer } from "react";
import { PlacesContext, placesReducer } from "../"
import { getUserLocation } from "../../helpers";
import searchApi from '../../apis/searchApi';
import { Feature, PlacesResponse } from '../../interfaces/interfaces';

export interface PlacesState {
   isLoading: boolean;
   userLocation?: [ number, number ] | undefined;
   isLoadingPlaces: boolean;
   places: Feature[];
}

export interface PlacesProvidersProps {
   children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE:PlacesState = {
   isLoading:       true,
   userLocation:    undefined,
   isLoadingPlaces: false,
   places:          [],
}

export const PlacesProvider = ( { children } : PlacesProvidersProps ) => {

   const [ state, dispatch ] = useReducer( placesReducer, INITIAL_STATE )

   useEffect( () => {
      getUserLocation().then( ( resp ) => {
         dispatch( { type: "setUserLocation", payload: resp } )
      } ).catch( err => console.log( "PlacesProvider: ", err ) )
   }, [] )

   const searchPlaceByTerm = async ( query:string ) : Promise<Feature[]> => {
      
      dispatch( { type: "setLoadingPlaces" } )
      
      if( query === '' ) {
         dispatch( { type: "setPlaces", payload: [] } )
         return [];
      }
      
      if( !state.userLocation ) throw new Error("No hay ubicacion del usuario!!");
      
      const resp = await searchApi.get<PlacesResponse>( `${ query }.json`, {
         params:{
            proximity: state.userLocation.join(',')
         }
      } )

      dispatch( { type: "setPlaces", payload: resp.data.features } )
      return resp.data.features;
   }
   
   
   return (
      <PlacesContext.Provider value={ { ...state, searchPlaceByTerm } }>
         { children }
      </PlacesContext.Provider>
   )
}
