import React, { useState, useEffect } from "react";

import axios from "axios";
import { toast } from 'react-toastify';
import "./Admindashboard.css"
import HeaderComp from "../../components/header";
const Users = () => {
  const [users, setUsers] = useState([]);


  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/users/getall-users");
      setUsers(data.usersList);
    } catch (error) {
      toast.error("Something went wrong in getting users");
    }
  };


  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  return (
    <>
    <HeaderComp/>
            <div>
            <h2 style={{ margin: "30px", fontFamily: "Rubik", fontWeight: "400" }}>Users</h2>
              <div className='tb'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Orders Placed</th>
                      <th>Date of Sign Up</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 && users.map(user => (
                      <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.ordersNo === 0 ? 'No Orders Placed' :     user.ordersNo}</td>
                        <td>{user.date}</td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

            </div>
       
    
    </>
  )
}

export default Users