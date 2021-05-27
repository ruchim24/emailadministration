import React,{useState} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

function Generate() {
    const history=useHistory();
    const [state,setState]=useState({
        fname:"",
        lname:"",
        email:"",
        department:"",
    })

    const handleChange=(event)=>{
        setState({...state,[event.target.name]:event.target.value});
    }
    const {fname,lname,email,department}=state;
    const generateEmail=()=>{
        // alert("successful");
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
            {
                M.toast({html:"Invalid email",classes:"#c62828 red darken-3"});
                return;
            }
            // alert("Congratulations");
            fetch("/generate",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    fname,
                    lname,
                    email,
                    department  
                })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data.error){
                    console.log(data.error);
                    M.toast({html:data.error,classes:"#c62828 red darken-3"});
                }
                else{
                    M.toast({html:`Your Email is ${fname+lname+department.substring(0,4)}@gmail.com`,classes:"#43a047 green darken-1"});
                    console.log(data);
                    history.push('/EmailSend');
                }
                
            }).catch(err=>{
                console.log(err);
            })
            console.log("hiii");
        }
    return (
        <div>

                             <div className="input_fields">
                                <h5 className="generate_email_heading">Generate Your Email</h5>
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
                                        type="email" 
                                        placeholder="Email" 
                                        id="email"
                                        name="email"
                                        value={state.email}
                                        onChange={handleChange}
                                        />                              
                                    <select name="department" id="department" className="browser-default" value={state.department} onChange={handleChange}>
                                        <option value="--Select Department--">--Select Department--</option>
                                        <option value="IT services">IT services</option>
                                        <option value="Product development">Product development</option>
                                        <option value="Research and development">Research and development</option>
                                        <option value="HR">HR</option>
                                        <option value="Security and transport">Security and transport</option>
                                    </select>
                                </div>
                                <button className="btn waves-effect waves-light generatebtn" onClick={generateEmail}>
                                    Generate Email
                                </button>  
                            </div> 
                        </div>
    )
}

export default Generate
