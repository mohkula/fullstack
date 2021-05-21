import React from 'react'


const ShowCountryInfo = (props) => {


    if (props.country===''){
     return (
   
       <div>
   
       </div>
     )
    }
   const country = props.country
   
   
   
   
   
     const languages = country.languages
     return(
   
       <div>
         <p><b>{country.name}</b></p>
   
           <p>capital: {country.capital}</p>
   
           <p>population: {country.population}</p>
   
           <p><b>languages: </b></p>
   
           {languages.map(l => 
             
             <ul key={l.id}>
   
             {l.name}
             </ul>
   
             )}
   
   
   <img src={country.flag}alt="flag" width="80" height="60"/>
   
           
       </div>
     )
   
   
   }

   export default ShowCountryInfo