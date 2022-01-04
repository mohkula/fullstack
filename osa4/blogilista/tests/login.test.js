const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const User = require('../models/user')

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')





beforeEach(async () => {

  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'mmmm',
      name: 'mmm',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'mmm',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      
   
    

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with too short password', async () => {

    const newUser = {
      username: 'rrrr',
      name: 'mmm',
      password: 'ss',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

      expect(result.body.error).toContain('Password too short')

  })

  test('creation fails with no username', async () => {

    const newUser = {
      
      name: 'mmm',
      password: 'sdds',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

      expect(result.body.error).toContain('No username given')

  })