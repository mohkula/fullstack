const mongoose = require('mongoose')

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')


const initialBlogs = [

  {
      
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
        
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 25,
        __v: 0
      },
      {
        
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 15,
        __v: 0
      },

]


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('adding a blog increases total blogs by one', async () =>{
  const blogs = await api.get('/api/blogs')

  const newBlog = new Blog({
    "title": "blogi3",
      "author": "blogimies",
      "url": "http://blogi",
      "likes": 61
  })

  await newBlog.save()

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(blogs.body.length + 1)

})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
  })

test('likes field default is 0', async () =>{

  const blogWithoutLikes = new Blog({
    "title": "blogi3",
      "author": "blogimies",
      "url": "http://blogi"
      
  })

 await blogWithoutLikes.save()

  const response = await api.get('/api/blogs')

  expect((response.body[response.body.length -1]).likes).toBe(0)
})


test('no title returns bad request', async () =>{
  const blogWithoutTitle = new Blog({
    
      "author": "blogimies",
      "url": "http://blogi"
      
  })
const response = await api.post(blogWithoutTitle)
expect(response.status).toBe(400)



})

test('delete blog', async () => {
  const result = await api.delete('/2')
 
})


  test('Id is defined', async () => {
    const result = await api.get('/api/blogs')

    const blogs = result.body

    blogs.map(blog => {
      expect(blog.id).toBeDefined();
    })
  
  });

