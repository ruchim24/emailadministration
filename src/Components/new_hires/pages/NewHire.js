import React, { useEffect, useState } from 'react';
import { useParams,useHistory } from 'react-router-dom';
import Cards from '../../cards/Cards';
import './NewHire.css'


const NewHire = () => {
  const history= useHistory();
  const [loadedUser,setLoadedUser] = useState();
  const [isLoading,setIsLoading] = useState(false);
const userId = useParams().userId;

const clickHandler = () => {
  history.push(`/${userId}/updateUser`);
  
}

useEffect(() => {
  const fetchNewhire = async() => {
    try{
      const responseData = await fetch(`http://localhost:5000/${userId}/getUserById`);
      const {fname,lname,dname,email,phone,department,photo} = await responseData.json();
      setLoadedUser({fname,lname,dname,email,phone,department,photo});
      setIsLoading(true);
    } catch (err) {}
  
  };
  fetchNewhire();
},[fetch,userId])


  return (
  <React.Fragment>

      {isLoading && loadedUser &&  <li className="newhire-item">
       
    <Cards className="newhire-item__content layout">
      <Cards className="cards_design">
      <div className="newhire-item__image">
        <img src={loadedUser.photo}/>
        </div>
      </Cards>
      <hr width="1" size="1000%"/>
    <div className="newhire-item__info">
        <h2><b>First Name: </b>{loadedUser.fname}</h2>
        <h2><b>Last Name: </b>{loadedUser.lname}</h2>
        <h2><b>Father's Name: </b>{loadedUser.dname}</h2>
        <h2><b>Email: </b>{loadedUser.email}</h2>
        <h2><b>mobile No: </b>{loadedUser.phone}</h2>
        <h2><b>Department: </b>{loadedUser.department}</h2>
        <hr />
        <div className="button_style">
        <button onClick={clickHandler}>Edit</button>
        <button>Delete</button>
        </div>
        </div>
    </Cards>
  
    </li>}
  </React.Fragment>
  )
};

export default NewHire;