import blogService from '../services/blogs'


const sortBlogs = (blogs) => {

  blogs.sort(function (a, b){
    return b.votes - a.votes
  })

  return blogs

}



// //const asObject = (anecdote,id) => {
// // return {
// //  content: anecdote,
// // votes: 0,
// //id: id
// //}
// //}



const blogReducer = (state = [], action) => {

  switch(action.type){
  case 'VOTE':{
    const id = action.data.id
    const blogToVote = state.find(n => n.id === id)



    const changedBlog = {
      ...blogToVote,
      votes: blogToVote.votes + 1
    }



    return sortBlogs(state.map(blog =>
      blog.id !== id ? blog : changedBlog
    ))

  }

  case 'NEW_BLOG':
  {

    const blog = action.data
    return sortBlogs(state.concat(blog))
  }
  case 'INIT_BLOGS':
  {
    return sortBlogs(action.data)
  }
  default:
    return state
  }

}


export const voteBlog = (blog) => {

  return async dispatch => {
    const newblog = { content: blog.content,
      id: blog.id,
      votes: blog.votes + 1 }
    const votedBlog = await blogService.update(newblog)
    dispatch({ type: 'VOTE',
      data: { id: votedBlog.id } })
  }



}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}


export const addBlog = content => {
  return async dispatch => {
    const newAnecdote = await blogService.create(content)
    dispatch({ type: 'NEW_BLOG',
      data: newAnecdote })


  }

}



export default blogReducer