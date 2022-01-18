const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
      var likes = 0
      blogs.map( blog =>{
        likes += (blog.likes)
      })
    return likes
  }

const favouriteBlog = (blogs) =>{
  var favBlog = blogs[0]

  blogs.map(blog =>{
    if (blog.likes > favBlog.likes){
      favBlog = blog
    } 
  })

  return favBlog
}

const mostBlogs = (blogs) =>{
  blogs.sort(function(a,b){
    return a.author.localeCompare(b.author)
  })
  
  var authorWithMostBlogs = blogs[0].author
  var mB = 0
  var helper = 0
  var currentAuthor = blogs[0].author
  for(var i = 0; i < blogs.length; i++ ){
    if(blogs[i].author === currentAuthor){
      helper ++

    }
    else{
      
      if (helper > mB){
        mB = helper
        authorWithMostBlogs = currentAuthor
        
      }
      currentAuthor = blogs[i].author
        helper = 0
    }

  }
  helper++
  
  if (helper > mB){
    authorWithMostBlogs = currentAuthor
    mB = helper

  }

  return {"author": authorWithMostBlogs,
  "blogs": mB
  
  }

}


const mostLikes = (blogs) => {

  const allAuthors = [... new Set(blogs.map(blog => blog.author))]
  
  var authorAndLikes = []
  allAuthors.map(author =>{

    authorAndLikes[author] = 0

  })

  blogs.map(blog =>{
    authorAndLikes[blog.author] += blog.likes
  })

var mostLikedAuthor 
var helper = 0
for(var i = 0; i < allAuthors.length; i++){
  if(authorAndLikes[allAuthors[i]] > helper){
    helper = authorAndLikes[allAuthors[i]]
    mostLikedAuthor = allAuthors[i]
  }
}

return {"author": mostLikedAuthor,
"likes": helper}
}


  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
  }