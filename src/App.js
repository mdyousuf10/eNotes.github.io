import "./App.css"
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState'
import Alert from './components/Alert';
import Login from './components/login/Login';
import Signup from './components/Signup';
import {useState} from 'react';
import Footer from "./components/Footer";


function App() {
  const [alert, setAlert] = useState(null)
  const showAlert=(message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
    <NoteState>
    <Router>
    <Navbar  />
    <Alert alert={alert}/>
    <div className="container my-3">


    <Switch>
    <>
    <Route exact path="/">
            <Home  showAlert={showAlert}/>
          </Route>
          <div className="container mt-6">
          <Route exact path="/about">
            <About />
            </Route>
           
          <Route exact path="/login">
            <Login showAlert={showAlert}/>
            </Route>
          <Route exact path="/signup">
            <Signup showAlert={showAlert}/>  
          </Route>
          </div>
          </>
        </Switch>
        </div>
        </Router>
        </NoteState>
        <Footer/>

{/* Footer- start */}
        
{/* footer-end */}
    </>
  );
}

export default App;
