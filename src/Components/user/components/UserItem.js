import React from 'react';
import { Link } from 'react-router-dom';

import './UserItem.css';
import Avatar from '../../avatar/Avatar';
import Cards from '../../cards/Cards';

const UserItem = props => {
    return(
            <li className="user-item">
            
                <Cards className="user-item__content">
                <Link to={`/${props.id}/user`}>
                {/* <div className="user-item__image">
                    <Avatar image="" alt={props.name} />
                </div> */}
                <div className="user-item__info">
                    <h2>{props.fname}</h2>
                    <h3>
                       {props.department}
                    </h3>
                </div>
                </Link>
                </Cards>
           
        </li>
    );
};

export default UserItem;

