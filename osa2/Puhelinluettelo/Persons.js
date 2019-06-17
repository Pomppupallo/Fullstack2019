import React from 'react'

const Persons = ({newSearch, persons, deletePerson}) => {
    const search = newSearch.toLowerCase()
    const namesToShow = persons.filter(person => person.name.toLowerCase().includes(search)) 
    
    const rows = () => namesToShow.map((person) => {
        return(
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </div>  
        )
      })
    return rows()
}

export default Persons
