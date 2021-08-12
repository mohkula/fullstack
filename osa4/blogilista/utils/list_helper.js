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
  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
  }