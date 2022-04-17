import { useReducer } from "react";
import { PlacesContext, placesReducer } from "../"

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
   
   return (
      <PlacesContext.Provider value={ { ...state } }>
         { children }
      </PlacesContext.Provider>
   )
}
