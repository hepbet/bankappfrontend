import React, { useEffect, useContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { AuthContext } from "./AuthContext";

const AuthDetails = () => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const { metadata } = firebaseUser;
        const isCreatedUser = metadata.creationTime < metadata.lastSignInTime;

        if (!isCreatedUser) {
          setUser(firebaseUser);
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      listen();
    };
  }, [setUser]);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        setUser(null);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: "10px",
        marginRight: "10px",
      }}
    >
      {user ? (
        <>
          <span>
            <p
              style={{ display: "inline-block", marginRight: "10px" }}
            >{`Signed in as ${user.email}`}</p>
            <button style={{ display: "inline-block" }} onClick={userSignOut}>
              Sign Out
            </button>
          </span>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;