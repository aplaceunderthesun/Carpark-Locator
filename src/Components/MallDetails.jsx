import { useState, useEffect } from 'react'
import { Button } from '@mui/material';


const MallDetails = (props) => {

    const [mallDetails, setMallDetails] = useState([])
    const [toggleEffect, setToggleEffect] = useState(true)
    const [inputInfo, setInputInfo] = useState("Vivocity");
    const [showInfo, setShowInfo] = useState(false)


    
    //////////////////////////////////////////////////
    //////////////////////////////////////////////////
    
    const sendingMall = (data) => {
        console.log('DATA', data)
        console.log('SPLITDATA', data.split(", "))
        console.log('MALL123', data.split(", ")[1])
        setInputInfo(data.split(", ")[1])
        
        if (toggleEffect === true) {
            setToggleEffect(false);
        }
        else if (toggleEffect === false) {
            setToggleEffect(true)
        }
        
        
    }
    
    useEffect(() => {

        const makeApiCall = () => {
            fetch(`https://tih-api.stb.gov.sg/content/v1/shops/search?keyword=${inputInfo}&filtersource=stb&sortBy=type&sortOrder=asc&language=en&apikey=PnNVZyBg4kxMSymzqz0o3YUf4TpeaibH`)
                .then((res) => res.json())
                .then((data) => {
                    console.log('Check Mall Details', data.data[0].businessHour[0])
                    setMallDetails(data.data[0].businessHour[0])
                })
        }
        makeApiCall();
    }, [toggleEffect])

    const OperatingHour = () => <div><h3>Opening Time {mallDetails.openTime}</h3><h3>Closing Time {mallDetails.closeTime}</h3></div>;
    const onOperatingHours = () => {
        setShowInfo(true)
    }



    return (
        <div>
            <div>
                <br />
                <Button variant="outlined" style={{ width: "400px", height: "50px" }}
                    onClick={() => {sendingMall(props.info); onOperatingHours();}}>Show Mall Details</Button>
                {showInfo? <OperatingHour /> : null}
            </div>
        </div>
    )



}

export default MallDetails;