import { createContext } from "react";
import { Feature } from "../../interfaces/interfaces";

export interface PlacesConextProps {
   isLoading:  boolean;
   userLocation?: [ number, number ];
   searchPlaceByTerm: ( query:string ) => Promise<Feature[]>;
   places: Feature[];
   isLoadingPlaces: boolean;
}


export const PlacesContext = createContext<PlacesConextProps>( {} as PlacesConextProps )