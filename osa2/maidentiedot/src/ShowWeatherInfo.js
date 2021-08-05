import React from 'react'

const ShowWeatherInfo = (props) =>{
    const temperature = props.weather.current.temperature
    const windSpeed = props.weather.current.wind_speed
    const windDirection = props.weather.current.wind_dir
    const weatherIcons = props.weather.current.weather_icons
    return(
        <div>
            
           <p> <b>temperature: </b> {temperature} Celsius</p>
           {weatherIcons.map(icon =>{
            return(<img src={icon}alt="weather" width="80" height="80"/>
            )
           })}
                      <p> <b>wind: </b> {windSpeed} mph, direction {windDirection}</p>


           


        </div>
    )
}

export default ShowWeatherInfo