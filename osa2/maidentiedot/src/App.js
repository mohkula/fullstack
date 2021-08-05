import React, { useState, useEffect } from 'react'
import './App.css';

import axios from 'axios'

import FindCountriesForm from './FindCountriesForm'
import ShowFiltered from './ShowFiltered'
import ShowCountryInfo from './ShowCountryInfo'
import ShowWeatherInfo from './ShowWeatherInfo';


const App = () => {

  const api_key = process.env.REACT_APP_API_KEY


  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [weatherData, setWeatherData] = useState('')


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })

      
  }, [])

  

  const handleFilterChange = (event) =>{

    setFilter(event.target.value)
    }

    const handleButtonClick = (country) => {
    
      setSelectedCountry(country)

      const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      axios
      .get(url)
      .then(response => {
        setWeatherData(response.data)
      })

    }

  

  return (

    <div>

    <FindCountriesForm filter={filter} handleFilterChange={handleFilterChange}/>

    <ShowFiltered countries={countries} filter={filter} handleButtonClick={handleButtonClick} />

    <ShowCountryInfo country={selectedCountry} />
  
  {weatherData.current ? <ShowWeatherInfo weather={weatherData}/> : 
  <div>
    
  </div>

  }
    {/* {selectedCountry === '' ? 
    
    
      <div></div>
      :
    
      <ShowWeatherInfo weather={weatherData}/>

    } */}
    
    </div>
  )
}

export default App
