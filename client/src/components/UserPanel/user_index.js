import Signup from './Signup'
import Login from './Login'
import UserDashboard from "./UserDashboard"

function UserPanel({currentUser, attemptLogin, attemptSignup, logout}) {

  if (!currentUser) {
    return (
        <div className="flex-row">
          <Signup attemptSignup={attemptSignup} />
          <Login attemptLogin={attemptLogin} />
        </div>)
    } else {return (<UserDashboard currentUser={currentUser} logout={logout} />)}
}

export default UserPanel