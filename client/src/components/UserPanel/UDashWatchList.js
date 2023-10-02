import React from 'react';
import WatchList from './WatchList';
import NavBar from './NavBar';
import Footer from '../FooterPanel/Footer';

export default function UDashWatchListandChat({ currentUser, logout }) {
    return (
        <>
            <div className='user-details'>
                <NavBar currentUser={currentUser} logout={logout} />
                <WatchList />
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    );
}
