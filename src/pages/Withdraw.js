import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import Card from "../components/Card";
import axios from "axios";
import { useAuth } from './AuthContext';

function Withdraw(){
  const {currentUser, balance} = useAuth();


  return (
    <center>
      <Card
      bgcolor="primary"
      header="Withdraw"
      body={!currentUser ? 
        <UserLoginWarning/> :
        <WithdrawForm/>
      }
    />
    </center>
  ) 
};


const UserLoginWarning =() => {
  // if there no user
return(
  <div>
    <h5>Please Login to use this page!</h5>
  </div>
)}; 



const WithdrawForm = () =>{

  const {currentUser} = useAuth();

  const[newbalance, setnewBalance] = useState('');
  const[balance, setBalance] = useState();
  const[value, setValue] = useState();

  useEffect(()=>{
    fetchBalance();
  },[]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (balance<newbalance){
      console.log('you dont have that money')
      alert('you dont have that money')
    } else {
    const nBalance = balance - newbalance*1;
    console.log("balance",nBalance)

      try {
          const res = await axios.put(`/account/update/${currentUser.email}/${nBalance}`, {balance: nBalance});
          console.log(res)
          fetchBalance();
        } catch (error) {
        console.log("aaaaa",error);
      }
    }

    

  };
  

  const fetchBalance = async () => {
      try {
          const res = await axios.get(`/account/findOne/${currentUser.email}`);
          setBalance(res.data.balance);
        } catch (error) {
        console.log(error);
      }
  };

return (<>

<div>Hello <br></br>{currentUser.email}</div>
<div>Current Balance <br></br>${balance}</div>

    <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Amount</label><br />
        <input 
        type="number"
        className="form-control" 
        placeholder="Enter anumber"
        value={value} 
        onChange={e => setnewBalance(e.target.value)} 
        required /><br />

        <button type="submit" className="btn btn-light">Submit</button>
    </form>

</>)

}


 export default Withdraw;
