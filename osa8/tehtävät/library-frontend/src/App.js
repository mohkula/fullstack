import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useMutation, useQuery, useApolloClient} from '@apollo/client'

import LoginForm from './components/login'


const ALL_BOOKS = gql`
query {
  allBooks {
    title
    
    published
    author{
      name
    }
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

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`


const App = () => {

  const client = useApolloClient()
  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    }
  })


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const [token, setToken] = useState(null)


  const [page, setPage] = useState('authors')

  const [createBook] = useMutation(CREATE_BOOK)

  const [editAuthor] = useMutation(EDIT_BORN)

  

  const authorResult = useQuery(All_AUTHORS,{
    pollInterval: 2000
  })
  const bookResult = useQuery(ALL_BOOKS,{
    pollInterval: 2000
  })
  

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      console.log("token: ", token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line


  const handleLogin = async ({username, password}) => {


   await login({ variables: { username, password } })
    setPage('authors')
  }

 const addNewBook = (title, author, published, genres) =>{
  
  createBook({variables:{title,author,published,genres}})


 }

 const editAuthorBorn = (name, setBornTo) =>{

  
editAuthor({variables:{name,setBornTo}})

 }

 const loggedView = () =>{
   return (
     <div>
 <button onClick={() => setPage('add')}>add book</button>
 <button onClick={logout}>logout</button>
 </div>
   )
 }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
       

        {!token ?        
      
        <button onClick={() => setPage('login')}>log in</button>

        :
loggedView()
        }
      </div>

      {page === 'login' ?  
        <div>
      
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          handleLogin={handleLogin}
        />
      </div>
      : null }

      {authorResult.loading ?  <div>loading...</div> :  <Authors
        show={page === 'authors'}
        authorList = {authorResult.data.allAuthors}
        editAuthor={editAuthorBorn}
        token={token}
        
        
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