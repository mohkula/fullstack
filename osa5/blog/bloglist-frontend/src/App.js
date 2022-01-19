import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import loginService from './services/login' 


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setnewTitle] = useState('')
  const [newAuthor, setnewAuthor] = useState('')

  const [newUrl, setnewUrl] = useState('')


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

    //console.log(blogObject)

    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setnewAuthor('')
        setnewTitle('')
        setnewUrl('')
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
      <h2>blogs</h2>

      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged in</p> 
        {logoutForm()}
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