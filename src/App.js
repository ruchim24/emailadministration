import './App.css';
import {BrowserRouter, Route, Redirect,Switch,useHistory} from 'react-router-dom'
import Navbar from './Components/Navbar';
import  About from './Components/About';
import Home from './Components/Home'; 
import Login from './Components/Login';
import EmailGenerate from './Components/EmailGenerate';
import Details from './Components/Details';
import EmailSend from './Components/EmailSend';
import Generate from './Components/Generate';
import Register from './Components/Register';
import Users from './Components/user/pages/User';
import NewHire from './Components/new_hires/pages/NewHire';
import React,{useEffect,createContext,useReducer,useContext} from 'react';
import {reducer,initialState} from './reducers/userReducer';
import UpdateUser from './Components/updateUser';

export const UserContext=createContext()
const Routing=()=>{
  const history=useHistory();
  const {state,dispatch}=useContext(UserContext);
  // useEffect(()=>{
    
  //   const user=JSON.parse(localStorage.getItem("user"))
  //   if(user){
  //     dispatch({type:"USER",payload:user})
  //     history.push('/');
  //   }
  //   else{
  //     history.push('/login');
  //   }
  // },[])
  return(
        <Switch>
          <Route path="/Home" exact>
            <Home/>
          </Route>
        <Route path="/about" exact>
          <About/>
        </Route>
        <Route path="/details" exact>
          <Details/>
        </Route>
        <Route path="/" exact>
          <Login/>
        </Route>
        <Route path="/EmailGenerate" exact>
          <EmailGenerate/>
        </Route>
        <Route path="/send" exact>
          <EmailSend/>
        </Route>
        <Route path="/users" exact>
        <Users />
      </Route>
      <Route path="/:userId/user" exact>
      <NewHire />
    </Route>
    <Route path="/:userId/updateUser" exact>
      <UpdateUser />
    </Route>

        <Redirect to="/"/>
    </Switch>
  )
}



function App() {
  const [state,dispatch]=useReducer(reducer,initialState);
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
          <Navbar/>
          <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  
  );
}

export default App;
