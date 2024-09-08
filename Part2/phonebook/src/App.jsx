import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(result => {
        setPersons(result.data)
      })
  }
  useEffect(hook,[])


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [Id,setId] = useState(2)
  const [newFilter, setNewFilter] = useState('')
  const [useFilter, setUseFilter] = useState(false)

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
      number: newNumber,
      id: Id
    }
    if (!persons.some(person => person.name === p2a.name)) {
      setPersons(persons.concat(p2a))
      setId(Id+1)
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  const pers2show = useFilter
    ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleFilter={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson}/>      
      <h3>Numbers</h3>
      <Persons persons={pers2show} />
    </div>
  )
}

export default App
