import { PlacesProvider } from "./context"
import { HomePage } from "./screens/HomePage";

const MapsApp = () => {
  return (
     <PlacesProvider >
        <HomePage />
     </PlacesProvider>
  )
}

export default MapsApp;