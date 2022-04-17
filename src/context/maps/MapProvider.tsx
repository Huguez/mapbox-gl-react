import React from 'react'
import { Map, Marker, Popup } from 'mapbox-gl';
import { MapContext } from './MapContext';
import { useReducer } from 'react';
import { mapReducer } from './mapReducer';

export interface MapState {
   isMapReady: boolean;
   map?: Map;
}

interface MapProviderProps {
   children: JSX.Element;
}

const INITIAL_STATE : MapState = {
   isMapReady: false,
   map: undefined,
}

export const MapProvider = ( props: MapProviderProps ) => {
   const [ state, dispatch ] = useReducer( mapReducer, INITIAL_STATE )

   const setMap = ( map: Map ) => {
      
      const popup = new Popup().setHTML( `<h4> Aqui esta el Huguez </h4>` )

      new Marker({color: "#368F04" }).setLngLat( map.getCenter() ).setPopup( popup ).addTo( map )


      dispatch( { type: "setMap", payload: map } )
   }

   return (
      <MapContext.Provider value={ {...state, setMap} } >
         { props.children }
      </MapContext.Provider>

   )
}
