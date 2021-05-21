import React, { useState, useEffect } from 'react'
import './App.css';

import axios from 'axios'

import FindCountriesForm from './FindCountriesForm'
import ShowFiltered from './ShowFiltered'
import ShowCountryInfo from './ShowCountryInfo'


const App = () => {


  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')


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

    }

  

  return (

    <div>

    <FindCountriesForm filter={filter} handleFilterChange={handleFilterChange}/>

    <ShowFiltered countries={countries} filter={filter} handleButtonClick={handleButtonClick} />

    <ShowCountryInfo country={selectedCountry} />
    
    </div>
  )
}

export default App
