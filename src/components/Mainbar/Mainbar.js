import { useRef, useState, useEffect } from 'react';
import './Mainbar.scss';

import Switch from '../Switch/Switch';
import useWindowDimensions from '../../utils/useWindowDimensions/useWindowDimensions'


function Mainbar(props) {

    const { mode, current_weather, weather_icons, toggleMode, city, weekWeather, unit} = props;

    const [date, setDate] = useState(new Date());

    const [sunrise, setSunrise] = useState();

    const [sunset, setSunset] = useState();

    const sunrise_unix = current_weather.sys.sunrise;
    const sunset_unix = current_weather.sys.sunset;

    const [week, setWeek] = useState([])

    function getHour(unix_t) {
        return new Date(unix_t * 1000).getHours();
    }

    function getWDay(unix_t) {
        return weekdays2[new Date(unix_t * 1000).getDay()];
    }

    function getTemp(temp) {
        return parseInt((String(temp).split('.'))[0])
    }

    useEffect(() => {
        setSunrise(new Date(sunrise_unix * 1000));
    }, [])
    
    useEffect(() => {
        setSunset(new Date(sunset_unix * 1000));
    }, [])

    useEffect(() => {
        setInterval(() => setDate(new Date()), 3000);
      }, []);


    useEffect(() => {
        if (weekWeather.list) {
            console.log(weekWeather.list.filter((e) => getHour(e.dt) === 12));
            setWeek(weekWeather.list.filter((e) => getHour(e.dt) === 12));

        }
        
    }, [weekWeather])

    const weekdays2 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const { height, width } = useWindowDimensions();

    const weekdays = {
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
        0: "Sunday",
    }

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];


    return (
        <div className={`mainbar mainbar_${mode}`}>

            {width > 768 ? <div className='header'>
                <h2 className={`header__h2 header__h2_${mode}`}>Haza Weather</h2>

                <div className='mode'>
                    <p className='mode__p'>Dark mode</p>
                    <Switch
                        isOn={mode}
                        onColor="#1F41F7"
                        handleToggle={() => toggleMode()}
                    />
                </div>

            </div>
            :
            <div className='header'>
                <h2 className={`header__h2 header__h2_${mode}`}>5 days</h2>

            </div>
            
            }
            

            <div className='week'>
                {Array.from(week).map((day, id) => {
                    return <div key={id} className={`week__day week__day_${mode}`}>
                        <p className='week__day-p'>{getWDay(day.dt)}</p>
                        <img src={weather_icons[day.weather[0].main]} alt="" className='week__day-img'/>
                        <div className='week__day-wrapper'>
                        <img src={weather_icons["temp"]} alt="" className='temp1'/>
                        <p className='week__day-p' style={{marginBottom: "0"}}>{unit === 'C' ? getTemp(day.main.temp) : getTemp(day.main.temp) + 273} °{unit}</p>
                        </div>
                        
                    </div>
                })}
            </div>

            <section className='highlights'>
                <div className='hl__wrapper'>
                    <h2 className='highlights__h2'>Today’s highlights</h2>
                    <p className='hl__p'>{weekdays[date.getDay()]}, {date.getDate()} {monthNames[date.getMonth()]}, {date.toLocaleString('en-US', {hour: 'numeric',minute: 'numeric',hour12: false,})}</p>
                </div>

                <div className='blocks'>
                    <div className={`block block_${mode}`}>
                        <p className='block__label'>Wind status</p>
                        <div className='block__wrapper'>
                            <div className='block__wrapper2'>
                                <p className='block__p'>{current_weather.wind.speed}</p>
                                <p className='block__un'>metre/sec</p>
                            </div>
                            <img src={require('../../dev/wind.svg').default} alt="" className='block__icon'/>
                        </div>
                    </div>

                    <div className={`block block_${mode}`}>
                        <p className='block__label'>Pressure</p>
                        <div className='block__wrapper'>
                            <div className='block__wrapper2'>
                                <p className='block__p'>{current_weather.main.pressure}</p>
                                <p className='block__un'>d.</p>
                            </div>
                            <img src={weather_icons['pressure']} alt="" className='block__icon'/>
                        </div>
                    </div>

                    <div className={`block block_${mode}`}>
                        <p className='block__label'>Sunrise </p>
                        <div className='block__wrapper'>
                            <div className='block__wrapper2'>
                                {sunrise && <p className='block__p'>{sunrise.getHours()}:{(sunrise.getMinutes()).length === 1 && '0'}{sunrise.getMinutes()}</p>} 
                                <p className='block__un'></p>
                            </div>
                            <img src={weather_icons['sunrise']} alt="" className='block__icon'/>
                        </div>
                    </div>

                    <div className={`block block_${mode}`}>
                        <p className='block__label'>Sunset </p>
                        <div className='block__wrapper'>
                            <div className='block__wrapper2'>
                                {sunset && <p className='block__p'>{sunset.getHours()}:{(sunset.getMinutes()).length === 1 && '0'}{sunset.getMinutes()}</p>} 
                                <p className='block__un'></p>
                            </div>
                            <img src={weather_icons['sunset']} alt="" className='block__icon'/>
                        </div>
                    </div>
                </div>
                
            </section>

            <div className='footer'>
                <p className={`footer__p footer__p_${mode}`}>Haza 2022.</p>
                <div className='footer__wrapper'>
                    <p className={`footer__p footer__p_${mode}`}>designed by <a href="https://www.instagram.com/avoid_asset/" className={`footer__link footer__link_${mode}`}>Asset</a></p>
                    <p className={`footer__p footer__p_${mode}`}>powered by <a href="https://defida.me/" className={`footer__link footer__link_${mode}`}>DeFida</a></p>
                </div>
                
            </div>
        </div>
    );
}

export default Mainbar;
