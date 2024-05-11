import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Button, Input, Spin, message ,Select} from "antd";
import axios from "axios";
import "./Admindashboard.css"
import HeaderComp from "../../components/header";
import "./orderdet.css"
import { CloseCircleOutlined } from "@ant-design/icons";


const OrderDetails = () => {
  var hosturl = "https://static-vision.s3.ap-south-1.amazonaws.com/"


  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const [orderproducts, setorderproducts] = useState([]);
  const [status, setStatus] = useState("")
  const params = useParams();
  const [spinning, setSpinning] = useState(false);


  const getSingleOrder = async () => {
    try {
      setSpinning(true)
      const singleorder = await axios.get(`/api/v1/orders/order/${params.id}`);
      setOrder(singleorder.data);
      setStatus(singleorder.data[0].status);
      setorderproducts(singleorder.data[0].products.map((data) => ({
        key: data[0],
        model: data[1],
        image: data[2],
        mrp: data[3],
        qty: "x" + data[4],
        total: data[3] * data[4],
      })))
      setSpinning(false)

      if (singleorder.success) {

      }
    } catch (error) {
      message.error("Something went wrong in getting order");
    }
  };

  const updateStatus = async () => {
    try {
      setSpinning(true)
      await axios.post(`/api/v1/orders/update-status/${params.id}`, { status })
      setSpinning(false)
      message.success("Status Updated")
    } catch (error) {
      message.error("Failed Status Updated")
    }
  }

  useEffect(() => {
    getSingleOrder(params.id);

  }, []);
  useEffect(() => {
  }, [status]);


  const ordercolumns = [
    {
      title: 'Models to ship',
      dataIndex: 'image',
      key: 'image',
      render: (img) => (
        <img
          src={hosturl + img}
          alt="img"
          style={{ width: 50, height: 50 }}
        />
      ),
    },


    {

      dataIndex: 'model',
      key: 'model',
    },
    {

      dataIndex: 'mrp',
      key: 'mrp',
    },
    {

      dataIndex: 'qty',
      key: 'qty',
    },
    {

      dataIndex: 'total',
      key: 'total',
    },


  ];

  const statusopt = [
    { value: "Proccesing", label: 'Proccesing' },
    { value: "Shipped", label: 'Shipped' },
    { value: "Out for delivery", label: 'Out for delivery' },
    { value: "Delivered", label: 'Delivered' }
  ];
  return (
    <>
      <Spin spinning={spinning} fullscreen size='large' />
      <HeaderComp />

      {/* ----------------------------------------------------------- */}

<div style={{display:"flex",justifyContent:"space-between"}}>
{order.map((data)=>(
  <>
<h4 style={{marginLeft:"40px",fontFamily:"Rubik",fontWeight:"500",fontSize:"23px",marginBottom:"-2px"}}>Order ID : {data.orderid}</h4>

<CloseCircleOutlined style={{fontSize:"40px",marginRight:"20px",cursor:"pointer",marginBottom:"-2px"}} onClick={()=>{
  navigate("/orders")
}}/>
</>
))}
</div>

      <div className="maindiv">
        <div style={{display:"flex",flexDirection:"column"}}>
          <div className="items">
            <div className="table-container">
              <Table columns={ordercolumns} pagination={{ pageSize: 5 }} dataSource={orderproducts} style={{ fontSize: "50px" }} />
            </div>



          </div>
          <div className="orddet">
          <Select options={statusopt} size="large" className="statussel" value={status} onChange={(value) => setStatus(value)} />
          <Button size="large" onClick={updateStatus}>Update Status</Button>
          {order.map((data)=>(
            <>
            <h4 style={{marginLeft:"40px",fontFamily:"Rubik",fontWeight:"500"}}>Order Date : {data.orderdate}</h4>
            <h4 style={{marginLeft:"40px",fontFamily:"Rubik",fontWeight:"500"}}>Total Amount : ₹{data.total}.00</h4>
            </>
          ))}


          </div>
        </div>
        <div className="status">
          {order.map((data => (
            <>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "250px" }}>
                <h5 style={{ alignSelf: "flex-start",marginLeft:"10px" }} className="custname1">Customer</h5>
                <h3 className="custname2">{data.billaddress.name}</h3>
                <hr style={{ color: "white", width: "200px", marginBottom: "20px" }} />
              </div>
              <div >
                <h6 className="adrshead">Shipping Address</h6>
                <div >

                  <h6 className="adrs">{data.shipaddress.name}</h6>
                  <h6 className="adrs">{data.shipaddress.address}</h6>
                  <h6 className="adrs">{data.shipaddress.city}</h6>
                  <h6 className="adrs">{data.shipaddress.state}</h6>
                  <h6 className="adrs">{data.shipaddress.country}</h6>
                  <h6 className="adrs">{data.shipaddress.pin}</h6>
                  <h6 className="adrs">{data.shipaddress.phone}</h6>

                </div>


                <div >
                  <hr style={{ color: "white", width: "200px", marginTop: "20px", marginBottom: "20px" }} />
                  <h6 className="adrshead" >Billing Address</h6>
                  <div >

                    <h6 className="adrs">{data.billaddress.name}</h6>
                    <h6 className="adrs">{data.billaddress.address}</h6>
                    <h6 className="adrs">{data.billaddress.city}</h6>
                    <h6 className="adrs">{data.billaddress.state}</h6>
                    <h6 className="adrs">{data.billaddress.country}</h6>
                    <h6 className="adrs">{data.billaddress.pin}</h6>
                    <h6 className="adrs">{data.billaddress.phone}</h6>

                  </div>
                </div>
              </div>
            </>
          )))}
        </div>

      </div>


    </ >
  )

}


export default OrderDetails