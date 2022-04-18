import { useContext } from "react"
import { PlacesContext } from "../context"
import { Loading } from './Loading';

export const SearchResults = () => {
   const { places, isLoadingPlaces } = useContext( PlacesContext )
   
   if( isLoadingPlaces && places.length === 0 ){
      return <Loading/>;
   }

   
   return (
      <>
      { places.length > 0 &&
         <ul className="list-group mt-3"  style={{ overflow: "auto", maxHeight: "70vh",  width: "100%" }}>
            {
               places.map( ( place, index ) => (
                  <li key={ index } className="list-group-item list-group-item-action"> 
                     <h6> { place.text } </h6>
                     <p className="text-muted" style={{fontSize: "12px"}}> { place.place_name } </p>
                     <button className="btn btn-outline-secondary btn-sm"> Direcciones </button>
                  </li>
               ) )
            }
         </ul>
      }
   </>
   )
}
