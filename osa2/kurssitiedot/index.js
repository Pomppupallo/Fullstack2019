//Kurssitiedot osa 2.5 erillinen moduuli

import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course'

const App = () => {

    const courses = [ 
    {
        name: 'Half Stack -sovelluskehitys',
        id: 1,
        parts: [
            {
            name: 'Reactin perusteet',
            exercises: 10,
            id: 1
            },
            {
            name: 'Matematiikka',
            exercises: 15,
            id: 2
            },
            {
            name: 'Tiedonvälitys propseilla',
            exercises: 7,
            id: 3
            },
            {
            name: 'Komponenttien tila',
            exercises: 14,
            id: 4
            }
        ]
    },
    {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewaret',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]

    return (
      <div>
        <h1>Opetusohjelma</h1>
        <Course course = {courses} />
      </div>
    )
  }
  
  ReactDOM.render(<App />, document.getElementById('root'))
