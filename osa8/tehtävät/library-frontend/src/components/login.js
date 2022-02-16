import React, { useState } from 'react'


const LoginForm = (props) => {
    

  

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = (event) =>{
        event.preventDefault()

        props.handleLogin({username, password})
            }

    return(
    <form onSubmit={login}>

      <p>log in to the application</p>

      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

    }

    export default LoginForm

