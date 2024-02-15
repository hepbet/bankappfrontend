import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const AllData = () => {
  
  const { user, balance, email } = useContext(AuthContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://betulerenelbankappipa.onrender.com/all'); // Replace '/api/data' with your actual API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData);
      console.log(jsonData.length)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
  <div className="container-md">
      <h2>USERS</h2>
          <table className="table table-striped table-bordered">
            <thead>
              <tr >
                <th scope="col">#</th>
                <th scope="col" style={{color:"blue"}}>Name</th>
                <th scope="col">Email</th>
                <th scope="col">Balance</th>
              </tr>
            </thead>
            <tbody>          
              {data.map((item) => (
                <tr>
                  <td>{1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
   
  );
};



export default AllData;
