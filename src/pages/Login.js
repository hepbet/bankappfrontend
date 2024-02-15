import React from 'react';
import Card from "../components/Card";
import {  signInWithEmailAndPassword, signOut  } from 'firebase/auth';
import {auth} from '../firebase';
import { useAuth } from './AuthContext';

function Login(){
  const {currentUser} = useAuth();
  
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <center>
      <Card
      bgcolor="primary"
      header="Login"
      status={status}
      body={!currentUser ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LogOut setShow={setShow} setStatus={setStatus}/>
      }
    />
    </center>
  ) 
};

function LogOut(props){ 
  
  const {currentUser, balance, userName} = useAuth();
  console.log("current User", currentUser.email);
  console.log("current balance", balance);
  console.log("current Name", userName);

  const buttonHandler = async(e) => {

    console.log("button handler clicked")

    try {
      await signOut(auth)
      //console.log("current User", currentUser.mail);
    } catch (error) {
      console.error('Error during logout:', error);
      props.setShow(false);
    }
    props.setShow(true);
  };
  
  return(<>
    
      <div>
        <h5>Welcome <br></br>{currentUser.email}</h5>
        <form onSubmit={buttonHandler}>
          <button type='submit' id="submitBtn">LogOut</button>
        </form>
      </div>
  </>);
}


function LoginForm(props){
  
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  
  const handleSubmit = async (e) => {

    e.preventDefault();
  
    if (!email) {
      setErrorMsg("Email Required!");
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        setErrorMsg('Invalid Email');
      } else if(!password){
        setErrorMsg("Password Required!");
      };

    console.log(errorMsg);


    try {
        await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
          console.log("UserCredentials", userCredential);
          props.setShow(false);
        })
        .catch((error) => {
          console.log("There is an err", error);
          setErrorMsg("Incorrect Password or Email")
          props.setShow(true);
        });
      
    } catch (error) {
      console.error('Error submitting login form', error);
    }
  };

  return (<>
  <div style={{ minHeight: '60px' }}>{errorMsg && <div className="alert alert-danger" role="alert">{errorMsg}</div>}</div>

  
    <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label><br />
        <input 
        type="email"
        id="email"
        className="form-control" 
        placeholder="Enter email"
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        required /><br />

        <label htmlFor="password">Password:</label><br />
        <input 
        type="password" 
        className="form-control" 
        id="password" 
        placeholder="Enter password"
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        required /><br />

        <button type="submit" className="btn btn-light">Login</button>
    </form>

   
  </>);
}

export default Login;