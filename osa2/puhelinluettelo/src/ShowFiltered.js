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

  
  

    const newFilter = props.newFilter
    const persons = props.persons
  
    
          
    if(newFilter.length >= 1){
      return(
  
        persons.filter(p => p.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1).map(person => 
          <ul key={person.id}>
    
            {person.name} {person.number} <Button  handleButtonClick={() => props.handleDelete(person.id)} text='delete'/>
          </ul> 
          )
  
      )
    }
  
    else {
  
  return (
  
  persons.map(person => 
  <ul key={person.id}>
  
  {person.name} {person.number} <Button  handleButtonClick={() => props.handleDelete(person.id)} text='delete'/>
  </ul> 
  )
  )
    }
  }

  export default ShowFiltered