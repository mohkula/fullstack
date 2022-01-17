const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { urlencoded } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')





blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs.map(blog => blog.toJSON()))
  
  })

  blogsRouter.get('/:id', async (request, response) => {

    const blogs = await Blog.find({})

    const id = Number(request.params.id)
    const blog = blogs[id-1]
    response.json(blog)
    
    })
  
  blogsRouter.post('/', async (request, response) => {
  
    const body = request.body

    

    const token = request.token

    
    
    let decodedToken = null
    try {
     decodedToken = jwt.verify(token, process.env.SECRET)

    } catch (error) {
      
      return response.status(401).json({ error: 'token missing or invalid' })

    }
    
    if (!token || !decodedToken.id) {
      
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = request.user

    


    const users = await User.find({})

    


    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id

    })

    if(blog.title === undefined || blog.author === undefined){
      return response.status(400).json({ error: 'content missing' })
    }
  
    const savedBlog = await blog.save()


    user.blogs = user.blogs.concat(savedBlog._id)
 
    await user.save()

    response.json(savedBlog.toJSON())
    
      
  })

  blogsRouter.delete('/:id', async (request, response) => {


    const token = request.token

    
    
    let decodedToken = null
    try {
     decodedToken = jwt.verify(token, process.env.SECRET)

    } catch (error) {
      
      return response.status(401).json({ error: 'token missing or invalid' })

    }
    
    if (!token || !decodedToken.id) {
      
      return response.status(401).json({ error: 'token missing or invalid' })
    }


    const blogs = await Blog.find({})

    const id = Number(request.params.id)

    const blogId = blogs[id-1].id

    const blogToDelete = await Blog.findById(blogId)

  

    const user =request.user

    if(blogToDelete.user.toString() !== user.id.toString()){

      return response.status(401).json({ error: 'Unauthorized to delete this blog' })

     
    }

    await Blog.findByIdAndRemove(blogId)
    response.status(204).end()


    
   
  
    })

    blogsRouter.put('/:id', async (request,response) =>{

      const body = request.body

      const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
      }

      const blogs = await Blog.find({})

    const id = Number(request.params.id)

    const blogId = blogs[id-1].id

     await Blog.findByIdAndUpdate(blogId, blog, {new: true})

     response.status(201)
    })
  



module.exports = blogsRouter