import { useEffect, useState } from 'react'


const Parking = () => {
    const [inputInfo, setInputInfo] = useState();
    const [toggleEffect, setToggleEffect] = useState();
    const [carparkPrices, setCarparkPrices] = useState();

    const [carparkDetails, setCarparkDetails] = useState([]);

    const [overallDetails, setOverallDetails] = useState({
        carpark: "",
        category: "",
        saturdayRate: "",
        sundayPublicRates: "",
        weekdaysRateOne: "",
        weekdaysRateTwo: "",
    })


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(typeof { inputInfo })
        console.log('handleSubmit', inputInfo)

        let newString = inputInfo.toString().split(' ').join('+');
        console.log(newString)
        setToggleEffect(newString)




        //Set Data for Input Variables
        //useEffect to call API search for those similar
        //Map them out and add button on them 
        // Button onClick maps out details 

    }

    const updateHandler = (event) => {
        console.log(event.target.value)
        setInputInfo(event.target.value)
    }


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
            <div className="ParkingRates">
                <div className="ParkingName">
                    <h1>Check Parking Rates</h1>
                </div>
                <div>
                    <div className="ParkingDetails">
                        <input
                            type="text"
                            className="formDetails"
                            placeholder={"Find Place"}
                            value={inputInfo}
                            onChange={updateHandler}
                            style={{ width: "200px", height: "30px" }}
                        />
                        <button
                            type="submit"
                            className="buttonSubmit"
                            onClick={handleSubmit}
                        >Submit</button>
                    </div>
                    <div>
                        <p>Rates Per Hour </p>
                        {carparkDetails.map((elements, index) => {
                            return (
                                <div>
                                    <h4 key={index} className={index} onClick={selectLocation}>{elements.carpark}</h4>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <p className="prices">Weekday {overallDetails.weekdaysRateOne}</p>
                        <p className="prices">Saturday {overallDetails.saturdayRate}</p>
                        <p className="prices">Saturday {overallDetails.sundayPublicRates}</p>
                    </div>

                </div>
            </div>
        </div>

    )

}

export default Parking;