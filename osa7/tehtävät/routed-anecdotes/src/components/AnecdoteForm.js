


import useField from "../hooks"


const AnecdoteForm = (props) => {



    const {reset:_remove0, ...content} = useField('text')
    const {reset:_remove1, ...author} = useField('text')
    const {reset:_remove2, ...info} = useField('text')
    
  
  
    const handleSubmit = (e) => {
  
    
      e.preventDefault()
  
  const anecdoteObject = {
    content:content.value,
    author:author.value,
    info:info.value,
    votes: 0,
    id:0
  }
  
  
      props.addNew(anecdoteObject)
  
      
    }

    const resetFields = ()=>{

        
content.reset()
author.reset()
info.reset()
       
    }












    
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content  } />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
            
          </div>
          <button type="submit"> create</button>
        </form>

        <button onClick={resetFields} >reset</button>

       
        
      </div>
    )
  
  }


  export default AnecdoteForm