import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

import axios from "axios";
import "./Admindashboard.css"
import HeaderComp from "../../components/header";



const OrderDetails = () => {
  var hosturl = window.location.protocol + "//" + window.location.host + "/uploads/"


  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState("")
  const params = useParams();


  const getSingleOrder = async () => {
    try {
      const singleorder = await axios.get(`/api/v1/orders/order/${params.id}`);
      setOrder(singleorder.data);
      if (singleorder.success) {

      }
    } catch (error) {
      toast.error("Something wwent wrong in getting order");
    }
  };

  const updateStatus = async () => {
    try {
      await axios.post(`/api/v1/orders/update-status/${params.id}`, { status })
      navigate("/dashboard/manage.vision/admin/orders")
    } catch (error) {

    }
  }

  useEffect(() => {
    getSingleOrder(params.id);

  }, []);
  useEffect(() => {
  }, [status]);


  return (
    <>
    <HeaderComp/>
            <div>
              <h1 style={{ fontSize: "20px", padding: "20px" }}>Order# {params.id}</h1>
              <div className='tb'  >
                <table >
                  <thead>
                    <tr>
                      <th style={{ fontFamily: "Rubik", fontWeight: "500" }}>Models To Ship</th>
                      <th></th>
                      <th></th>
                      <th>Status</th>
                      <th><select id="status" name="ordstst" value={status} onChange={(e) => { setStatus(e.target.value) }}>
                        <option value="Proccesing">Proccesing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select> <button onClick={updateStatus}>update</button></th>
                      <th></th>
                    </tr>
                  </thead>
                  {order.length > 0 && order.map(ord => (
                    <tbody >

                      {
                        ord.products.map(pr => (
                          <tr key={pr[0]}>
                            <td ><img src={hosturl + pr[2]} style={{ width: "50px" }}></img></td>
                            <td>{pr[1]}</td>
                            <td>₹{pr[3]}.00</td>
                            <td>x{pr[4]}</td>
                            <td>₹{pr[4] * pr[3]}.00</td>

                          </tr>
                        ))
                      }




                    </tbody>
                  ))}

                </table>

              </div>
              {order.length > 0 && order.map(ord => (
                <div className="statusdiv">

                  <div style={{ display: "inline-block" }}>
                    <h6 style={{ marginTop: "15px" }}>Shipping Address</h6>
                    <div >

                      <h6 style={{ fontSize: "12px", fontFamily: "Rubik", fontWeight: "500", marginTop: "15px" }}>{ord.shipaddress.name}</h6>
                      <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.shipaddress.address}</h6>
                      <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.shipaddress.city}</h6>
                      <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.shipaddress.state}</h6>
                      <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.shipaddress.country}</h6>
                      <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.shipaddress.pin}</h6>
                      <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.shipaddress.phone}</h6>

                    </div>


                  </div>
                  <div style={{ display: "inline-block", marginLeft: "70px" }}>
                    <h6 style={{ marginTop: "15px" }}>Billing Address</h6>



                    <div>
                      <h6 style={{ fontSize: "12px", fontFamily: "Rubik", fontWeight: "500", marginTop: "15px" }}>{ord.billaddress.name}</h6>
                      <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.billaddress.address}</h6>
                      <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.billaddress.city}</h6>
                      <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.billaddress.state}</h6>
                      <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.billaddress.country}</h6>
                      <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.billaddress.pin}</h6>
                      <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.billaddress.phone}</h6>
                    </div>
                  </div>
                </div>))}
            </div>
   
    </ >
  )

}


export default OrderDetails