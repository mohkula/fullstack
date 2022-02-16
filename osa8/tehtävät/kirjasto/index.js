const { ApolloServer, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const typeDefs = require('./graphQl/typedefs')
const resolvers = require('./graphQl/resolvers')

const Author = require('./author')
const Book = require('./book')



const MONGODB_URI = `mongodb+srv://fullstack:salainen@cluster0.bgklv.mongodb.net/kirjasto?retryWrites=true&w=majority`

console.log('connecting to', MONGODB_URI)


mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })








const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})