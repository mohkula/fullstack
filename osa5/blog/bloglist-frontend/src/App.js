import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import Notification from './components/Notification'

import loginService from './services/login' 


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setnewTitle] = useState('')
  const [newAuthor, setnewAuthor] = useState('')

  const [newUrl, setnewUrl] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) =>{
    window.localStorage.removeItem('loggedBlogappUser')

  }


  const addBlog = (event) =>{
    event.preventDefault()


    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
      
    }


    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setnewAuthor('')
        setnewTitle('')
        setnewUrl('')
        
        setNotificationMessage(`a new blog ${blogObject.title} by  ${blogObject.author} added` )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      })
      .catch(error => {
      console.log(error)
      setErrorMessage('failed to add a blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })

    

  }

  const handleAuthorChange = (event) =>{
    setnewAuthor(event.target.value)
  }

  const handleTitleChange = (event) =>{
    setnewTitle(event.target.value)
  }

  const handleUrlChange = (event) =>{
    setnewUrl(event.target.value)
  }

  const logoutForm = () => (
    <div>
      
    <button onClick={handleLogout}> Logout</button>

    </div>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>

<p><h2>log in to the application</h2></p>

      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <div>
      <p><h2>create a new blog</h2></p>
    <form onSubmit={addBlog}>
    title:   <input
        title={newTitle}
        onChange={handleTitleChange}
      />

      <p></p>
       author: <input 
        author={newAuthor}
        onChange={handleAuthorChange}
      />
      <p></p>
       url: <input
        url={newUrl}
        onChange={handleUrlChange}
      />
      <button type="submit">create</button>
    </form>  

    </div>
  )


  return (
    <div>
      

      <Notification message={errorMessage} />
      <Notification message={notificationMessage} />



      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged in</p> 
        {logoutForm()}

        <h2>blogs</h2>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
        {blogForm()}
      </div>
    }

    
    </div>
  )
}

export default App