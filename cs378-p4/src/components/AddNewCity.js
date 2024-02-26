import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddNewCity = ({ inputValue, setInputValue, currentCity, setCurrentCity, cities, setCities }) => {
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const fetchAPIData = async () => {
        console.log("CURRENT CITY", currentCity);
        const BASE_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${currentCity}&count=10&language=en&format=json`;

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
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAPIData();
    }, [currentCity])

    const handleAddClick = () => {

        const cleanInput = inputValue.trim();
        if (cleanInput.length > 0) {
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
        <div>
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
    );
}

export default AddNewCity;
