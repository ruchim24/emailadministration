import React,{useState,useEffect} from 'react'
import M from 'materialize-css';
import {useHistory, useParams} from 'react-router-dom';
import { setNestedObjectValues } from 'formik';

function UpdateUser() {

    const history=useHistory();
    const userId = useParams().userId;
    const [isLoading,setIsLoading] = useState(false);
    const [loadedUser,setLoadedUser] = useState();
    const [image,setImage]=useState("");
    const [url,setUrl]=useState("");
    const [state,setState]=useState({
        
        email:"",
        phone:"",
        department:"",
    })
    const handleChange=(event)=>{
        setState({...state,[event.target.name]:event.target.defaultValue});
    }

   
   
    useEffect(() => {
        const fetchNewhire = async() => {
          try{
            const responseData = await fetch(`http://localhost:5000/${userId}/getUserById`);
            const {email,phone,department} = await responseData.json();
            setLoadedUser({email,phone,department});
            setIsLoading(true);
            setState({email:email,phone:phone,department:department});
          } catch (err) {}
        
        };
        fetchNewhire();
        
        
      },[fetch,userId])


      const submitHandler = async () =>{
        const {email,phone,department}=state;
    
       const responseData = await fetch(`/${userId}/updateUser`,{
           method:"PATCH",
           headers:{
            'Content-Type': 'application/json'
           },
           body:JSON.stringify({
               email,
               phone,
               department
           })
       })
       history.push(`/${userId}/user`);
      }
      
   
    return (
        <div>
                    {isLoading && loadedUser && <div className="register_fields">
                        <h5 className="register_header">Register</h5>
                        <div className="fields">
                           
                        
                            <input 
                                type="email" 
                                placeholder="Email" 
                                id="email"
                                name="email"
                                 //defaultValue={loadedUser.email}
                               
                                value={state.value}
                                onChange={handleChange}
                            />
                            <input 
                                type="text" 
                                placeholder="Mobile Number" 
                                id="phone"
                                name="phone"
                            //defaultValue={loadedUser.phone}
                                value={state.value}
                                onChange={handleChange}
                            />
                            <select name="department" id="department" className="browser-default" name="department"  value={state.value} onChange={handleChange}>
                                <option value="--Select Department--">--Select Department--</option>
                                <option value="IT services">IT services</option>
                                <option value="Product development">Product development</option>
                                <option value="Research and development">Research and development</option>
                                <option value="HR">HR</option>
                                <option value="Security and transport">Security and transport</option>
                            </select>
                        
                            <button className="btn waves-effect waves-light registerbtn" onClick={submitHandler}>
                                Update
                            </button>      
                        </div> 
                    </div>}
                </div>
        
    )
}

export default UpdateUser;
