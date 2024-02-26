import logo from './logo.svg';
import './App.css';
import CityButton from './components/CityButton';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import AddNewCity from './components/AddNewCity';

function App() {
  const [input, setInput] = useState('');
  const [currentCity, setCurrentCity] = useState('Austin');
  const [cities, setCities] = useState(
    [
      {
        name: "Austin",
        lat: "30.26715",
        long: "-97.74306"
      },
      {
        name: "Dallas",
        lat: "32.78306",
        long: "44.91928"
      },
      {
        name: "Houston",
        lat: "29.76328",
        long: "-95.36327"
      },
      
    ]
  );

  const fetchAPIData = async () => {
    const city = cities.find(cityName => cityName.name === currentCity);
    const BASE_URL = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.long}&hourly=temperature_2m`;

    try {
      const response = await fetch(BASE_URL);
      const json = await response.json();
      console.log("WEATHER", json);
    }
    catch (err) {

    }
    finally {

    }
  }

  useEffect(() => {
    fetchAPIData();
    console.log(cities);
   
  }, [currentCity]);

  return (
    <div className="row">
      <AddNewCity
        inputValue={input}
        setInputValue={setInput}
        currentCity={currentCity}
        setCurrentCity={setCurrentCity}
        cities={cities}
        setCities={setCities}></AddNewCity>
      {cities.map((city) => {
        return (
          <CityButton city={city.name}></CityButton>
        )
      })
      }

    </div>
  );
}

export default App;
