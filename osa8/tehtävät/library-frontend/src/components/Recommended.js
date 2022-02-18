

const Recommended = ({books, favGen, userInfo}) =>{

  


    if(!books.data){
        return(
            <div>

                ...loading
            </div>
        )
    }
    

    return (

        <div>

     
<h2>Here are books recommended to you in the  "{favGen}" genre:</h2>


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
  

  {books.data.allBooks.map(a =>
<tr key={a.title}>
<td>{a.title}</td>
<td>{a.author.name}</td>
<td>{a.published}</td>
</tr>
)}


 
 
</tbody>
</table>

        </div>
        
    )

}


export default Recommended