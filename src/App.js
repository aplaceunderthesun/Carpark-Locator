import './App.css';
import MapContainer from './Components/MapContainer'
import Parking from './Components/ParkingForm'
import Auto from './Components/Auto'
import { Typography } from '@mui/material';


const App = () => {

  return (
    <div className="App">
      <Typography variant="h2">{"ParkWhere"}</Typography>
      <MapContainer />
      <Auto />
      <Parking />
    </div>
  );
}

export default App;
