import React, { useState, useEffect } from 'react'

<script src='https://momentjs.com/downloads/moment.min.js'></script>

const Weathercard = ({ tempInfo }) => {

    const [weatherState, setWeatherState] = useState("")

    const { temp, humidity, pressure, weathermood, name, speed, country, sunset, times } = tempInfo; //destructuring.

    useEffect(() => {
        if (weathermood) {
            switch (weathermood) {
                case "Clouds": setWeatherState("wi-day-cloudy");
                    break;
                case "Haze": setWeatherState("wi-fog");
                    break;
                case "Clear": setWeatherState("wi-day-sunny");
                    break;
                case "Mist": setWeatherState("wi-dust");
                    break;
                case "Rain": setWeatherState("wi-rain");
                    break;
                case "Thunderstorm": setWeatherState("wi-thunderstorm");
                    break;
                default: setWeatherState("wi-day-sunny");
                    break;
            }
        }
    }, [weathermood])

    //converting seconds into time
    let sec = sunset;
    let date = new Date(sec * 1000); //we'll get milliseconds.
    let timeStr = `${date.getHours()}:${date.getMinutes()}`

    //Moment JS for time.
    var moment = require('moment')

    return (
        <>
            <article className="widget"> {/* //it will create a box */}
                <div className="weatherIcon">
                    <i className={`wi ${weatherState}`}></i>
                </div>
                <div className="weatherInfo">
                    <div className="temperature">
                        <span>{temp}°C</span>
                    </div>
                    <div className="description">
                        <div className="weatherCondition">
                            {weathermood}
                        </div>
                        <div className="place">
                            {name}, {country}
                        </div>
                    </div>
                </div>
                
                <div className="date" id='dateTimes'>
                    { moment().utcOffset(times/60).format('DD/MM/YYYY h:mm a') 
                  }
                     <p id='datePara'></p>
                    {/* {DateTime} */}
                </div>

                {/* our 4 coloumn section  */}
                <div className="extra-temp">
                    <div className="temp-info-minmax">
                        <div className="two-sided-section">
                            <p><i className={'wi wi-sunset'}></i></p>
                            <p className='extra-info-leftside'>{timeStr} <br />Sunset</p>
                        </div>

                        <div className="two-sided-section">
                            <p><i className={'wi wi-humidity'}></i></p>
                            <p className='extra-info-leftside'>{humidity} %<br />Humidity</p>
                        </div>
                    </div>

                    <div className="weather-extra-info">
                        <div className="two-sided-section">
                            <p><i className={'wi wi-rain'}></i></p>
                            <p className='extra-info-leftside'>{pressure} hpa <br /> Pressure</p>
                        </div>

                        <div className="two-sided-section">
                            <p><i className={'wi wi-strong-wind'}></i></p>
                            <p className='extra-info-leftside'>{speed} m/s<br />Speed</p>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
}
export default Weathercard