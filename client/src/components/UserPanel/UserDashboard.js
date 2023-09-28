import React from 'react';
import StocksList from '../StocksList';
import WatchList from '../WatchList';
import MarketWatch from '../MarketWatch';


function UserDashboard({currentUser, logout}) {

  return (
    <div className='user-details'>

    <h2>{currentUser.username}: User Dashboard</h2>
          <StocksList />
          <MarketWatch />
          <WatchList />
      <button onClick={logout}>Logout</button>
    </div>
  )

}



export default UserDashboard;
