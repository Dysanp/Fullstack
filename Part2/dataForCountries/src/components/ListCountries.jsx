

const showCountry = (country,weatherData) => (
    <div>
        <h1>{country.name.common}</h1>
        <p>
            capital {country.capital}
            <br/>
            area {country.area}
            </p>
            <h2>languages:</h2>
            <ul>
                {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={country.flags.png}/>
            <h3>Weather in {country.capital}</h3>
            {weatherData ? (
                <p>
                    Temperature: {(weatherData.main.temp-273.15).toFixed(2)}°C
                    <br />
                    <img src = {`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} /> 
                    <br />
                    Wind: {weatherData.wind.speed} m/s
                    </p>) 
            : (
                <p>Loading weather...                    
                </p>    
            )}
    </div>
)

const ListCountries = ({filCountries,handleShowButton,weatherData}) => {    
    if (filCountries.length === 0) {
        return null
    }
    else if (filCountries.length > 10) {               
        return <div>Too many matches, specify another filter</div>
    }
    else if (filCountries.length === 1) {
        const country = filCountries[0]
        console.log(weatherData)                
        return showCountry(country,weatherData)
    }
    else {
        return (filCountries.map(country => <div key = {country.name.common}>{country.name.common} <button onClick={()=>handleShowButton(country)}>show</button>    
            </div>))
    }
           
}

export default ListCountries