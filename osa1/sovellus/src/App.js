import React from 'react'



const Header = (props) => {

  return (
    <div>
      <b>{props.course}</b>
    </div>
  )

}

const Part = (props) => {

  return (
    <div>

      Kurssi: {props.name}, tehtävämäärä: {props.ex}
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name = {props.parts[0].name} ex = {props.parts[0].exercises}/>
      <Part name = {props.parts[1].name} ex = {props.parts[1].exercises}/>
      <Part name = {props.parts[2].name} ex = {props.parts[2].exercises}/>
    </div>
  )

}



const Total = (props) => {

  return (
    <div>
    Total number of exercises: {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises }
    </div>
  )

}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
     <Header course={course.name} />
     <Content parts = {course.parts} />

     <Total total = {course.parts} />
    </div>
  )
}

export default App
