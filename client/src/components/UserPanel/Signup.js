import { useState } from 'react'

export default function Signup({attemptSignup}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleChangeUsername = e => setUsername(e.target.value)
  const handleChangePassword = e => setPassword(e.target.value)

  function handleSubmit(e) {
    e.preventDefault()
    attemptSignup({username, password})
  }

  return (
    <form className='user-form' onSubmit={handleSubmit}>
      <h2 className='box-title'>Register</h2>

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
      value='Register Account'
      />
    </form>
  )
}

