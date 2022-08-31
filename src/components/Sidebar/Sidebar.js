import { useRef, useState, useEffect } from 'react';
import './Sidebar.scss';
import Switch from '../Switch/Switch';

import useWindowDimensions from '../../utils/useWindowDimensions/useWindowDimensions'
function Sidebar(props) {

    const { mode, weather, weather_icons, setUnit, unit, toggleMode} = props;   

    const cityRef = useRef();

    const { height, width } = useWindowDimensions();

    const [ cities, setCities ] = useState([]);

    const [temp, setTemp] = useState(parseInt((String(weather.main.temp).split('.'))[0]));

    
    function getWeather(city) {
        localStorage.setItem("city", JSON.stringify(city));
        props.getWeather(city.coordinates.latitude, city.coordinates.longitude)
        .then((res) => {
            
            cityRef.current.value = "";

            localStorage.setItem('city', JSON.stringify(city));
            setCities([]);
        })
    }

    useEffect(() => {
      setTemp(parseInt((String(weather.main.temp).split('.'))[0]));

    }, [weather])
    

    function getCity(e) {
        e.preventDefault();

        const cityname = cityRef.current.value;
        if (cityname.length >= 3) {
            props.getCity(cityname)
            .then((res) => {
                console.log(res.data);
                setCities(res.data);
            })
        }
        else if (cityname.length == 0) {
            setCities([])
        }

    }

    return (
        <div className={`sidebar sidebar_${mode}`}>
            {width <= 768 && 
            <div className='header'>
            <h2 className={`header__h2 header__h2_${mode}`}>Haza Weather</h2>

            <div className='mode'>
                <p className='mode__p'>Dark mode</p>
                <Switch
                    isOn={mode}
                    onColor="#1F41F7"
                    handleToggle={() => toggleMode()}
                />
            </div>
            </div>}
            <div className='sidebar__input-wrapper'>
                
                <input type="text" className={`sidebar__input sidebar__input_${mode}`} placeholder='Search location' ref={cityRef} onChange={getCity} />
                { cityRef.current && (cityRef.current.value).length > 0 && <button onClick={() => {cityRef.current.value = ""; setCities([])}} className='sidebar__input-clean'>x</button> }
                {
                    cities.length > 0 &&
                    <ul className={`list list_${mode}`}>
                        {Array.from(cities).map((city, id) => {
                            return <li className='list__element' key={id} >
                                    <button type='button' onClick={() => {getWeather(city)}} className={`list_element-t list_element-t_${mode}`}>{city.name }, {city.country.id }, {city.country.name }</button>
                            </li>
                        })}
                    </ul>
                } 
            </div>
            
            <div className='currentw'>
                <div className='weather-image__wrapper'>
                    <img src={weather_icons[weather.weather[0].main]} alt=""  className='weather-image'/>
                </div>
                <div className='currentw__temp'>
                    <img src={mode === 'light' ? require(`../../dev/temp_light.svg`).default : require(`../../dev/temp_dark.svg`).default} alt="" className='currentw__tempicon' />
                    <div className='currentw__temp-wrapper'>
                        <p className='currentw__temp-p'>{unit === 'C' ? temp : temp + 273}</p>
                        <div className='unit__wrapper'>
                            <p className={unit === 'C' ? 'currentw__temp-p2 currentw__temp-p2_active' : 'currentw__temp-p2'} onClick={() => setUnit('C')}>°C</p>
                            <p className='currentw__temp-p2 currentw__temp-p2_active' style={{margin: '0 5px'}}>|</p>
                            <p className={unit === 'F' ? 'currentw__temp-p2 currentw__temp-p2_active' : 'currentw__temp-p2'} onClick={() => setUnit('F')}>°F</p>
                        </div>
                    </div>
                </div>

                <hr className='currentw__hr' />

                <ul className='curdata'>
                    <li className='curdata__el'>
                        <img style={{opacity: '.7'}} src={mode === 'light' ? require(`../../dev/temp_light.svg`).default : require(`../../dev/temp_dark.svg`).default} alt="" className='curdata__icon' />
                        <p className='curdata__label'>Feels like: </p>
                        <p className='curdata__val'>{unit === 'C' ? (String(weather.main.feels_like).split('.'))[0] : parseInt((String(weather.main.feels_like).split('.'))[0]) + 273} °{unit}</p>
                    </li>

                    <li className='curdata__el'>
                        <img src={require(`../../dev/humidity.svg`).default} alt="" className='curdata__icon' />
                        <p className='curdata__label'>Humidity: </p>
                        <p className='curdata__val'>{weather.main.humidity} %</p>
                    </li>

                    <li className='curdata__el'>
                        <img src={require(`../../dev/wind.svg`).default} alt="" className='curdata__icon' />
                        <p className='curdata__label'>Wind: </p>
                        <p className='curdata__val'>{weather.wind.speed} m/s</p>
                    </li>

                    <li className='curdata__el'>
                        <img src={require(`../../dev/cloudy.svg`).default} alt="" className='curdata__icon' />
                        <p className='curdata__label'>Cloudiness: </p>
                        <p className='curdata__val'>{weather.clouds.all} %</p>
                    </li>
                </ul>
            </div>
            {localStorage.getItem('city') && <p className='sidebar__cityname'>{JSON.parse(localStorage.getItem('city')).name}, {JSON.parse(localStorage.getItem('city')).country.id}, {JSON.parse(localStorage.getItem('city')).country.name}</p>}
                
        </div>
    );
}

export default Sidebar;
