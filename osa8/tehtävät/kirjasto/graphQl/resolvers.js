const {  UserInputError, AuthenticationError } = require('apollo-server')
const { argsToArgsConfig } = require('graphql/type/definition')

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'


const Author = require('./../author')
const Book = require('./../book')
const User = require('./../user')



const resolvers = {
    Query: {

      me: (root,args,context) =>{
        return context.currentUser
      },
  authorCount: () => Author.collection.countDocuments(),
  bookCount: () => Book.collection.countDocuments(),
  
  allBooks: async(root,args) => { 
    
 
  let returnedBooks = await Book.find({}).populate('author', 'name')

  
    if(args.genre){
       returnedBooks = returnedBooks.filter(book => book.genres.includes(args.genre))
  
    }
  
  
    if(args.author){
      returnedBooks =  returnedBooks.filter(book => book.author === args.author)
      }
      
    return returnedBooks
  
  },
  allAuthors: async(root, args) => { 
    
     const authors =  await Author.find({})
       return authors
     
      
    }
  },
  
   
  
    Mutation: {
      addBook: async(root, args, context) => {

        const currentUser = context.currentUser

        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }

       let author = await Author.find({name: {$in: args.author}})
       if(author.length === 0){

        const newAuthor = new Author({
          name: args.author,
          bookCount: 1
        })

      try{  await newAuthor.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      const newBook = new Book({
        ...args, author: newAuthor.id
      })

      try{
        await newBook.save()
        }
        
        catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })

       
   
       }
       return newBook
      }



       const newBook = new Book({
        ...args, author: author[0].id
      })

try{
await newBook.save()
}

catch (error) {
  throw new UserInputError(error.message, {
    invalidArgs: args,
  })
}
const updatedAuthor = {name: author[0].name, 
  born: author[0].born,
  bookCount: (author[0].bookCount +1)}
await Author.findByIdAndUpdate(author[0].id, updatedAuthor)



     
return newBook
      

        },
        
      
  
      editAuthor: async(root, args, context) => {

        const currentUser = context.currentUser

        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }

        const authors = await Author.find({})

        const authorToEdit = authors.find(author => author.name === args.name)
        const updatedAuthor = {name: authorToEdit.name,
        born: args.setBornTo,
        bookCount: authorToEdit.bookCount}
        await Author.findByIdAndUpdate(authorToEdit.id,updatedAuthor )
        
        
        return updatedAuthor
  
      },
  

      createUser: async (root, args) => {
        const user = new User({ username: args.username,
        favoriteGenre: args.favoriteGenre })
    
        return user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new UserInputError("wrong credentials")
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      },


    }
  }
  module.exports = resolvers