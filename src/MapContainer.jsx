import {
    InfoWindow,
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import { useState, useEffect } from 'react'
import Geocode from 'react-geocode'
import Parking from './Parking'
import { Autocomplete } from 'react-google-autocomplete'


Geocode.setApiKey(`${process.env.REACT_APP_API_KEY}`)

const MapContainer = () => {

    const [currentPosition, setCurrentPosition] = useState({
        address: "",
        streetNumber: "",
        route: "",
        neighbourhood: "",
        country: "",
        zoom: 8,
        height: 500,
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
                    zoom: 13,
                    height: 500,
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

    // useEffect(() => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(position => {
    //             setCurrentPosition({
    //                 mapPosition: {
    //                     lat: position.coords.latitude,
    //                     lng: position.coords.longitude
    //                 },
    //                 markerPosition: {
    //                     lat: position.coords.latitude,
    //                     lng: position.coords.longitude
    //                 }

    //             }, () => {
    //                 Geocode.fromLatLng(position.coords.latitude, position.coords.longitude)
    //                     .then(res => {
    //                         console.log('response', res)
    //                         const address = res.results[0].formatted_address;
    //                         const addressArray = res.results[0].address_components;
    //                         const streetNumber = getStreet(addressArray);
    //                         const route = getRoute(addressArray);
    //                         const neighbourhood = getNeighbourhood(addressArray);
    //                         const country = getCountry(addressArray);
    //                         console.log("route", route)

    //                         setCurrentPosition({
    //                             address,
    //                             streetNumber,
    //                             route,
    //                             neighbourhood,
    //                             country,
    //                             zoom: 15,
    //                             height: 400,
    //                         })
    //                     })
    //             })
    //         })
    //     }

    // })

    const MapWithAMarker = withScriptjs(withGoogleMap(props => (
        <GoogleMap
            defaultZoom={12}
            defaultCenter={{ lat: currentPosition.mapPosition.lat, lng: currentPosition.mapPosition.lng }}
        >
            <Marker
                position={{ lat: currentPosition.mapPosition.lat, lng: currentPosition.mapPosition.lng }}
                draggable={true}
                onDragEnd={(event) => onMarkerDragEnd(event)}
            >
                <InfoWindow>
                    <div>{currentPosition.address}</div>
                </InfoWindow>
            </Marker>
        </GoogleMap>
    )));




    return (
        <div>
            <div>
                <MapWithAMarker
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        </div>
    )

}

export default MapContainer;