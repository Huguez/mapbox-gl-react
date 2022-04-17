import React from 'react';
import ReactDOM from 'react-dom/client';
import MapsApp from './MapsApp';

import "./styles.css"

if( !navigator.geolocation ){
   alert("No hay Geolocalizacion!!!");
   throw new Error("No hay Geolocalizacion!!!")
}



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);
