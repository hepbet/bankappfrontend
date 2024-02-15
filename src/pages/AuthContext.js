// src/UserContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import 'firebase/auth';
import { auth } from "../firebase";


export const AuthContext = createContext(null);

export function useAuth(){
  return useContext(AuthContext);
};

export function AuthProvider ({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [userName, setuserName] = useState('');


  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user=>{
      setCurrentUser(user);
      setLoading(false);
    })
    return unsubscribe
  },[]);


 const value = { currentUser, userName };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
