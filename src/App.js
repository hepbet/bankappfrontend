
import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthDetails from "./pages/AuthDetail";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./pages/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreateAccount from"./pages/CreateAccount";
import AllData from "./pages/AllData";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Login from "./pages/Login";


function App() {
  // const currentuser = {name:"betul erenel", email: " betulerenel@gmail.com", password:"12345678", balance: 100};
  // const [user, setUser] = useState(currentuser);

  // useEffect(()=>{
  //   app();
  // },[])

  return (
    <Router>
      <div className="App">
        <Navbar />
          <AuthProvider>
              <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route path="/CreateAccount" element={<CreateAccount />}></Route>
                <Route path="/Login" element={<Login />}></Route>
                <Route path="/Deposit" element={<Deposit/>}></Route>
                <Route path="/Withdraw" element={<Withdraw/>}></Route>
                <Route path="/AllData" element={<AllData/>}></Route>
              </Routes>
          </AuthProvider>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;