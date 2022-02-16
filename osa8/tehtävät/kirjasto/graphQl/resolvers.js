const {  UserInputError } = require('apollo-server')
const { argsToArgsConfig } = require('graphql/type/definition')


const Author = require('./../author')
const Book = require('./../book')



const resolvers = {
    Query: {
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
      addBook: async(root, args) => {

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
        
      
  
      editAuthor: async(root, args) => {

        const authors = await Author.find({})

        const authorToEdit = authors.find(author => author.name === args.name)
        const updatedAuthor = {name: authorToEdit.name,
        born: args.setBornTo,
        bookCount: authorToEdit.bookCount}
        await Author.findByIdAndUpdate(authorToEdit.id,updatedAuthor )
        
        
        return updatedAuthor
  
      },
  
    }
  }
  module.exports = resolvers