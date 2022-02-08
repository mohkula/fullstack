import React, { useState, useEffect, useRef } from 'react'
//import Blog from './components/Blog'
import blogService from './services/blogs'

import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

import loginService from './services/login'
import Togglable from './components/Togglable'

import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

import { initializeBlogs } from './reducers/blogReducer'
import { addBlog } from './reducers/blogReducer'
import BlogList from './components/Bloglist'


const App = () => {

  const dispatch = useDispatch()




  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    dispatch(initializeBlogs())

  }, [dispatch])

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
      dispatch(setNotification('wrong credentials',5))

    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')

  }


  const createBlog = (blogObject) => {

    console.log(blogObject)

    dispatch(addBlog(blogObject))


    dispatch(setNotification(`a new blog ${blogObject.title} by  ${blogObject.author} added`,5 ))
    blogFormRef.current.toggleVisibility()






  }

  // const removeBlog = async (blogObject) => {
  //   const deletedId = blogObject.id
  //   const deletedTitle = blogObject.title
  //   const deletedAuthor = blogObject.author
  //   if(window.confirm(`Do you want to delete blog ${deletedTitle} by ${deletedAuthor}?` )){


  //     try{
  //       await blogService.remove(blogObject)
  //       setBlogs(blogs.filter(blog => blog.id !== deletedId))
  //       dispatch(setNotification('Blog deleted',5))

  //     }

  //     catch(exception){
  //       dispatch(setNotification('You are not allowed to delete this blog',5))

  //     }
  //   }


  // }


  // const likeBlog = async (blogObject) => {

  //   try{await blogService.update(blogObject)

  //     const blogs = await blogService.getAll()

  //     blogs.sort(function(a,b){
  //       return b.likes -a.likes
  //     })
  //     setBlogs(blogs)


  //   }

  //   catch(exception){
  //     console.log(exception)
  //   }


  // }

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
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )




  return (
    <div>


      <Notification />




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


          <BlogList />

        </div>
      }


    </div>
  )
}

export default App