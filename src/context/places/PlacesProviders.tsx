import { useEffect, useReducer } from "react";
import { PlacesContext, placesReducer } from "../"
import { getUserLocation } from "../../helpers";

export interface PlacesState {
   isLoading: boolean;
   userLocation?: [ number, number ] | undefined;
}

export interface PlacesProvidersProps {
   children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE:PlacesState = {
   isLoading : true,
   userLocation: undefined
}

export const PlacesProvider = ( { children } : PlacesProvidersProps ) => {

   const [ state, dispatch ] = useReducer( placesReducer, INITIAL_STATE )

   useEffect( () => {
      getUserLocation().then( ( resp ) => {
         dispatch( { type: "setUserLocation", payload: resp } )
      } ).catch( err => console.log( "PlacesProvider: ", err ) )
   }, [] )
   
   
   return (
      <PlacesContext.Provider value={ { ...state } }>
         { children }
      </PlacesContext.Provider>
   )
}
