import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) =>{

    const dispatch = useDispatch()


    const newAnecdote = (event) =>{
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(anecdote))

        dispatch(setNotification(`you added ${anecdote}`))
        setTimeout(() => {
          dispatch(setNotification(''))
        }, 5000)
      }


return (
<div>
    <h2>create new</h2>
    <form onSubmit={newAnecdote}>
     <input name="anecdote"/>
      <button type="submit">create</button>
    </form>

    </div>
)

}

export default AnecdoteForm