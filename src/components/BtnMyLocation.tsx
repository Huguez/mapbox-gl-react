import React from 'react'
import { useContext } from 'react';

import { MapContext, PlacesContext } from '../context';

export const BtnMyLocation = () => {

   const { map, isMapReady }          = useContext( MapContext )
   const { userLocation } = useContext( PlacesContext )

   const click = () => {
      
      if( !isMapReady ) throw new Error("El mapa no esta listo")

      if( !userLocation ) throw new Error("La locacion del usuario no esta listo")

      map?.flyTo( {
         zoom:   10,
         center: userLocation,

      } )

   }

   return (
      <button onClick={ click } style={{ position: "fixed", right: "90vw",  top:"3vh", zIndex: 999 }} className='btn btn-primary '>
         Mi Ubicacion
      </button>
   )
}
