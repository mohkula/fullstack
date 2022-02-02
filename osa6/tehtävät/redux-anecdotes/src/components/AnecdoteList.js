import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'



const AnecdoteList = (props) =>{

    const anecdotes = useSelector(({ filter, anecdotes }) => {
      if ( filter === 'ALL' ) {
        return anecdotes
      }
      return anecdotes.filter(anecdote => anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    })

    const dispatch = useDispatch()

    const vote = (anecdote) => {
   
        dispatch(voteAnecdote(anecdote))
        
        dispatch(setNotification(`you voted ${anecdote.content}`,5))
        

      }

    return( 
<div>
<h2>Anecdotes</h2>

<Filter />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>


        </div>
      )}
</div>
    )

}

export default AnecdoteList
