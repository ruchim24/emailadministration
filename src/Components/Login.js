import React,{useState,useContext} from 'react'
import EmailIcon from '@material-ui/icons/Email';

import zxcvbn from 'zxcvbn';
import {useHistory,Link} from 'react-router-dom';
import {useFormik} from 'formik';
import M from 'materialize-css';
import {UserContext} from '../App';

function Login() {
    const {state,dispatch}=useContext(UserContext);
    const [disable,setDisable]=useState(true);
    const history=useHistory();
    const validate = (values) => {
        const password = values.pswd;
        const evaluation = zxcvbn(password);
        let errors = {};
    
        if (values.username.length === 0) {
          errors.username = " ";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username) &&
          values.username.length > 0
        ) {
          errors.username = `Email is not valid`;
        }
    
        if (values.pswd.length === 0) {
          errors.pswd = " ";
        } else if (values.pswd.length > 0 && values.pswd.length < 6) {
          errors.pswd = `password must be at least of 6 characters`;
        } else if (evaluation.score < 2) {
          errors.pswd = `${
            evaluation.feedback.suggestions[1] || evaluation.feedback.suggestions[0]
          }`;
        }
        if (errors.username || errors.pswd) {
          setDisable(true);
        } else {
          setDisable(false);
        }
        return errors;
      };

    //   const onSubmit=async(values)=>{
    //     if(values.username==="abc@gmail.com" && values.pswd==="rtyushk"){
    //         M.toast({html:'Successfully Logged in' ,classes:"#2e7d32 green darken-3"});
    //         history.push('/EmailGenerate');
    //     }
    //     else{
    //       M.toast({html:'Invalid Credential', classes:"#f44336 red"});
    //     }
    // };

      
    const onSubmit=(values)=>{
      const {username,pswd}=values;
      fetch('/login',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          username,
          pswd
        })
      }).then(res=>res.json())
      .then(data=>{
        console.log(data);
        if(data.error){
          M.toast({html:data.error,classes:"#c62828 red darken-3"})
        }
        else{
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          dispatch({type:"USER",payload:data.user})
          M.toast({html:"Signed in successfully",classes:"#43a047 green darken-1"})
          history.push('/Home');
        }
      })
      .catch(err=>{
        console.log(err);
      })
    }

    const formik=useFormik({
        initialValues:{
            username:"",
            pswd:""
        },
        validate,
        onSubmit
      });


    return (
        <div>
            <div className="mycard">
                <div className=" card login_card">
                {/* <div><EmailIcon style={{fontSize:"60", marginLeft:"150px", color:"green"}}/></div> */}
                <Link to="/" className="logo">
                    <img
                    
                    src="https://i.pinimg.com/originals/7e/69/ec/7e69eca344ca1465da94d698ded08e8e.gif"
                    // src="./video/logo.mp4" 
                     width="140px" height="130px"/>
                </Link>
                <h5 className="login">Log in</h5>
                <form onSubmit={formik.handleSubmit} method="POST" autoComplete="off">
                <div>
                <input 
                    type="text" 
                    placeholder="Username" 
                    id="username"
                    name="username" 
                    value={formik.values.username} 
                    autoComplete="off" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required           
                    />
                    {formik.touched.username && formik.errors.username ? (
                                    <div className="error">{formik.errors.username}</div>
                                    ) : null}
                    </div>
                    <div>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        id="pswd"
                        name="pswd"
                        value={formik.values.pswd} 
                        autoComplete="off" 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        required
                        />
                    </div>
                    <button 
                        className="btn waves-effect waves-light loginbtn"
                        disabled={disable}
                        onClick={formik.onSubmit}
                        >
                    Login
                    </button> 
                </form>
                    
                </div>
            </div>
        </div>
    )
}

export default Login
