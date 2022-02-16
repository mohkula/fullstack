const { gql } = require('apollo-server')


const typeDefs = gql`
    type Author {
        name: String!
        id: String!
        born: String
        bookCount: Int!

    }

    type Book {
        title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
    }


  type Query {
      authorCount: Int!
      bookCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
     
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
     
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!

    ): Author
  }

`

module.exports = typeDefs