import React from 'react';
import './UserList.css';
import UserItem from './UserItem';
import Cards from '../../cards/Cards';

const UserList = props => {
    if(props.items.length === 0){
        return (
            <div className="center">
                <Cards>
            <h2>No new hires foundS</h2>
            </Cards>
             </div>
        );
    }

    return (
    <ul>
        {props.items.map(user => {
            return <UserItem
             key={user.id}
             id={user.id} 
             fname={user.fname} 
            department={user.department}
             />
        })}
    </ul>
    );
};



export default UserList;

