import { MapProvider, PlacesProvider } from "./context"
import { HomePage } from "./screens/HomePage";

const MapsApp = () => {
   return (
      <PlacesProvider>
         <MapProvider>
            <HomePage />
         </MapProvider>
      </PlacesProvider>
   )
}

export default MapsApp;