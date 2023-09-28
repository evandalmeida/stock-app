import { useState, useEffect } from 'react'
import UserPanel from './components/UserPanel/user_index';
import MarketWatch from './components/MarketWatch';
import StocksList from './components/StocksList';


const POST_HEADERS = {
  'Content-Type': 'application/json',
  'Accepts': 'application/json'
}



function App() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    async function checkSession() {
      const response = await fetch('/check_session')

      if (response.ok) {
        const data = await response.json()
        setCurrentUser( data )
      }
    }
    checkSession()
  }, [])

  async function attemptSignup(userInfo) {
    const res = await fetch('/users', {
      method: 'POST',
      headers: POST_HEADERS,
      body: JSON.stringify(userInfo)
    })
    if (res.ok) {
      const data = await res.json()
      setCurrentUser(data)
    } else {
      const errorData = await res.json();
      alert(errorData.error || 'Invalid sign up'); // Display the error from backend
    }
  }
  

async function attemptLogin(userInfo) {
    const res = await fetch('login', {
      method: 'POST',
      headers: POST_HEADERS,
      body: JSON.stringify(userInfo)
    })
    if (res.ok) {
      const data = await res.json()
      setCurrentUser(data)
    } else {
      alert('Invalid login') // Fix this message
    }
}


  function logout() {
    setCurrentUser(null)
    fetch('/logout', {
      method: 'DELETE'
    })
  }


  return (
    <>
      <UserPanel
          currentUser={currentUser}
          attemptLogin={attemptLogin}
          attemptSignup={attemptSignup}
          logout={logout} />
      <MarketWatch/>
      <StocksList/>
    </>
  );
}

export default App;
