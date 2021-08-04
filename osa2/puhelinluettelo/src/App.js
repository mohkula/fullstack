import React, { useState, useEffect } from 'react'
import FilterForm from './FilterForm'
import ShowFiltered from './ShowFiltered'
import AddpersonForm from './AddpersonForm'

import PersonService from './services/Person'



const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    PersonService
      .getAll()
        .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  

  const addPerson = (event) => {
    event.preventDefault()

    const names = persons.map(person => person.name)



    if(names.indexOf(newName) === -1){

      const personObject = {
        name: newName,
        number: newNumber,
        id: newName
       
       }  

    
  


    PersonService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(personObject))

    setNewName('')
    setNewNumber('')

    setMessage(
      `Added '${returnedPerson.name}'`
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)

    })
    .catch(error =>{
      setErrorMessage(JSON.stringify(error.response.data))
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  else{
    if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){


      const personObject = {
        name: newName,
        number: newNumber,
        id: newName
       
       }

      PersonService
      .update(personObject.id, personObject)
      .then(returnedPerson =>{

        setPersons(persons.map(person => person.id !== personObject.id ? person : personObject))
        setNewName('')
        setNewNumber('')


    setMessage(
      `'${returnedPerson.name}' has a new number: '${returnedPerson.number}'`
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)


      })
      .catch(error => {

        console.log('erros');
        
        setErrorMessage(
          `Information of '${personObject.name}' has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
     
      })

    }

  }

}

    

  
    
  
  

  const handleNameChange = (event) =>{

  setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{

    setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) =>{

      setNewFilter(event.target.value)
      }

      const handleDelete = (id) => {

        if (window.confirm(`Do you really want to delete '${id}'?`)) {
        
        PersonService
        .deletePerson(id)
    .then(returnedPerson => {

    
      setPersons(persons.filter(p => p.id !== id))


    setMessage(
      ` '${id}' has been deleted`
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
     
      

    })
  } 
        
      }



      

  return (
    <div>
      <h2>phonebook</h2>
      <Notification message={message} />
      <ErrorNotification message={errorMessage} />




        <FilterForm newFilter={newFilter}  handleFilterChange={handleFilterChange}/>

      <h2>Add new</h2>

      <AddpersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
    <ShowFiltered persons={persons} newFilter={newFilter} handleDelete={handleDelete}/>

    </div>
  )

}

export default App