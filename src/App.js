import './App.css';
import MapContainer from './Components/MapContainer'
import { Route, Link } from "react-router-dom";
import { Button, ButtonGroup } from '@mui/material';
import { useState } from 'react'



const App = () => {


  const [getAutocomplete, setGetAutoComplete] = useState()

   const onGetAutoComplete = (info) => {
    setGetAutoComplete(info)
   }

  return (
    <div className="App">
      <nav>
        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
          <Button>
            <Link to="/">
              <p>Home Page</p>
            </Link>
          </Button>
          <Button>
            <Link to="/MapContainer">
              <p>ParkWhere</p>
            </Link>
          </Button>
        </ButtonGroup>
      </nav>
      <main>
        <Route path="/MapContainer">
          <MapContainer />
        </Route>
      </main>
    </div>
  );
}

export default App;
