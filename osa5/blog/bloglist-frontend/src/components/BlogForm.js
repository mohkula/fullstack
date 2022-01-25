
import React, { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({ createBlog }) => {

  const [newAuthor, setnewAuthor] = useState('')
  const [newTitle, setnewTitle] = useState('')
  const [newUrl, setnewUrl] = useState('')



  const handleAuthorChange = (event) => {
    setnewAuthor(event.target.value)
  }
  const handleTitleChange = (event) => {
    setnewTitle(event.target.value)
  }
  const handleUrlChange = (event) => {
    setnewUrl(event.target.value)
  }

  const addBlog = (event) => {

    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

  }

  return (
    <div>
      <p>create a new blog</p>
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
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm