import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

import loginService from './services/login'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])


  const [notificationMessage, setNotificationMessage] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    const sortBlogs = (blogs) => {
      const sorted = blogs.sort(function(a,b){
        return a.likes -b.likes
      })
      return sorted

    }
    blogService.getAll().then(blogs =>

      setBlogs( sortBlogs(blogs) )

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')

  }


  const createBlog = (blogObject) => {

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))


        setNotificationMessage(`a new blog ${blogObject.title} by  ${blogObject.author} added` )
        blogFormRef.current.toggleVisibility()
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

  const removeBlog = async (blogObject) => {
    const deletedId = blogObject.id
    const deletedTitle = blogObject.title
    const deletedAuthor = blogObject.author
    if(window.confirm(`Do you want to delete blog ${deletedTitle} by ${deletedAuthor}?` )){


      try{
        await blogService.remove(blogObject)
        setBlogs(blogs.filter(blog => blog.id !== deletedId))
        setNotificationMessage('Blog deleted')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      }

      catch(exception){
        setErrorMessage('You are not allowed to delete this blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }


  }


  const likeBlog = async (blogObject) => {

    const response = await blogService.update(blogObject)
    setBlogs(blogs.map(blog => blog.id !== response.id ? blog : blogObject ))



    setBlogs(blogs.map(blog => blog.id !== response.id ? blog : blogObject ))




  }

  const blogFormRef =useRef()







  const logoutForm = () => (
    <div>

      <button onClick={handleLogout}> Logout</button>

    </div>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>

      <p>log in to the application</p>

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

          <Togglable buttonLabel = "create new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={createBlog}


            />

          </Togglable>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} like={likeBlog} remove={removeBlog} loggedUsername={user.username}/>
          )}
        </div>
      }


    </div>
  )
}

export default App