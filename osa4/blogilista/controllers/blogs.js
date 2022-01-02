const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
  
  })

  blogsRouter.get('/:id', async (request, response) => {

    const blogs = await Blog.find({})

    const id = Number(request.params.id)
    const blog = blogs[id-1]
    response.json(blog)
    
    })
  
  blogsRouter.post('/', async (request, response) => {
    
    const blog = new Blog(request.body)

    if(blog.title === undefined || blog.author === undefined){
      return response.status(400).json({ error: 'content missing' })
    }
  
    await blog.save()
    response.status(201)

    
      
  })

  blogsRouter.delete('/:id', async (request, response) => {

    
    const blogs = await Blog.find({})

    const id = Number(request.params.id)

    const blogId = blogs[id-1].id
    
    await Blog.findByIdAndRemove(blogId)
  response.status(204).end()
  
    })
  



module.exports = blogsRouter