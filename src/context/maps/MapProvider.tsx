import React from 'react'
import { Map } from 'mapbox-gl';
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
      dispatch( { type: "setMap", payload: map } )
   }

   return (
      <MapContext.Provider value={ {...state, setMap} } >
         { props.children }
      </MapContext.Provider>

   )
}
