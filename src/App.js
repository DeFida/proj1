import { useEffect, useState } from 'react';
import './App.scss';
import Mainbar from './components/Mainbar/Mainbar';

import Sidebar from './components/Sidebar/Sidebar';

import { api } from './utils/constants'


function App() {

  const [mode, setMode] = useState(localStorage.getItem('mode') ? localStorage.getItem('mode') : 'light');

  const [thecity, setthecity] = useState();
  const [weather, setweather] = useState({});

  const [currentweather, setcurrentweather] = useState();

  const [unit, setUnit] = useState('C');

  const weather_icons = {
    "Clear": require('./dev/Clear.svg').default,
    "Clouds": require('./dev/Clouds.svg').default,
    "Rain": require('./dev/Rain.svg').default,
    "Snow": require('./dev/Snow.svg').default,
    "Extreme": require('./dev/Extreme.svg').default,
    "pressure": require('./dev/pressure.svg').default,
    "sunrise": require('./dev/time-morning.svg').default,
    "sunset": require('./dev/sunset.svg').default,
    "temp": require('./dev/thermometer.svg').default,
  }

  useEffect(() => {
    if (localStorage.getItem('city')) {

        setthecity(JSON.parse(localStorage.getItem('city')));
    }
    else {
      api.getCityAPI("Nur-Sultan").then((res) => {


        setthecity(res.data[0])

        localStorage.setItem('city', JSON.stringify(res.data[0]));

      })
    }
    
  }, [])

  useEffect(() => {
    if (thecity) {
      api.getWeatherAPI(thecity.coordinates.latitude, thecity.coordinates.longitude).then((res) => {

        setweather(res.data)
      })
    }
    
  }, [thecity])

  useEffect(() => {
    if (thecity) {
      api.getCurrentWeatherAPI(thecity.coordinates.latitude, thecity.coordinates.longitude).then((cres) => {

        setcurrentweather(cres.data)
      })
    }
    
  }, [thecity])

  function getCity(city) {
    return api.getCityAPI(city)
  }

  function getWeather(latitude, longitude) {
    return api.getWeatherAPI(latitude, longitude).then((res) => {
      api.getCurrentWeatherAPI(latitude, longitude).then((cres) => {
        setcurrentweather(cres.data)
      })
      setweather(res.data)

    })
  }

  function toggleMode() {
    if (mode === 'light') {
      setMode("dark")
      localStorage.setItem('mode', 'dark')
    }
    else {
      setMode('light')
      localStorage.setItem('mode', 'light')
    }
  }

  return (
    <>


    {
      currentweather && <div className={`app app_${mode}`}>
        <Sidebar unit={unit} setUnit={(u) => setUnit(u)} mode={mode} toggleMode={toggleMode} getCity={getCity} weather_icons={weather_icons} getWeather={getWeather} weather={currentweather}/>
        <Mainbar unit={unit} weekWeather={weather} city={thecity} toggleMode={toggleMode} mode={mode} weather_icons={weather_icons} current_weather={currentweather}></Mainbar>
      </div>
    }
    </>
  );
}

export default App;
