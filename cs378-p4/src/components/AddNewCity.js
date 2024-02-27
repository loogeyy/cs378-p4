import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddNewCity = ({ inputValue, setInputValue, currentCity, setCurrentCity, cities, setCities, setNoResults }) => {
    const [lat, setLat] = useState();
    const [long, setLong] = useState();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const fetchAPIData = async () => {
        console.log("CURRENT INPUT", inputValue);
        const BASE_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${inputValue}&count=10&language=en&format=json`;

        try {
            const response = await fetch(BASE_URL);
            const json = await response.json();
            const results = json.results;

            if (results) {
                setLat(results[0].latitude)
                setLong(results[0].longitude)
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
        const cleanInput = inputValue.trim();
        if (cleanInput.length > 0 && lat && long) {
            setNoResults(false);
            if (!cities.find(cityName => cityName.name.toLowerCase() === cleanInput.toLowerCase())) {
                console.log("FOUND NEW CITY", cleanInput);
                setCurrentCity(cleanInput);
                const newCity = {
                    name: cleanInput,
                    lat: lat,
                    long: long
                };
                setCities([...cities, newCity]);
            }
        }
        setInputValue('');
    };

    return (
        <div className="row">
            <div className='col'>
            <Form.Group controlId="inputBox">
                <Form.Control
                    type="text"
                    placeholder="Enter City"
                    value={inputValue}
                    onChange={handleInputChange}
                />
            </Form.Group>
            </div>
            <div className='col'>
            <Button variant="primary" onClick={handleAddClick}>
                +
            </Button>
            </div>
        </div>
    );
}

export default AddNewCity;
