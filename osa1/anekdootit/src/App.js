import React, { useState } from 'react'



const Random = (max) => {

  return Math.floor(Math.random() * max)
}

const Button = ({handleClick,text}) => {
  

  return (
<button 
  onClick={handleClick}>{text}
</button>
    
  )
}

const MostVoted = (props) => {


const anecdotes = props.anecdotes
const votes = props.votes
let mostVotedIndex = 0

console.log(anecdotes)
console.log(votes)

for(let i = 0; i < votes.length; i++){
  if(votes[i] > votes[mostVotedIndex]){
    mostVotedIndex = i
  }
}

if(votes[mostVotedIndex] === 0){
  return (

    <p>No votes given yet</p>
  )
}







return (

  <p>{anecdotes[mostVotedIndex]}</p>
)
  }




const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, addVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0)) 
  
 

  const nextAnecdote = () => {
    
    setSelected(Random(anecdotes.length))
  }

  const addVote = () => {

    const newVotes = [...votes]
    newVotes[selected]+=1
    addVotes(newVotes)
 
  }





  return (
    <div>
      <p> <b>Anecdote of the day</b> </p>
     <p> {anecdotes[selected]}</p>
     <p>has {votes[selected]} votes </p>

      <Button handleClick={nextAnecdote} text='next anecdote'/>
      <Button handleClick={addVote} text='vote'/>

      <p> <b>Anecdote with the most votes</b> </p>
      
<MostVoted anecdotes={anecdotes} votes={votes}/>

    </div>
  )
}

export default App