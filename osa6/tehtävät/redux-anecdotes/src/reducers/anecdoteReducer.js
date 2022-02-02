

const getId = () => (100000 * Math.random()).toFixed(0)

const sortAnecdotes = (anecdotes) => {

  anecdotes.sort(function (a, b){
    return b.votes - a.votes
  })

  return anecdotes

}



const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
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

      const anecdote = asObject(action.data.content)
      return sortAnecdotes(state.concat(anecdote))

      case 'INIT_ANECDOTES':
      return action.data
      default:
        return state
  }

}


export const voteAnecdote = (id) => {
  
  return {type: 'VOTE',
data: {id: id}

}

}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export const addAnecdote = (content) => {
  return {type: 'NEW_ANECDOTE',
data:{content: content.content}}
}

export default reducer