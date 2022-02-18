



const Books = ({ books,genres,handleGenreChoice, favorite, filteredBooks }) => {
  








  
return (

    
    <div>


      <h2>books</h2>

      <h3>in genre: {favorite ? <div>{favorite} </div>: <div>all</div>}</h3>

     

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          
{filteredBooks.data && favorite !== 'all' ? 

filteredBooks.data.allBooks.map(a =>
  <tr key={a.title}>
    <td>{a.title}</td>
    <td>{a.author.name}</td>
    <td>{a.published}</td>
  </tr>
)

:

 books.map(a =>
  <tr key={a.title}>
    <td>{a.title}</td>
    <td>{a.author.name}</td>
    <td>{a.published}</td>
  </tr>
)




}

         
         
        </tbody>
      </table>

      <div>

           <h2>genres </h2>

           {genres.map( genre => {

            return(
             
            <li style={{display: 'inline'}} key = {genre}>
                <button onClick={() => handleGenreChoice(genre)}>{genre}</button>
                </li>

            )

           })

          
           
           }

           <div>
<button onClick={() => {
  handleGenreChoice(null)

}


}



>Show all</button>
</div>

      </div>

    </div>


  )
}

export default Books