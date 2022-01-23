import './usersCards.css'
import { UserCard } from '../../components/userCard/userCard';
import React from 'react';

export function UsersCards({users}) {
    
    return <section className="usersCards">
        <div className="container">
            {users.map(user => {
                return <UserCard  user={user} key={user._id}/>
                })
            }
        </div>
    </section>

}


