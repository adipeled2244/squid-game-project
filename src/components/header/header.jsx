import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from 'react-router-dom';
import './header.css'
import pigImage from './moneyPig.svg'



export function Header(props) {
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
                <NavLink className='link' to='/game'><h3 className="show-game-page">Game</h3></NavLink>
                <NavLink className='link' to='/profile'><h3 className="show-profile-page">Profile</h3></NavLink>
                {/* <NavLink className='link' to='/results'> <h3 className="show-games-results-page">My Games</h3></NavLink> */}
            </div>}
            
            <div className="pigMoney">
                <img src={pigImage}/>
                <h3>33<span className="moneyAmount"></span>M₩</h3>
            </div>
        </header>
    );
}



