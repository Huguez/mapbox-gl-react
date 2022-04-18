import { useContext, useState } from "react"
import { MapContext, PlacesContext } from "../context"
import { Feature } from "../interfaces/interfaces";
import { Loading } from './Loading';

export const SearchResults = () => {
   const { places, isLoadingPlaces, userLocation } = useContext( PlacesContext )
   const { map, getRouteBetweenPoints } = useContext( MapContext )
   const [ active, setActive ] = useState( '' )

   if( isLoadingPlaces && places.length === 0 ){
      return <Loading/>;
   }

   const getRoute = ( place: Feature ) => {
      if( !userLocation ) return;

      const [ lng, lat ] = place.center

      getRouteBetweenPoints( userLocation, [ lng, lat ] )
   }

   const click = ( place:Feature ) => {
      const [ lng, lat ] = place.center
      
      setActive( place.id )

      map?.flyTo( {
         zoom: 10, 
         center: [ lng, lat ]
      } )
   }
   
   return (
      <>
      { places.length > 0 &&
         <ul className="list-group mt-3"  style={{ overflow: "auto", maxHeight: "70vh",  width: "100%" }}>
            {
               places.map( ( place, index ) => (
                  <li onClick={ () => click( place ) } key={ index } className={` ${ active === place.id && "active" } list-group-item list-group-item-action pointer`} > 
                     <h6> { place.text } </h6>
                     
                     <p className={` ${ active === place.id ? "text-white" : "text-muted" } `} style={{fontSize: "12px"}}> { place.place_name } </p>

                     <button onClick={ ( ) => getRoute( place ) } className={`btn ${ active === place.id ? "btn-secondary" : "btn-primary" } btn-sm`}> ir a la ubicación </button>
                  </li>
               ) )
            }
         </ul>
      }
   </>
   )
}
