import React from 'react'


const Button = (props) => {

    return (
  
      <div>
  
  <button onClick={props.handleButtonClick}>
    {props.text}
  </button>
      </div>
    )
  }


const ShowFiltered = (props) => {

  const filter = props.filter
    const countries = props.countries
  
    
          if(filter.length === 0){
  
            return(
  
              <div>
                <p>Specify a filter to find countries</p>
              </div>
            )
          }
  
          const filteredCountries = countries.filter(c => c.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
          if(filteredCountries.length > 10){
            return(
  
              <div>
                <p>Too many matches specify another filter</p>
              </div>
            )
          }
  
      return(
  
  
        filteredCountries.map(country => 
          <ul key={country.id}>
    
            {country.name} <Button handleButtonClick={() => props.handleButtonClick(country)} text='show'/>
          </ul> 
          )
      )   
  }

  export default ShowFiltered