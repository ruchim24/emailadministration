import React,{ useEffect,useState } from 'react';
import UserList from '../components/UserList';


const Users = () => {
const [loadedUsers,setLoadedUsers] =useState();
const [isLoading,setIsLoading] = useState(false);
     useEffect(() => {
      const fetchUsers = async () => { 
      try{
        const responseData = await fetch('http://localhost:5000/getUsers');
        const res = await responseData.json();
        setLoadedUsers(res.users);
        setIsLoading(true);
        console.log(loadedUsers);
      } catch (err) {
         
      } 
      };
      fetchUsers();
     },[fetch]);

  

    return (
   
    <React.Fragment>
   {isLoading && loadedUsers && <UserList items= {loadedUsers} />}
  {/* <h2>hii</h2> */}
  </React.Fragment>

  

    );
}

export default Users;