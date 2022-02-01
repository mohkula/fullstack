import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) =>{
    const anecdotes = useSelector(state => state.anecdotes)

    const dispatch = useDispatch()

    const vote = (id, content) => {
   
        dispatch(voteAnecdote(id))
        
        dispatch(setNotification(`you voted ${content}`))
        setTimeout(() => {
          dispatch(setNotification(''))
        }, 5000)

      }

    return( 
<div>
<h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>


        </div>
      )}
</div>
    )

}

export default AnecdoteList
