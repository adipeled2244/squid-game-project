import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from 'react-router-dom';
import './header.css'
import pigImage from './moneyPig.svg'



export function Header({money,user}) {
    const [isOpenModal, setisOpenModal] = useState(false);

    const openAndCloseModal =()=>{
        setisOpenModal(!isOpenModal);
    }

    return (
        <header className='header-cmp'>
            <div className='logo'></div>
            <div className="homeicon "></div>
            <GiHamburgerMenu onClick={openAndCloseModal} className='hamburger' color='white' size={32}/>

            {isOpenModal && <div className="navbar-modal" >
                {!user && <NavLink className='link' exact="true" to='/'><h3 className="show-profile-page">Login / Signup</h3></NavLink>}
                {user && <NavLink className='link' to='/profile'><h3 className="show-profile-page">Profile</h3></NavLink>}

                {user && user.color=='blue' && <NavLink className='link' to='/game'><h3 className="show-game-page">Game</h3></NavLink>}
                {user && user.color=='blue' &&<NavLink className='link' to='/results'> <h3 className="show-games-results-page">My Games</h3></NavLink>}

                {user && user.color=='red'&& <NavLink className='link' to='/users'> <h3 className="show-games-results-page">Players</h3></NavLink>}
                {user && user.color=='black'&& <NavLink className='link' to='/users'> <h3 className="show-games-results-page">My workers AND My Players</h3></NavLink>}


            </div>}
            
            <div className="pigMoney">
                <img src={pigImage}/>
                <h3>{money}<span className="moneyAmount"></span>M₩</h3>
            </div>
        </header>
    );
}



