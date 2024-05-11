import React, { useState, useEffect } from "react";
import { Table, Button, Input, Spin ,message} from "antd";
import {  SearchOutlined } from '@ant-design/icons'
import axios from "axios";
import "./Admindashboard.css"
import "./product.css"
import HeaderComp from "../../components/header";

const Users = () => {
  
  const [users, setUsers] = useState([]);
  const [spinning, setSpinning] = useState(false);


  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/users/getall-users");

      setUsers(data.usersList.map((data) => ({
        key: data["_id"],
        name: data["username"],
        orders: data["ordersNo"],
        dos: data["date"],
        email: data["email"],
        status: data["status"]
      })))
      console.log(data.usersList);
    } catch (error) {
      message.error("Something went wrong in getting users");
    }
  };
console.log(users);

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const usercolumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
      onFilter: (value, record) => record.email.toLowerCase().includes(value.toLowerCase()),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    },

    {
      title: 'Orders Placed',
      dataIndex: 'orders',
      key: 'orders',
      render: (orders) => (
        <span >
          {orders === 0 ? 'No Orders yet' : orders}
        </span>
      ),
    },
    {
      title: 'Date Of Sign Up',
      dataIndex: 'dos',
      key: 'dos',
      
    },
    
    
  ];
  
  return (
    <>
    <Spin spinning={spinning} fullscreen size='large' />
    <HeaderComp />
    <div>
      <h2 style={{ margin: "50px", fontFamily: "Rubik", fontWeight: "400" }}>Users</h2>
    </div>
    <div className="table-container">
      <Table pagination={{ pageSize: 5 }} columns={usercolumns} dataSource={users} style={{ width: "fit-content", fontSize: "50px" }} />
    </div>

  </>
  )
}

export default Users