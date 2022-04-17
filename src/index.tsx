import React from 'react';
import ReactDOM from 'react-dom/client';
import MapsApp from './MapsApp';

import "./styles.css"

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiaHVndWV6IiwiYSI6ImNsMjMyMHZpdzE2YjUzam1qdGJ3dzJmdmUifQ.SSn9uQNLZFktRQreo7-u4g';

if( !navigator.geolocation ){
   alert("No hay Geolocalizacion!!!");
   throw new Error("No hay Geolocalizacion!!!")
}

if( mapboxgl.supported() === false ){
   alert("No Soporta mapboxgl!!!");
   throw new Error("No Soporta mapboxgl!!!")
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);
