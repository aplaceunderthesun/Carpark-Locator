import { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import TableForm from './TableForm'

//////////////////////////////////////////////////
//////////////////////////////////////////////////

const ParkingForm = (props) => {
    const [inputInfo, setInputInfo] = useState();
    const [toggleEffect, setToggleEffect] = useState(true);
    const [carparkDetails, setCarparkDetails] = useState([]);


    //////////////////////////////////////////////////
    //////////////////////////////////////////////////


    const locationTest = (data) => {
        console.log('DATA', typeof data)
        setInputInfo("Plaza Singapura")

        if (toggleEffect === true) {
            setToggleEffect(false);
        }
        else if (toggleEffect === false) {
            setToggleEffect(true)
        }


    }


    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    //Making the API call using inputInfo 


    useEffect(() => {

        const makeApiCall = () => {
            fetch(`https://data.gov.sg/api/action/datastore_search?resource_id=85207289-6ae7-4a56-9066-e6090a3684a5&q=${inputInfo}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log('CHECKING DATA RETRIVED', data.result.records)
                    console.log("CARPARK DATA", data)

                    const information = data.result.records;
                    for (let i = 0; i < information.length; i++) {
                        if (inputInfo === information[i].carpark) {
                            setCarparkDetails(information[i])
                        }
                    }
                })
        }
        makeApiCall();
    }, [toggleEffect])

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    const carpark = (carparkDetails.carpark)
    const weekdayOne = (carparkDetails.weekdays_rate_1)
    const weekdayTwo = (carparkDetails.weekdays_rate_2)
    const saturday = (carparkDetails.saturday_rate)
    const sunPh = (carparkDetails.sunday_publicholiday_rate)

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    return (
        <div className="parkingRates">
            <div className="parkingRates">
                <br />
                <Button variant="outlined" style={{ width: "400px", height: "50px" }}
                    onClick={locationTest}>Show Parking Rates</Button>
            </div>
            <div className="parkingRatesContainer" >

                <TableForm weekOne={weekdayOne} weekTwo={weekdayTwo} sat={saturday} sun={sunPh} parking={carpark} />
            </div>
        </div>
    )

}

export default ParkingForm;
