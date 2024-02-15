
import { useFormik } from 'formik';
import React, { useState } from 'react';
import Card from "../components/Card";
import {  getAuth, createUserWithEmailAndPassword  } from 'firebase/auth';
import {  signInWithEmailAndPassword, signOut  } from 'firebase/auth';
import {auth} from '../firebase';
import { useAuth } from './AuthContext'

function CreateAccount(){
  const {currentUser} = useAuth();

  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');


  return (
    <center><Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={!currentUser ? 
        <CreateForm setShow={setShow}/> : 
        <CreateMsg setShow={setShow}/>}
    /></center>
  )
}

function CreateMsg(props){
    const {currentUser} = useAuth();
    
    
   const buttonHandler = async(e) => {

    e.preventDefault();

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
    <h5>You logged in {currentUser.email}</h5>
    <form onSubmit={buttonHandler}>
      <button type='submit' className="btn btn-light">Add another account</button>
    </form>
  </>);
}

function CreateForm(props) {
  const{signup} = useAuth();
  const auth = getAuth();


  const[error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  // console.log(auth.currentUser);

  const formik = useFormik({
    initialValues: {
      name:'',
      email:'',
      password:''
    },

    onSubmit: async (values) => {

    try{
      setError('');
     //  await signup(values.email, values.password);
      await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        console.log(userCredential);

        


      })
      .catch((error) => {
        console.log('you are here checking email')
        setError('Email is in use');
        console.log(error);
      });

      const response = await fetch('/account/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        });

        console.log(response);

        if (!response.ok) {
        throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Handle the response data as needed
        console.log(data);
        
        alert("Account created successfully");
        
        props.setShow(false);
        formik.resetForm();
      } catch (error) {
        console.error('Error creating account', error);
        setError("fail")
        formik.resetForm();
      }
    },

    validate: values => {
      let errors = {};
      if (!values.name) errors.name="Name Required!";

      //Add Check name and email in users
      
      if (!values.email) {errors.email="Email Required!";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Username should be an email';
      }

      if (!values.password) {errors.password="Password Required!";
      }else if (values.password.length<8){
      errors.password="Password must include 8 character!";
      };
      return errors;
    }
  });

  return (
      <div>
        <form onSubmit={formik.handleSubmit}>

          <div style={{fontSize:25, color:"blue", marginTop:20}}>Name</div>
          <input id="nameField" name="name" type="text" onChange={formik.handleChange} value={formik.values.name}></input>
          {formik.errors.name?<div id="nameError" style={{color:'red', fontStyle:'italic', fontWeight:'bold'}}>{formik.errors.name}</div> : null}
        
          <div style={{fontSize:25, color:"blue", marginTop:20}}>E-mail</div>
          <input id="emailField" name="email" type="text" onChange={formik.handleChange} value={formik.values.email}></input>
          {formik.errors.email?<div id="emailError" style={{color:'red', fontStyle:'italic', fontWeight:'bold'}}>{formik.errors.email}</div> : null}
        
          <div style={{fontSize:25, color:"blue", marginTop:20}}>Password</div>
          <input id="pswField" name="password" type="text" onChange={formik.handleChange} value={formik.values.password}></input>
          {formik.errors.password?<div id="pswError" style={{color:'red', fontStyle:'italic', fontWeight:'bold'}}>{formik.errors.password}</div> : null}
          
          <button type='submit' id="submitBtn">Submit</button>
        </form>
      </div>

  );
}

export default CreateAccount;