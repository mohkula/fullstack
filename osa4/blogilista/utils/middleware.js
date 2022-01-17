const { response } = require("express")
const jwt = require('jsonwebtoken')
const User = require('../models/user')



const tokenExtractor = (request, response, next) => {
  
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7)
      
    }
    

    next()
  }

  const userExtractor = async(request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      const token = authorization.substring(7)

      try {
        decodedToken = jwt.verify(request.token, process.env.SECRET)
        const extractedUser = await User.findById(decodedToken.id)
      
      request.user = extractedUser
   
       } catch (error) {
         
         return response.status(401).json({ error: 'token missing or invalid' })
   
       }



      
      
    }
   

    next()
  }

  module.exports ={
      tokenExtractor, userExtractor
  }