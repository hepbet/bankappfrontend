import React from "react";
import logo from "../bank.png";
import Card from "../components/Card";

import { useAuth } from "./AuthContext";

const Home = () => {

  const {currentUser} = useAuth();

  // useEffect(()=>{
  //       onAuthStateChanged(auth, (user) => {
  //           if (user) {
  //             // User is signed in, see docs for a list of available properties
  //             // https://firebase.google.com/docs/reference/js/firebase.User
  //             const uid = user.uid;
  //             // ...
  //             console.log("uid", uid)
  //           } else {
  //             // User is signed out
  //             // ...
  //             console.log("user is logged out")
  //           }
  //         });
         
  //     }, [])

  return (

    <center><Card
      bgcolor="primary"
      header="BadBank"
      title="Welcome to Bad Bank!"
      text="You can move around using the navigation bar."
      body={(<img src={logo} className="img-fluid" alt="Responsive image"/>)}
    /></center>

  )

};

export default Home;