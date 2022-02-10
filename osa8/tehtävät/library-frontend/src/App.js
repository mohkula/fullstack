import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from '@apollo/client'


const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author
    published
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
  const authorResult = useQuery(All_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)
  
 

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
        
      />
      }



  
      
{page === 'books' ?  <Books
        
        books = {bookResult.data.allBooks}
      />: null }
      

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App