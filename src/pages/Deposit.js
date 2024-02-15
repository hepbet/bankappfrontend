import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "../components/Card";
import axios from "axios";
import { useAuth } from './AuthContext';

function Deposit(){
  const {currentUser, balance} = useAuth();


  return (
    <center>
      <Card
      bgcolor="primary"
      header="Deposit"
      body={!currentUser ? 
        <UserLoginWarning/> :
        <DepositForm/>
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



const DepositForm = () =>{

  const {currentUser} = useAuth();

  const[newbalance, setnewBalance] = useState('');
  const[balance, setBalance] = useState();
  const[value, setValue] = useState();

  useEffect(()=>{
    fetchBalance();
  },[]);

  const handleSubmit = async (e) => {


    const nBalance = newbalance*1 + balance;

    console.log("balance",nBalance)


      try {
          const res = await axios.put(`/account/update/${currentUser.email}/${nBalance}`, {balance: nBalance});
          console.log(res)
          fetchBalance();
        } catch (error) {
        console.log("aaaaa",error);
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

<div>Hello {currentUser.email}  Current Balance ${balance}</div>
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


 export default Deposit;
