
import anecdoteService from '../services/anecdotes'


const sortAnecdotes = (anecdotes) => {

  anecdotes.sort(function (a, b){
    return b.votes - a.votes
  })

  return anecdotes

}



const asObject = (anecdote,id) => {
  return {
    content: anecdote,
    votes: 0,
    id: id
  }
}



const reducer = (state = [], action) => {

  switch(action.type){
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(n => n.id === id)

      
      const changedAnecdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes + 1
      }

      

      return sortAnecdotes(state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      ))

      case 'NEW_ANECDOTE':

      const anecdote = asObject(action.data.content, action.data.id)
      return sortAnecdotes(state.concat(anecdote))

      case 'INIT_ANECDOTES':
      return sortAnecdotes(action.data)
      default:
        return state
  }

}


export const voteAnecdote = (anecdote) => {

  return async dispatch => {
    const newAnecdote = {content: anecdote.content,
    id: anecdote.id,
  votes: anecdote.votes + 1}
    const votedAnecdote = await anecdoteService.update(newAnecdote)
    dispatch({type: 'VOTE',
    data: {id: votedAnecdote.id}})
  }

 

}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}


export const addAnecdote = content => {
  return async dispatch =>{
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({type: 'NEW_ANECDOTE',
    data: newAnecdote})


  }
  
}



export default reducer