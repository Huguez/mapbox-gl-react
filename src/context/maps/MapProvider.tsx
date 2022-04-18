/* eslint import/no-webpack-loader-syntax: off */

import { useReducer, useCallback, useContext, useEffect } from 'react';
//@ts-ignore
import { Map, Marker, Popup, LngLatBounds, AnySourceData } from '!mapbox-gl';
import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '../';
import { direccionsApi } from '../../apis';
import { RoutesResponse } from '../../interfaces/interfaces';

export interface MapState {
   isMapReady: boolean;
   map?: Map;
   markers: Marker[];
}

interface MapProviderProps {
   children: JSX.Element;
}

const INITIAL_STATE : MapState = {
   isMapReady: false,
   map: undefined,
   markers: [],
}

export const MapProvider = ( props: MapProviderProps ) => {
   const [ state, dispatch ] = useReducer( mapReducer, INITIAL_STATE )
   const { places } = useContext( PlacesContext )

   useEffect( () => {

      state.markers.forEach( marker => marker.remove() );
      const newMarkers: Marker[] = [];

      for (const place of places) {
         const [ lng, lat ] = place.center;
         const popUp = new Popup().setHTML( `<h6>${ place.text }</h6><p>${ place.place_name }</p>` )
         const marker = new Marker().setPopup( popUp ).setLngLat( [ lng, lat ] ).addTo( state.map! )
         newMarkers.push( marker )
      }
      
      dispatch( { type: "setMarkers", payload: newMarkers } )

      
   }, [ places, state.markers, state.map ] )

   const setMap = useCallback(  ( map: Map ) => {
      
      const popup = new Popup().setHTML( `<h4> Aqui esta el Huguez </h4>` )

      new Marker({color: "#368F04" }).setLngLat( map.getCenter() ).setPopup( popup ).addTo( map )


      dispatch( { type: "setMap", payload: map } )
   }, [] )

   const getRouteBetweenPoints  = async ( start: [ number, number ], end: [ number, number ] ) => {
      
      const resp =  await direccionsApi.get<RoutesResponse>( `${ start.join(',') };${ end.join(',') }`, {} );
      const {  geometry } = resp.data.routes[0]
      const { coordinates: coords } = geometry
      
      // distance, duration,
      // let kms = distance / 1000; 
      // kms = Math.round( kms * 100 )
      // kms /= 100;
      
      // const minutes = Math.floor( duration / 60 );
      
      const bounds = new LngLatBounds( [ start, start ] );
      
      for( const coord of coords ) {
         const newCoord: [ number, number ] = [ coord[0], coord[1] ]
         bounds.extend( newCoord );
      }

      state.map?.fitBounds( bounds, { padding: 120 } )

      const sourceData: AnySourceData = {
         type: "geojson",
         data: {
            type: "FeatureCollection",
            features: [
               { 
                  type: "Feature",
                  properties: {},
                  geometry: {
                     type: 'LineString',
                     coordinates: coords
                  }
               }
            ]
         }
      }

      if( !!state.map?.getLayer( 'RouteString' ) ){
         state.map?.removeLayer( 'RouteString' );
         state.map?.removeSource('RouteString');
      }

      state.map?.addSource( "RouteString", sourceData );
      state.map?.addLayer( {
         id: "RouteString",
         type: "line",
         source: "RouteString",
         layout: {
            'line-cap': "round",
            'line-join': 'round',
         },
         paint: {
            'line-color':'black',
            'line-width': 5
         }
      } )



   }

   return (
      <MapContext.Provider value={ {...state, setMap, getRouteBetweenPoints } } >
         { props.children }
      </MapContext.Provider>

   )
}

