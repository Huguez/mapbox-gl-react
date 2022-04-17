import { createContext } from "react";

export interface PlacesConextProps {
   isLoading:  boolean;
   userLocation?: [ number, number ];   
}


export const PlacesContext = createContext<PlacesConextProps>( {} as PlacesConextProps )