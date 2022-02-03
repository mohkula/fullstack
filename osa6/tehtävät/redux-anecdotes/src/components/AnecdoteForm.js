import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'



const AnecdoteForm = (props) =>{




    const newAnecdote = async (event) =>{
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''


         
    props.addAnecdote(anecdote)

    props.setNotification(`you added ${anecdote}`,5)

        
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


const mapDispatchToProps = {
    addAnecdote,
    setNotification
  }
  
  const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
  
  )(AnecdoteForm)

export default ConnectedAnecdoteForm