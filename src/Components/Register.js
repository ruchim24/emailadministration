import React,{useState,useEffect} from 'react'
import M from 'materialize-css';
import {useHistory} from 'react-router-dom';

function Register() {

    const history=useHistory();
    const [image,setImage]=useState("");
    const [url,setUrl]=useState("");
    const [state,setState]=useState({
        fname:"",
        lname:"",
        dname:"",
        email:"",
        phone:"",
        department:"",
    })
    const handleChange=(event)=>{
        setState({...state,[event.target.name]:event.target.value});
    }
    const {fname,lname,dname,email,phone,department}=state;
    useEffect(()=>{
        if(url){
            fetch("/Register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    fname,
                    lname,
                    dname,
                    phone,
                    email,
                    department,
                    photo:url
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html:data.error,classes:"#c62828 red darken-3"});
                }
                else{
                    M.toast({html:"Register Successfully",classes:"#43a047 green darken-1"});
                    history.push('/');
                }
            }).catch(err=>{
                console.log(err);
            })
        }
    },[url])

    const register=()=>{
        const data=new FormData();
        data.append("file",image);
        data.append("upload_preset","easproject");
        data.append("cloud_name","dw2st6ofp");
        fetch("https://api.cloudinary.com/v1_1/dw2st6ofp/image/upload",{
            method:"POST",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return (
        <div>
                    <div className="register_fields">
                        <h5 className="register_header">Register</h5>
                        <div className="fields">
                            <input 
                                type="text" 
                                placeholder="First Name" 
                                id="fname"
                                name="fname"
                                value={state.fname}
                                onChange={handleChange}
                            />
                            <input 
                                type="text" 
                                placeholder="Last Name" 
                                id="lname"
                                name="lname"
                                value={state.lname}
                                onChange={handleChange}
                            />
                            <input 
                                type="text" 
                                placeholder="Father's Name" 
                                id="dname"
                                name="dname"
                                value={state.dname}
                                onChange={handleChange}
                            />  
                            <input 
                                type="email" 
                                placeholder="Email" 
                                id="email"
                                name="email"
                                value={state.email}
                                onChange={handleChange}
                            />
                            <input 
                                type="text" 
                                placeholder="Mobile Number" 
                                id="phone"
                                name="phone"
                                value={state.phone}
                                onChange={handleChange}
                            />
                            <select name="department" id="department" className="browser-default" name="department" value={state.department} onChange={handleChange}>
                                <option value="--Select Department--">--Select Department--</option>
                                <option value="IT services">IT services</option>
                                <option value="Product development">Product development</option>
                                <option value="Research and development">Research and development</option>
                                <option value="HR">HR</option>
                                <option value="Security and transport">Security and transport</option>
                            </select>
                        <div className="file-field input-field">
                                <div className="btn #ec407a pink lighten-1 uploadbtn">
                                    <span className="uploadContent">Upload Image</span>
                                        <input 
                                            type="file"
                                            onChange={(e)=>{
                                            setImage(e.target.files[0]);
                                            }}
                                        />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text"/>
                                </div>
                            </div> 
                            <button className="btn waves-effect waves-light registerbtn" onClick={register}>
                                Register
                            </button>      
                        </div> 
                    </div>
                </div>
        
    )
}

export default Register
