import logo from './logo.svg';
import './App.css';
import MapContainer from './MapContainer'
import Parking from './Parking'
import Autocomplete from 'react-google-autocomplete'


const App = () => {
  return (
    <div className="App">
      <h1>ParkWhere</h1>
      <MapContainer />
      <Autocomplete
        apiKey={process.env.REACT_APP_API_KEY}
        style={{ width: "800px", height: "40px" }}
        onPlaceSelected={(place) => {
          console.log(place);
        }}
      />
      <Parking />
    </div>
  );
}

export default App;
