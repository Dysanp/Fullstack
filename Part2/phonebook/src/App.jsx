import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personsService from './services/persons'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'


const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [useFilter, setUseFilter] = useState(false)
  const [messa, setMessa] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    const filterVal = event.target.value
    setNewFilter(filterVal)
    if (filterVal === '') {
      setUseFilter(false)
    }
    else {
      setUseFilter(true)
    }
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    const p2a = {
      name: newName,
      number: newNumber
    }
    if (!persons.some(person => person.name === p2a.name)) {            
      personsService.create(p2a).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessa(`Added ${p2a.name}`)
        setTimeout(() => {
          setMessa(null)
        },3000)
      })            
    }
    else {
      const p2up = persons.find(person => person.name === p2a.name)
      const pupd = {...p2up, number: p2a.number}      
      if (window.confirm(`${pupd.name} is already added to phonebook, replace the old number with a new one?`)){
        personsService
        .update(p2up.id,pupd)
        .then(returnedPerson => {          
          setPersons(persons.map(person => person.id === pupd.id ? returnedPerson : person))          
        })
        .catch(error => {
          console.log(error)
          setErrorMessage(`Information from ${p2up.name} has been already deleted from server`)
          personsService
          .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
          })
          setTimeout(()=>{
            setErrorMessage(null)
          },3000)
        })                  
      }      
    }
    setNewName('')
    setNewNumber('')
  } 

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.delet(person.id).then(()=>setPersons(persons.filter(per => per.id != person.id)))
    }          
  }

  const pers2show = useFilter
    ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>      
      <Notification message={messa}/>
      <ErrorNotification errorMessage = {errorMessage}/>
      <Filter filter={newFilter} handleFilter={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson}/>      
      <h3>Numbers</h3>
      <ul>
        {pers2show.map(person => <Person 
        key={person.id} 
        person = {person} 
        deletePerson={() => deletePerson(person)}/>)}
      </ul>      
    </div>
  )
} 

export default App
