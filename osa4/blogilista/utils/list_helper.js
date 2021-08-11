const dummy = (blogs) => {
    return 1
  }

  let totalLikes = (blogs) => {
      var likes = 0
      blogs.map( blog =>{
        likes += (blog.likes)
      })
    return likes
  }
  
  module.exports = {
    dummy,
    totalLikes
  }