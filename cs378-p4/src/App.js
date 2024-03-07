import './App.css';
import CityButton from './components/CityButton';
import { useEffect, useState } from 'react';
import AddNewCity from './components/AddNewCity';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';

function App() {
  const [noResults, setNoResults] = useState(false);
  const [input, setInput] = useState('');
  const [currentCity, setCurrentCity] = useState('Austin');
  const [errorMsg, setErrorMsg] = useState('');
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
  const [temp, setTemp] = useState([]);
  const [time, setTime] = useState([]);

  const fetchAPIData = async () => {
    const city = cities.find(cityName => cityName.name === currentCity);
    const BASE_URL = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.long}&hourly=temperature_2m&temperature_unit=fahrenheit&forecast_days=1`;

    try {
      const response = await fetch(BASE_URL);
      const json = await response.json();
      setTemp(json.hourly.temperature_2m);
      setTime(json.hourly.time)
    }
    catch (err) {
      console.log(err);
    }
  };
  
  const changeCity = (cityName) => {
    console.log("city name", cityName);
    setCurrentCity(cityName);
    setErrorMsg("");
  };

  useEffect(() => {
    fetchAPIData();

  }, [currentCity]);

  return (
    <div className="container mt-4">
      <div className="row row-cols-3 justify-content-center">
        {cities.map((city, index) => (
          <div key={index} className="row justify-content-center mb-3">
            <CityButton city={city.name} changeCity={changeCity}/>
          </div>
        ))}
      </div>
      <AddNewCity
        inputValue={input}
        setInputValue={setInput}
        currentCity={currentCity}
        setCurrentCity={setCurrentCity}
        cities={cities}
        setCities={setCities}
        setNoResults={setNoResults}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}>
        
      </AddNewCity>
      <div className='container'>
      <div className="row text-center mt-4">
        <h1 className=''>Weather Forecast for {currentCity}</h1>
      </div>
        <div className="row justify-content-center">
          <div className='col mt-4'>
            <h2 className="text-center"
            >Time</h2>
            <p className="text-center time">
            {time.map((t) => {
              const dateTime = new Date(t);
              const hours = dateTime.getHours() % 12 || 12;
              const minutes = dateTime.getMinutes();
              const amOrPm = dateTime.getHours() < 12 ? 'AM' : 'PM';
              const month = dateTime.getMonth() + 1; 
              const day = dateTime.getDate();
              
              const result = `(${month}/${day}) ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amOrPm}`;
              
              return <p>{result}</p>;
            })}
            </p>

          </div>
          <div className='col mt-4'>
            <h2 className="text-center">Temperature</h2>
            <p className="text-center">
              {
                temp.map((t) => (
                  <p>{t} °F</p>
              ))
              }
           </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
