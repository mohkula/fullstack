const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(!body.password){
    response.status(400).json({error: "No password given"})

  }
  else if(!body.username ){
    response.status(400).json({error: "No username given"})

  }

  else if(body.password.length <3){
    response.status(400).json({error: "Password too short"})

  }

  else if(body.username.length <3){
    response.status(400).json({error: "Username too short"})

  }
else{


  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()
  .catch(error =>{
    //console.log(error)
  response.status(400).json({error: error})

})

if(savedUser){
  response.json(savedUser)
}
}

  
  
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(u => u.toJSON()))
  })

module.exports = usersRouter