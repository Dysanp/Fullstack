import { useState, useEffect } from 'react'
import Finder from './components/Finder'
import axios from 'axios'
import ListCountries from './components/ListCountries'


const api_key = import.meta.env.VITE_API_KEY

function App() {
  const [finder, setFinder] = useState('')
  const [countries,setCountries] = useState([])
  const [weatherData, setWeatherData] = useState(null)
  const [lastCountry, setLastCountry] = useState('')
  const [weatherIcon, setWeatherIcon] = useState(null)
   
  const handleFinder = (event) => {
    const finderChange = event.target.value 
    setFinder(finderChange)   
  } 

  const filCountries = (finder === '')
  ? []
  : countries.filter(country => country.name.common.toLowerCase().includes(finder.toLowerCase()))


  useEffect(()=>{
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountries(response.data)
    })
    .catch(error => {
      console.log('Error fetching the data')
    })            
  },[])
  
  useEffect(()=>{
    if (filCountries.length === 1) {              
      if (lastCountry !== filCountries[0].name.common) {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${filCountries[0].capital[0]}&APPID=${api_key}`)
            .then(response => {
                setWeatherData(response.data)
                setLastCountry(filCountries[0].name.common)
            })
            .catch(error => {
              console.log('Error fetching the data')
            })               
      }                   
    } else {
      setWeatherData(null)
      setLastCountry('')
    }           
      
  },[filCountries])

  const handleShowButton = (country) => {
    setFinder(country.name.common)
  }

  return (
    <>
      
      <Finder finder = {finder} handleFinder={handleFinder}/>      
      <ListCountries filCountries={filCountries} handleShowButton={country=>handleShowButton(country)}  weatherData={weatherData}/>
                       
    </>
  )
}

export default App
