import React, { useEffect, useState } from 'react'
import { Table, Button, Input, Spin } from "antd";
import axios from 'axios'
import "./Admindashboard.css"
import "./product.css"
import HeaderComp from '../../components/header'
import {  SearchOutlined, SmallDashOutlined } from '@ant-design/icons'


const Orders = () => {

  const [allorders, setAllorders] = useState([])
  const [spinning, setSpinning] = useState(false);


  const getallOrders = async () => {
    setSpinning(true)
    const orders = await axios.get("/api/v1/orders/get-allorders");
    ///setAllorders(orders.data)
    setAllorders(orders.data.map((data) => ({
      key: data["orderid"],
      orderid: data["orderid"],
      date: data["orderdate"],
      customer: data["billaddress"]["name"],
      amount: data["total"],
      status: data["status"]
    })))
    setSpinning(false)
    //console.log(orders.data);

  }
  useEffect(() => {
    getallOrders()
  }, [])

  

  const ordercolumns = [
    {
      title: 'Order #',
      dataIndex: 'orderid',
      key: 'orderid',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Model"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => { confirm(); }}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => { confirm(); }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.orderid.toLowerCase().includes(value.toLowerCase()),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Model"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => { confirm(); }}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => { confirm(); }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.date.toLowerCase().includes(value.toLowerCase()),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    },

    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Total Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Order Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'View Details',
      key: 'action',
      render: (record) => (
        <SmallDashOutlined style={{fontSize:"30px"}}  onClick={() => {
          window.location.href = `/order/${record["orderid"]}`
        }} />
      ),
    },


  ];

  return (
    <>
      <Spin spinning={spinning} fullscreen size='large' />
      <HeaderComp />
      <div>
        <h2 style={{ margin: "50px", fontFamily: "Rubik", fontWeight: "400" }}>Orders</h2>
      </div>
      <div className="table-container">
        <Table columns={ordercolumns} pagination={{ pageSize: 5 }} dataSource={allorders} style={{ width: "fit-content", fontSize: "50px" }} />
      </div>

    </>
  )
}

export default Orders