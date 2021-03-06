import React, { useState } from 'react'
const Blog = ({ blog, like, remove, loggedUsername }) => {

  const [visible, setVisible] = useState(false)


  const changeVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {

    const likes = blog.likes + 1
    like({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes : likes,
      user: blog.user.id,
      id: blog.id
    })
  }

  const handleRemove = () => {
    remove({ title: blog.title,
      author: blog.author,
      url: blog.url,
      likes : blog.likes,
      id : blog.id })
  }




  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return(

    <div style={blogStyle}>

      {visible ?

        <div className='blog'>
          <div>{blog.title} by {blog.author} </div>
          <div>{blog.url}</div>
          <div>likes: {blog.likes} <button onClick={handleLike}> like </button></div>

          {blog.user.username === undefined ? <p>no user found</p> :
            <div>{blog.user.username} </div>}

          {blog.user.username === loggedUsername ? <button onClick={handleRemove} style={{ color: 'red' }}  >Remove</button> :null}

        </div> :
        <div>{blog.title} by {blog.author}</div>} <button onClick={changeVisibility}> {visible ? <div>hide</div> : <div>view</div>}</button>

    </div>
  )}

export default Blog