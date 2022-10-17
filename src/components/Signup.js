import React, {useState} from 'react'
import { useHistory } from "react-router-dom"
import "./signup.css"
const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""})
    let history = useHistory();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        //taking out credentials form credentials using destructering
        const{name, email, password,} = credentials
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
        
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            
            
            body: JSON.stringify({name, email, password}) 
          });
         
          const json = await response.json()
          console.log(json);
          if(json.success){
            //save the auth token and redirect 
            localStorage.setItem('token', json.authtoken);
            history.push("/")
            props.showAlert("Account created Successfully", "success")
          }else{
            props.showAlert("Invalid Credentials", "danger")
          }
         
          }
          const onChange =(e)=>{
            setCredentials({...credentials, [e.target.name]: e.target.value})
        
    }
  return (
    <div className='signup-1'>
         <h1 class='titlee'>Create an account to use iNotebook</h1>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" >Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>

  </div>
  <div className="mb-3">
    <label htmlFor="email" >Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>    
  <div className="mb-3">
    <label htmlFor="password" >Password</label>
    <input type="password" className="form-control" id="password" name="password" minLength={5} onChange={onChange} required/>
  </div>

  <div className="mb-3">
    <label htmlFor="password" >Confirm Password</label>
    <input type="cpassword" className="form-control" id="cpassword" name="cpassword" minLength={5} onChange={onChange} required/>
  </div>
 
 
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Signup
