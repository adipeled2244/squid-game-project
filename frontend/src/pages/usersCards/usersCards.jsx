import './usersCards.css'
import { UserCard } from '../../components/userCard/userCard';
import React from 'react';

export function UsersCards({users, userConnect, makeUserDead,makeUserAlive}) {
    
    return <section className="usersCards">
        <div className="container">
            {users.map((currUser,index) => {
                return <UserCard makeUserDead={makeUserDead} makeUserAlive={makeUserAlive} userConnect={userConnect} currUser={currUser} key={currUser.userName+index}/>
                })
            }
        </div>
    </section>

}


