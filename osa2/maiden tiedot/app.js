import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Search from './components/search'

const Rows = ( {maat} ) => 
  maat.map(maa => 
      <li key ={maa}>
        {maa}
      </li>  
  )
  
const Langues = ( {languages} ) =>
  languages.map(langue =>
      <li key = {langue}>
        {langue}
      </li>
  )
  
const DisplayCountry = ( {country, lippu} ) => {
    const countryName = country.name
    const capital = country.capital
    const population = country.population
    const getArray = country.languages
    const getLanguages = getArray.map(langue => langue.name)

  return (
    <div>
      <h1>{countryName} </h1>
        <p>capital {capital} </p> 
        <p>population {population} </p>
        <h2>Languages</h2>
        <Langues
          languages = {getLanguages}
        />
        <img src={lippu} width="128" height="128" />
    </div>
  )
}


const ShowList = ( {oneCountry, maat, lippu} ) => {
  
  const countryNames = maat.map(maa => maa.name)
  console.log(oneCountry);

  if(maat.length > 10) {
    return(
      <p>Too many matches, specify another filter</p>
    )
  }

  if(maat.length < 10 && maat.length > 1) {
      return(
        <div>
          <ul>
            <Rows 
              maat = {countryNames}
              lippu = {lippu}
            />
          </ul>
        </div>
      )
  }

  if(maat.length === 1) {

    return(
      <DisplayCountry 
        country = {maat[0]}
        lippu = {lippu}
      />
    )
  }
  return null
}

const App = () => {
  const [ allCountries, setCountries ] = useState([])
  const [ newSearch, setNewSearch ] = useState('')
  const [ oneCountry, setOneCountry ] = useState('')
  const baseUrl = 'https://restcountries.eu/rest/v2/all?fields=name;capital;population;alpha2Code;flag;languages'
  const search = newSearch.toLowerCase()
  const countries = allCountries.filter(country => country.name.toLowerCase().includes(search))
  let flagTag = null
  let flagImg = ''

  const setInfo = (maa) =>
    setOneCountry(maa)

  // If search gives only one country -- Get flag of that country
  if(countries.length === 1) {
    flagTag = countries[0].alpha2Code
    flagImg = 'https://www.countryflags.io/' + flagTag + '/flat/64.png'
  }

  // Get country information from Restcountries API using all endpoint
  useEffect(() => {
    console.log('getCountries')
    axios
      .get(baseUrl)
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  // Getting user input from the search field
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <Search 
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
      <ShowList 
        maat = {countries}
        lippu = {flagImg}
        oneCountry = {oneCountry}
      />
    </div>
  )
}

export default App;
