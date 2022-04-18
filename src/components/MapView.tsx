/* eslint import/no-webpack-loader-syntax: off */

import { useContext, useLayoutEffect, useRef } from 'react';
import { MapContext, PlacesContext } from '../context'
import { Loading } from '.'

//@ts-ignore
import { Map, supported } from '!mapbox-gl'

export const MapView = () => {
   const { isLoading, userLocation } = useContext( PlacesContext )
   const { setMap, isMapReady } = useContext( MapContext )
   
   const mapRef = useRef<HTMLDivElement>(null)

   useLayoutEffect( () => {
      if( supported() === true ){
         if( !isLoading ){
            const map = new Map( {
               container: mapRef.current!, // container ID
               style: 'mapbox://styles/mapbox/navigation-day-v1', // style URL
               center: userLocation ||  [-74.5, 40], // starting position [lng, lat]
               zoom: 9 // starting zoom
            } );

            setMap( map )
         }
      }else{
         console.log("No lo Soporta men!!")
      }
   }, [ isLoading, userLocation, setMap ] )

   

   if( isLoading && !isMapReady ){
      return <Loading />
   }

   return (
      <div 
         ref={ mapRef } 
         style={ { 
            backgroundColor: "white", 
            height: "100vh", 
            width: "100vw", 
            position: "fixed", 
            top: 0, 
            left: 0 
         } 
      } />
   )
}


