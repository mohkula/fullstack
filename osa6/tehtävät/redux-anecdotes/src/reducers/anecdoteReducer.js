

const getId = () => (100000 * Math.random()).toFixed(0)

const sortAnecdotes = (anecdotes) => {

  anecdotes.sort(function (a, b){
    return b.votes - a.votes
  })

  return anecdotes

}

const anecdotesAtStart = sortAnecdotes([
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
])

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {

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

      
      default:
        return state
  }

}


export const voteAnecdote = (id) => {
  
  return {type: 'VOTE',
data: {id: id}

}

}

export const addAnecdote = (content) => {
  return {type: 'NEW_ANECDOTE',
data:{content: content}}
}

export default reducer