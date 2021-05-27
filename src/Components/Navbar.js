import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import EmailIcon from '@material-ui/icons/Email';
import { UserContext } from '../App';

function Navbar() {
    const history=useHistory();
    const {state,dispatch}=useContext(UserContext);
    const renderList=()=>{
        if(state){
            return [
                <li><Link to="/Home">Home</Link></li>,
                <li><Link to="/EmailGenerate">Email Generate</Link></li>,
                <li><Link to="/details">Employee Details</Link></li>,
                <li>
                    <button 
                        className="btn #c6828 red darken-3 logout"
                        onClick={()=>{
                        localStorage.clear();
                        dispatch({type:"CLEAR"});
                        history.push('/login');
                    }}>
                        Log Out
                    </button>
                </li>
            ]
        }
        else{
            return [
                
                <li><Link to="/Home">Home</Link></li>,
                <li><Link to="/login">Login</Link></li>
            ]
        }
    }
    return (
        <div>
            <nav>
                <div className="nav-wrapper white">
                <Link to={state?"/":"/login"} className="brand-logo">
                    {/* <EmailIcon style={{fontSize:"60", marginLeft:"20px", color:"green"}}/> */}
                    <img
                    // src="https://support.politemail.com/hc/article_attachments/360041744473/giphy7.gif"
                    src="https://i.pinimg.com/originals/7e/69/ec/7e69eca344ca1465da94d698ded08e8e.gif"
                    // src="./video/logo.mp4" 
                     width="120px" height="80px"/>
                </Link>
                <ul id="nav-mobile" className="right">  
                    {renderList()}          
                </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
