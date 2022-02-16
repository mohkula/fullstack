import React, { useState } from 'react'

const Authors = (props) => {

  const [name,setName] = useState(props.authorList[0].name)
  const [born,setBorn] = useState('')



  if (!props.show) {
    return null
  }
  const authors = props.authorList
  
  const submit = (event) =>{

 
event.preventDefault()
props.editAuthor(name,Number(born))
setName('')
setBorn('')
  }
  

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
<div>
  <p></p>
</div>
      

        {props.token ? 
        <form onSubmit={submit}>
        <h2>set birthyear</h2>
        <div>
          name
<select  onChange={({ target }) => setName(target.value)}>
{authors.map( author =>

<option key={author.id} id="authorsName" value ={author.name}>{author.name} </option>

)}

</select>

          
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
       
        <button type='submit'>edit Author</button>
      </form>


   
        :
        null
        }

</div>
      
  )
}

export default Authors