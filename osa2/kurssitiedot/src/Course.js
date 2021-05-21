import React from 'react'

const Course =({course}) => {

    const Header = (props) => {
      return (
        <div>
          <b>{props.name}</b>
        </div>
      )
    }
  
  
    const Total = (props) => {
  
      const total = props.parts.reduce((a,c) => a + c )
      return (
        <div>
  
      
      
        <b>Total of {total} exercises  </b>
        </div>
      )
    
    }
  
    
    const Content = (props) => {
      
  
      
      return (
        <div>
          <ul>
          {props.parts.map(d => 
          <li key={d.id}>
            {d.name} {d.exercises}
            </li>
            )}
          </ul>
        </div>
      )
    
    }
  
    return (
  <div>
    
  <Header name={course.name}/>
  
  <Content parts={course.parts} />
  <Total  parts={course.parts.map(d => d.exercises)}/>
  
  
  
  </div>
    )
  }

  export default Course