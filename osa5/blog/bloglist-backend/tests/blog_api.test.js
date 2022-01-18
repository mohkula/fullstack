const mongoose = require('mongoose')

const supertest = require('supertest')
const app = require('../app')

const User = require('../models/user')

const api = supertest(app)
const Blog = require('../models/blog')

const bcrypt = require('bcrypt')



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

  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const userInDB = new User({ username: 'root', passwordHash })

  await userInDB.save()
})

test('adding a blog increases total blogs by one', async () =>{

  const user = await api.post('/api/login')
  .send({
    "username": "root",
    "password": "sekret"
  
  })
  .expect(200)

  const token = user.body.token

  



  const blogs = await api.get('/api/blogs')

  

  const newBlog = new Blog({
    "title": "blogi3",
      "author": "blogimies",
      "url": "http://blogi",
      "likes": 61
  })

const a = await api.post('/api/blogs')
.set({Authorization: "bearer " + token})
.send(newBlog)


console.log(a.body)





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




  test('Id is defined', async () => {
    const result = await api.get('/api/blogs')

    const blogs = result.body

    blogs.map(blog => {
      expect(blog.id).toBeDefined();
    })
  
  });

