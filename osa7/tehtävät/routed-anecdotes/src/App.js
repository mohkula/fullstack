import React, { useState } from 'react'
import About from './components/About'
import Footer from './components/Footer'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import {
 
  Switch, Route, Link, useHistory,
  useRouteMatch
} from "react-router-dom"



const Menu = (props) => {

  const match = useRouteMatch('/anecdotes/:id')




  const anecdote = match 
  
    ? props.anecdotes.find( a => Number(a.id) === Number(match.params.id)) 
    : null

  
  const padding = {
    paddingRight: 5


  }
  

  

  return (

    <div>
    <div>
      <Link style={padding} to="/anecdotes">anecdotes</Link>
      <Link style={padding}to="/create">create new</Link>
      <Link style={padding}to="/about">about</Link>
    </div>

    <Switch>
       
        <Route path="/create">
        
          <CreateNew addNew={props.addNew} />
         
         
        </Route>
        <Route path="about">
          <Footer />
        </Route>
       
        <Route path="/anecdotes/:id">
          <AnecdoteList anecdote={anecdote}/>
        </Route>

        <Route path="/anecdotes">
          <AnecdoteList anecdotes={props.anecdotes}/>
        </Route>
        
        <Route path="/">
          <AnecdoteList anecdotes={props.anecdotes}/>
        </Route>
      </Switch>

      </div>


    

    
  )
}







const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {

  
    e.preventDefault()

const anecdoteObject = {
  content:content,
  author:author,
  info:info,
  votes: 0,
  id:0
}


    props.addNew(anecdoteObject)

    
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

const App = () => {
  const history = useHistory()

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])


  const addNew = (anecdoteObject) => {


    const anecdote = anecdoteObject

   
    

    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} added`)

    setTimeout(() => {
        setNotification('')
}, 10000)


    
history.push('/')
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const [notification, setNotification] = useState('')
 


  

  



  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification message={notification}/> 
      <Menu anecdotes={anecdotes} addNew={addNew}/>
     
      <Footer />
    </div>
  )
}

export default App;