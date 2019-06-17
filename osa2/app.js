import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import noteService from './services/notes'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ message, setMessage] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="message">
        {message}
      </div>
    )
  }

  const ErrNotification = ({ errorMessage }) => {
    if (errorMessage === null) {
      return null
    }

    return (
      <div className="errMessage">
        {errorMessage}
      </div>
    )
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (!names.includes(newName)) {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      noteService
        .create(nameObject)
        .then(returnedNote => {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
      setMessage(`Henkilö '${newName}' added to phonebook`)
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    })
    } else {
      const test = window.confirm(`${newName} on jo luettelossa, vaihdetaanko uusi numero tilalle?`)
      if (test) {
        const index = persons.findIndex(person => person.name === newName)
        console.log(persons[index].id)
        const nameObject = {
          name : newName,
          number: newNumber
        }
        noteService
          .update(persons[index].id, nameObject)
          .then(returnedNote => {
          setNewName('')
          setNewNumber('')
          })
        setPersons(persons)
      }
    }
  }

  const deletePerson = (id) => {
    if (window.confirm("Varmastiko?")) {
      noteService
      .destroy(id)
      .then(returnedNote => {
        setMessage(`Henkilö was deleted from server`)
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
      .catch(error => {
        setErrorMessage(`the person was already deleted from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      })

      setPersons(persons.filter(p => p.id !== id))
    }
}

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification
        message = {message}
      />
      <ErrNotification
        errorMessage = {errorMessage}
      />
      <Filter 
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
      <h3>lisää uusi</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numerot</h2>
      <Persons
        newSearch={newSearch}
        persons={persons}
        deletePerson={deletePerson}
      />
    </div>
  )

}

export default App;
