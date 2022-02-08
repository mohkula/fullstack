import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'



const BlogList= () => {


  const blogs = useSelector(({ blogs }) => {

    return blogs


  })

  const dispatch = useDispatch()

  const vote = (blog) => {

    dispatch(voteBlog(blog))

    dispatch(setNotification(`you voted ${blog.content}`,5))


  }

  return(
    <div>
      <h2>blogs</h2>


      {blogs.map(blog =>
        <div key={blog.id}>
          <div>
            {blog.title} by {blog.author}
          </div>
          <div>
            for more info: {blog.url}
          </div>
          <div>
            has {blog.likes} likes
            <button onClick={() => vote(blog)}>Like</button>
          </div>


        </div>
      )}
    </div>
  )

}

export default BlogList

