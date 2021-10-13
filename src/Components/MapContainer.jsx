import {
    InfoWindow,
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import { useState } from 'react'
import Geocode from 'react-geocode'
import { Typography } from '@mui/material';
import { useEffect } from 'react'
import AutoComplete from 'react-google-autocomplete'
import ParkingForm from './ParkingForm'




Geocode.setApiKey(`${process.env.REACT_APP_API_KEY}`)

const MapContainer = () => {
    const [inputAuto, setInputAuto] = useState();
    const [currentPosition, setCurrentPosition] = useState({
        address: "",
        streetNumber: "",
        route: "",
        neighbourhood: "",
        country: "",
        zoom: 16,
        height: 800,
        mapPosition: {
            lat: 1.290270,
            lng: 103.851959
        },
        markerPosition: {
            lat: 1.290270,
            lng: 103.851959
        }
    }
    );

    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////

    const getStreet = (addressArray) => {
        let street = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'street_number' === addressArray[i].types[0]) {
                street = addressArray[i].long_name;
                return street
            }
        }
    }

    const getRoute = (addressArray) => {
        let route = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'route' === addressArray[i].types[0]) {
                route = addressArray[i].long_name;
                return route
            }
        }
    }

    const getNeighbourhood = (addressArray) => {
        let neighbourhood = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'neighbourhood' === addressArray[i].types[0]) {
                neighbourhood = addressArray[i].long_name;
                return neighbourhood
            }
        }
    }

    const getCountry = (addressArray) => {
        let country = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'country' === addressArray[i].types[0]) {
                country = addressArray[i].long_name;
                return country
            }
        }
    }

    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////



    const onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat();
        let newLng = event.latLng.lng();

        //Geocode helps to translate coordinates into address information

        Geocode.fromLatLng(newLat, newLng)
            .then(res => {

                const address = res.results[0].formatted_address;
                const addressArray = res.results[0].address_components;
                const streetNumber = getStreet(addressArray);
                const route = getRoute(addressArray);
                const neighbourhood = getNeighbourhood(addressArray);
                const country = getCountry(addressArray);

                setCurrentPosition({
                    address: (address) ? address : "",
                    streetNumber: (streetNumber) ? streetNumber : "",
                    route: (route) ? route : "",
                    neighbourhood: (neighbourhood) ? neighbourhood : "",
                    country: (country) ? country : "",
                    zoom: 16,
                    height: 800,
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    }
                }
                )
                console.log('address', address)
                console.log('addressArray', addressArray)
                console.log('res', res)
                console.log(newLat, newLng)
            })
    };

    const onPlaceSelected = (place) => {
        const address = place.formatted_address;
        const addressArray = place.address_components;

        const streetNumber = getStreet(addressArray);
        const route = getRoute(addressArray);
        const neighbourhood = getNeighbourhood(addressArray);
        const country = getCountry(addressArray);

        console.log(address);
        console.log(addressArray);
        console.log(streetNumber,route, neighbourhood);

        const newLat = (place.geometry.location.lat());
        const newLng = (place.geometry.location.lng());

        console.log(place.geometry.location.lat());
        console.log('input',place)


        setCurrentPosition({
            address: (address) ? address : "",
            streetNumber: (streetNumber) ? streetNumber : "",
            route: (route) ? route : "",
            neighbourhood: (neighbourhood) ? neighbourhood : "",
            country: (country) ? country : "",
            zoom: 16,
            height: 800,
            mapPosition: {
                lat: newLat,
                lng: newLng
            },
            markerPosition: {
                lat: newLat,
                lng: newLng
            }
        }
        )

    }

    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////

    let locationTwo = ""
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const location = (event.target.value)
        locationTwo = location
        console.log('Location', location)
        console.log('LocationTWo',locationTwo)
    }


    
    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////

    const AsyncMap = withScriptjs(withGoogleMap(props => (
        <GoogleMap
            defaultZoom={16}
            defaultCenter={{ lat: currentPosition.mapPosition.lat, lng: currentPosition.mapPosition.lng }}
        >
            <Marker
                position={{ lat: currentPosition.mapPosition.lat, lng: currentPosition.mapPosition.lng }}
                draggable={true}
                onDragEnd={(event) => onMarkerDragEnd(event)}
            >

                <InfoWindow>
                    <h3>{currentPosition.address}</h3>
                </InfoWindow>
            </Marker>
            <AutoComplete
            apiKey={process.env.REACT_APP_API_KEY}
            style={{ width: "100%", height: "40px" }}
            placeholder="Enter Your Address"
            options={{
                types: ["geocode", "establishment"],
            }}
            onPlaceSelected={(place) => onPlaceSelected(place)}
            onChange={handleSubmit}
            
        />
        </GoogleMap>
    )));


console.log("RANDOM LT", locationTwo)

    return (
        <div>
            <Typography variant="h2">{"ParkWhere"}</Typography>
            <div>
                <AsyncMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `500px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
            <br /><br />
            <ParkingForm info={locationTwo}/>
        </div>
    )

}

export default MapContainer;