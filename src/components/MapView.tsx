import { useContext, useLayoutEffect, useRef } from 'react';
import { MapContext, PlacesContext } from '../context'
import { Loading } from '.'
import { Map, supported } from 'mapbox-gl'

export const MapView = () => {
   const { isLoading, userLocation } = useContext( PlacesContext )
   const { setMap } = useContext( MapContext )
   
   const mapRef = useRef<HTMLDivElement>(null)

   useLayoutEffect( () => {
      
      if( supported() === true ){
         if( !isLoading ){
            const map = new Map( {
               container: mapRef.current!, // container ID
               style: 'mapbox://styles/mapbox/streets-v11', // style URL
               center: userLocation ||  [-74.5, 40], // starting position [lng, lat]
               zoom: 9 // starting zoom
            } );

            setMap( map )
         }
      }else{
         console.log("No lo Soporta men!!")
      }
   }, [ isLoading ] )


   if( isLoading ){
      return <Loading />
   }

   return (
      <div ref={ mapRef } style={ { backgroundColor: "red", height: "100vh", width: "100vw", position: "fixed", top: 0, left: 0 } } >
         { userLocation?.join( ',' ) }
      </div>
   )
}


