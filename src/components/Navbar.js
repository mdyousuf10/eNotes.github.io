import React from 'react'
import {Link,  useLocation} from "react-router-dom";
import { useHistory } from "react-router-dom"



const Navbar = () => {

  //Use location is used to see/take the location of the componenet 

  // useEffect(()=>{ this code is used only to see location in console
  //   console.log(location.pathname);
  // }, [location]);
  let history = useHistory;
  const handleLogout=()=>{
    localStorage.removeItem('token');
    history.push('/login')
  }
 
  let location = useLocation();
  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-dark ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">eNoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item"  >
          <Link className={`nav-link ${location.pathname==="/"?"active":" "} `} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":" "} `} to="/about">About</Link>
        </li>
       
         </ul>
        
         
  
     
     
      {!localStorage.getItem('token')? <form className="d-flex" >
       <Link to='/login' className="btn btn-primary mx-1" href="#" role="button">Login</Link>
       <Link to='/signup' className="btn btn-primary mx-1" href="#" role="button">Signup</Link>
       </form>: <a class="btn btn-primary" onClick={handleLogout} href="/login" role="button">Sign Out</a>}
      
      
       <div >
        
  <div/>
  </div>
         



    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
