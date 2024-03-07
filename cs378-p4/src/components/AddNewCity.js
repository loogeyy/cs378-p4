import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddNewCity = ({ inputValue, setInputValue, setCurrentCity, cities, setCities, setNoResults, errorMsg, setErrorMsg }) => {
    const [name, setName] = useState();
    const [lat, setLat] = useState();
    const [long, setLong] = useState();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const fetchAPIData = async () => {
        const BASE_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${inputValue}&count=10&language=en&format=json`;

        try {
            const response = await fetch(BASE_URL);
            const json = await response.json();
            const results = json.results;

            if (results) {
                setName(results[0].name);
                setLat(results[0].latitude);
                setLong(results[0].longitude);
                console.log("CITY", results[0].name);
                console.log("LAT", results[0].latitude);
                console.log("LONG", results[0].longitude);
                console.log("length", results);
            } else {
                setNoResults(true);
                setLat();
                setLong();
                setName();
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAPIData();
    }, [inputValue])

    const handleAddClick = () => {
        console.log("inputVal", inputValue);
        const cleanInput = inputValue.trim();
        if (cleanInput.length > 0) {
            console.log("CITY", name);
            console.log("LAT", lat);
            console.log("LONG", long);
            if (lat && long) {
                if (!cities.find(cityName => cityName.name.toLowerCase() === name.toLowerCase())) {
                    setErrorMsg('');
                    setCurrentCity(name);
                    const newCity = {
                        name: name,
                        lat: lat,
                        long: long
                    };
                    setCities([...cities, newCity]);
                }
                else {
                    setErrorMsg("This city has already been added.");
                }  
            } 
            else {
                setErrorMsg("Could not find weather for specified city.");
            }
        }
        else {
            setErrorMsg("Please enter non-empty input.")
        }
        setInputValue('');
    };

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="row justify-content-center text-center">
                    <p>{errorMsg}</p>
                </div>
                <div className='row justify-content-center'>
                    <div className='col d-flex justify-content-center align-items-center'>
                        <Form.Group controlId="inputBox">
                            <Form.Control
                                type="text"
                                placeholder="Enter City"
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleAddClick}>
                            +
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AddNewCity;
