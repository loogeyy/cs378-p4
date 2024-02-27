import logo from './logo.svg';
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
    const BASE_URL = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.long}&hourly=temperature_2m&temperature_unit=fahrenheit&past_days=1&forecast_days=1`;

    try {
      const response = await fetch(BASE_URL);
      const json = await response.json();
      // console.log("WEATHER", json.hourly.time);
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
  };

  useEffect(() => {
    fetchAPIData();

  }, [currentCity]);

  const toggleModal = () => {
    setNoResults(!noResults);
  };

  return (
    <div className="container">
    <div className='row'>
      {noResults ? <Modal onClose={toggleModal}>
        </Modal> : ''}
      <AddNewCity
        inputValue={input}
        setInputValue={setInput}
        currentCity={currentCity}
        setCurrentCity={setCurrentCity}
        cities={cities}
        setCities={setCities}
        setNoResults={setNoResults}>
        
      </AddNewCity>
      </div>
      <div className='row'>
        {cities.map((city) => {
          return (
            <CityButton 
            city={city.name}
            changeCity={changeCity}
            ></CityButton>
          )
        })}
      </div>
      <div className='container'>
        <h1>Weather forecast for {currentCity}</h1>
        <div className="row">
          <div className='col-5'>
            <h2>Time</h2>
            <ul>
            {time.map((t) => {
              const datetime = new Date(t);
              const currentTime = new Date();
              const absoluteTime = new Date(currentTime.getTime() - (datetime * 60 * 60 * 1000));
              const formattedTime = absoluteTime.toLocaleString();
              return <p>{t}</p>;
            })}
            </ul>

          </div>
          <div className='col-4'>
            <h2>Temperature</h2>
            <ul>
              {
                temp.map((t) => (
                  <p>{t} °F</p>
              ))
              }
           </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
