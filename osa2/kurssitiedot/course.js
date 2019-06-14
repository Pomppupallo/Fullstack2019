import React from 'react'

const Content = ({ parts }) => parts.map((part) => 
        <Part 
            key={part.id}
            exerciseTitle = {part.name} 
            exercises = {part.exercises} 
        />
)

const Part = ({ exerciseTitle, exercises }) => {
    return(
        <p>{exerciseTitle} {exercises} </p>
    )
}

const Header = ({ courseTitle }) => {
    return (
        <h1>{courseTitle}</h1>
    )
}

const Total = ({ parts }) =>  {
    const exercisesAmount = parts.map((part => part.exercises))
    const total = exercisesAmount.reduce( (s, p) => s + p)
    
    return (
        <p>yhteensä {total} tehtävää</p>
    )
}

const Course = ({ course }) => course.map((course, i) => {
    return(
        <div key={course.id}>
        <Header 
            courseTitle = {course.name} 
        />
        <Content parts = {course.parts}/>
        <Total parts = {course.parts}/>
        </div>   
    )
})

export default Course
