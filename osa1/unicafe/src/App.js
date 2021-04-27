import React, { useState } from 'react'

const DisplayFeedback = () => {


  return (
    <div>
      <b>Give feedback</b>
    </div>
  )
}

const Button = ({handleClick,text}) => {
  

  return (
<button 
  onClick={handleClick}>{text}
</button>
    
  )
}

const StatisticLine = (props) => {
  
  return(
      <tr>
      <td>
      {props.text}
      </td>
       <td>
       {props.value}
         </td>
         </tr>
  )
}

const Statistics = (props) => {
const all = props.goodn + props.badn + props.neutraln

if(all === 0){

  return (
    <div>
      No feedback given
    </div>
  )
}

  return ( 

    
    
      <div>

        <p>
        <b>Statistics</b>
          </p> 

          <table>
            <tbody>
            
           <StatisticLine text='good' value={props.goodn}/>       
           <StatisticLine text='neutral' value={props.neutraln}/>
           <StatisticLine text='bad' value={props.badn}/>
           <StatisticLine text='all' value={all}/>
           <StatisticLine text='average' value={(props.goodn - props.badn)/all}/>
           <StatisticLine text='positive' value={(props.goodn/all)*100 + '%'}/>
           </tbody>
          </table>


          
   
    

      </div>
      





  )




}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick =() => {
   
    setGood(good + 1)
  }

  const neutralClick =() => {
   
    setNeutral(neutral + 1)
  }

  const badClick =() => {
   
    setBad(bad + 1)
  }


  return (
    <div>
      <DisplayFeedback/>
    <Button handleClick={goodClick} text='good' />
    <Button handleClick={neutralClick} text='neutral' />
    <Button handleClick={badClick} text='bad' />

    <Statistics goodn={good} badn={bad} neutraln={neutral} />
    </div>
  )
}

export default App