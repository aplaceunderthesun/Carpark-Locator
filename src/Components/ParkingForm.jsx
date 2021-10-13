import { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import { TextField } from '@mui/material';

//////////////////////////////////////////////////
//////////////////////////////////////////////////

const Parking = () => {
    const [inputInfo, setInputInfo] = useState();
    const [toggleEffect, setToggleEffect] = useState(true);

    const [carparkDetails, setCarparkDetails] = useState([]);
    const [overallDetails, setOverallDetails] = useState({
        carpark: "",
        category: "",
        saturdayRate: "",
        sundayPublicRates: "",
        weekdaysRateOne: "",
        weekdaysRateTwo: "",
    })
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//Toggle Effects to activate API call

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(typeof { inputInfo })
        console.log('handleSubmit', inputInfo)

        if (toggleEffect === true){
            setToggleEffect(false);
        }
        else if (toggleEffect === false){
            setToggleEffect(true)
        }

    }

///////////////////////////////////////////////
//Send input data into inputInfo

    const updateHandler = (event) => {
        console.log("eventtarget", event.target.value)
        setInputInfo(event.target.value)
    }

///////////////////////////////////////////////
//Making the API call using inputInfo 

    useEffect(() => {

        const makeApiCall = () => {
            fetch(`https://data.gov.sg/api/action/datastore_search?resource_id=85207289-6ae7-4a56-9066-e6090a3684a5&q=${inputInfo}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log('checking Data', data.result.records)
                    console.log("carparkData", data)
                    setCarparkDetails(data.result.records)
                })
        }
        makeApiCall();
    }, [toggleEffect])

///////////////////////////////////////////////
//Sending Parking Rates into overDetails onClick 

    const selectLocation = (index) => {
        console.log('elements', index.target.className)
        console.log('Prices', carparkDetails[index.target.className].saturday_rate)

        setOverallDetails({
            carpark: carparkDetails[index.target.className].carpark,
            category: carparkDetails[index.target.className].category,
            saturdayRate: carparkDetails[index.target.className].saturday_rate,
            sundayPublicRates: carparkDetails[index.target.className].sunday_publicholiday_rate,
            weekdaysRateOne: carparkDetails[index.target.className].weekdays_rate_1,
            weekdaysRateTwo: carparkDetails[index.target.className].weekdays_rate_2,
        })

    }


    return (
        <div>
            <div className="inputContainer">
                <div className="ParkingDetails">
                    <h1>Check Parking Rates</h1>
                    <TextField
                        type="text"
                        className="formDetails"
                        placeholder={"Find Place"}
                        value={inputInfo}
                        onChange={updateHandler}
                        style={{ width: "400px", height: "20px" }}
                    />
                    <Button variant="contained"
                        type="submit"
                        className="buttonSubmit"
                        onClick={handleSubmit}
                        size="large"
                    >Submit</Button>
                </div>
            </div>
            <div className="detailsContainer">
                <div className="mapFunction">
                    {carparkDetails.map((elements, index) => {
                        return (
                            <div>
                                <br />
                                <h4 type="button" variant="outlined" key={index} className={index} onClick={selectLocation}>{elements.carpark}</h4>
                            </div>
                        )
                    })}
                </div>
                <div className="parkingRates">
                    <p>WEEKDAY {overallDetails.weekdaysRateOne}</p>
                </div>
            </div>
        </div>


    )

}

export default Parking;