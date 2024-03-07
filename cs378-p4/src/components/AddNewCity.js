import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddNewCity = ({ inputValue, setInputValue, currentCity, setCurrentCity, cities, setCities, setNoResults }) => {
    const [name, setName] = useState();
    const [lat, setLat] = useState();
    const [long, setLong] = useState();
    const [inv, setInv] = useState(false);
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
            if (lat && long) {
                setInv(false);
                if (!cities.find(cityName => cityName.name.toLowerCase() === name.toLowerCase())) {
                    console.log("FOUND NEW CITY", cleanInput);
                    setCurrentCity(name);
                    const newCity = {
                        name: name,
                        lat: lat,
                        long: long
                    };
                    setCities([...cities, newCity]);
                }
            } else {
                setInv(true);
            }
        }
        setInputValue('');
    };

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="row">
                    {inv ? <p>Could not find weather for specified city.</p> : ""}
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
