import Autocomplete from 'react-google-autocomplete'

const Auto = () => {

    return (
        <Autocomplete
            apiKey={process.env.REACT_APP_API_KEY}
            style={{ width: "100%", height: "40px" }}
            placeholder="Enter Your Address"
            onPlaceSelected={(place) => {
                console.log(place);
            }}
        />
)
}

export default Auto;