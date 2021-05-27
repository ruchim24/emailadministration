import React,{useState,useEffect} from "react"
import Axios from 'axios'
// import './App.css';



function EmailSend() {
const [tomail,settomail]=useState("")
const [subject,setsubject]=useState("")
const [sendmessage,setmessage]=useState("")

useEffect(()=>{
  Axios.get("http://localhost:5000/read").then((response)=>{
    console.log(response.data)
  })
},[])


const sendmail=()=>{
  Axios.post("http://localhost:5000/mail",{tomail:tomail,subject:subject,sendmessage:sendmessage}).then((response)=>{
    if (response.data.msg === 'success'){
        alert("Email sent, awesome!"); 
   
    }else if(response.data.msg === 'fail'){
        alert("Oops, something went wrong. Try again")
    }
})

}


  return (
    <div className=" card send_email">
     <h5 className="send_heading">Send Email</h5>
    {/* <div className="App">      */}
    <div className="send_container">
      <div className="send_fields">
        <label>To</label>
        <input type="text" className="info" onChange={(e)=>{settomail(e.target.value)}} placeholder="Enter Email"/>
      </div>
      <div className="send_fields">
          <label>Subject</label>
      <input type="text" className="info" onChange={(e)=>{setsubject(e.target.value)}} placeholder="Enter Subject"/>
      </div>
      <div className="send_fields">
        <label>Message</label>
        <input type="text" className="info" onChange={(e)=>{setmessage(e.target.value)}} placeholder="Enter Message"/>
      </div>     
      <button type="submit" className="btn waves-effect waves-light sendbtn" onClick={sendmail}>Send
      </button>
    </div>
  </div>

);
}
export default EmailSend;






