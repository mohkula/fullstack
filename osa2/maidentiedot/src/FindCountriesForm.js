import React from 'react'

const FindCountriesForm = (props) => {

    return (
    
      <div>
    
    <input 
                value={props.filter}
                onChange={props.handleFilterChange}
                />
    
      </div>
    )
    }

    export default FindCountriesForm