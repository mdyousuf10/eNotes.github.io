import { useState } from "react"
import React from 'react'
import { useHistory } from "react-router-dom"
import "./login.css"



const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password:""})
    let history = useHistory();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login/`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              
        
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            
            
            body: JSON.stringify({email:credentials.email, password:credentials.password}) 
          });
          const json = await response.json()
          console.log(json);
          if(json.success){
            //save the auth token and redirect 
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in successfully", "success")
            history.push("/")
           

          }else{
            props.showAlert("Logged in fail", "danger")
          }
         
          }
          const onChange =(e)=>{
            setCredentials({...credentials, [e.target.name]: e.target.value})
        
    }
  return (
    <>
    <div className="login-1">
    <div>
      <h1 className="title">Login to your Account</h1>
        <form  onSubmit={handleSubmit}>
        <div className="form-group">
            <input type="email" id="email" value={credentials.email} onChange={onChange} name="email" /><label className="lable">Username</label> 
      
        </div>
        <div className="form-group">
            <input type="password" value={credentials.password} id="password" onChange={onChange} name="password"/><label className="lable">Password</label>
           
        </div>
        <button type="submit" className="submit">Submit</button>
        <div class="row">
          <p>Not Yet Registered? <a href="#">Sign Up</a></p>
        </div>
        </form>
    </div>
    <div class="last">
      <a href="#">T&C</a>
      <a href="#">Policy</a>
    </div>
    </div>

   
  


 

    </>
    
  )
}

export default Login