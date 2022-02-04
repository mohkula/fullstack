import {
 
     Link,
    
  } from "react-router-dom"


const AnecdoteList = ({ anecdotes, anecdote }) => {


    return(
  
     
    <div>
  
      {anecdote ? <div> {anecdote.content}
    <p> has {anecdote.votes} votes</p>
    <p>for more info see {anecdote.info}</p>
       </div>
       : <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => <li key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`} > {anecdote.content} </Link>
        </li>)}
      </ul>
      </div>
  
  }
    </div>
    )
  }

  export default AnecdoteList