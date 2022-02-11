import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useMutation, useQuery } from '@apollo/client'


const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author
    published
  }

}

`


const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]! ){
addBook(

  title: $title
      author: $author 
      published: $published
      genres: $genres
) {
  title
  author
  published
  genres
  
}


}



`
const EDIT_BORN = gql`
  mutation setBorn($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
      name
      born
    }
  }
`

const All_AUTHORS = gql`
  query {
    allAuthors  {
      name
      id
      born
      bookCount
    }
  }
`


const App = () => {
  const [page, setPage] = useState('authors')

  const [createBook] = useMutation(CREATE_BOOK)

  const [editAuthor] = useMutation(EDIT_BORN)

  const authorResult = useQuery(All_AUTHORS,{
    pollInterval: 2000
  })
  const bookResult = useQuery(ALL_BOOKS,{
    pollInterval: 2000
  })
  
 const addNewBook = (title, author, published, genres) =>{
  
  createBook({variables:{title,author,published,genres}})


 }

 const editAuthorBorn = (name, setBornTo) =>{

  
editAuthor({variables:{name,setBornTo}})

 }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      {authorResult.loading ?  <div>loading...</div> :  <Authors
        show={page === 'authors'}
        authorList = {authorResult.data.allAuthors}
        editAuthor={editAuthorBorn}
        
      />
      }



  
      
{page === 'books' ?  <Books
        
        books = {bookResult.data.allBooks}
      />: null }
      

      <NewBook
        show={page === 'add'}
        addNewBook ={addNewBook}
      />

    </div>
  )
}

export default App