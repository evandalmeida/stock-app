import { useState } from 'react'

export default function Login({attemptLogin}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleChangeUsername = e => setUsername(e.target.value)
  const handleChangePassword = e => setPassword(e.target.value)

  function handleSubmit(e) {
    e.preventDefault()
    attemptLogin({username, password})
  }

  return (
    <form className='user-form' onSubmit={handleSubmit}>
      <h2 className='box-title' >Log In</h2>

      <input type="text"
      onChange={handleChangeUsername}
      value={username}
      placeholder='username'
      />

      <input type="password"
      onChange={handleChangePassword}
      value={password}
      placeholder='password'
      />


      <input type="submit"
      value='Click to Get Rich'
      />

    </form>
  )
}