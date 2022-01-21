import React, {useState} from 'react' 
const Blog = ({ blog }) => {
  
  const [visible, setVisible] = useState(false)


  const changeVisibility = () =>{
    setVisible(!visible)
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
return(
  
  <div style={blogStyle}>

    {visible ? 
     
<div>
<div>{blog.title} by {blog.author} </div>
    <div>{blog.url}</div>
 <div>likes: {blog.likes}</div>

{blog.user === undefined ? <p></p> :
<div>{blog.user.username} </div>}

   </div> :
   <div>{blog.title} by {blog.author}</div>} <button onClick={changeVisibility}> {visible ? <div>hide</div> : <div>View</div>}</button>
   
  </div>  
)}

export default Blog