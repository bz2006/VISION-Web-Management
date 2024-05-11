import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import "./product.css"
import HeaderComp from "../../components/header";
import { Table, message, Popconfirm, Button, Input,Spin } from "antd";
const Products = () => {

  var hosturl = "https://static-vision.s3.ap-south-1.amazonaws.com/"

  const [products, setProducts] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const navigate = useNavigate();

  const getAllproducts = async () => {
    try {
      setSpinning(true)
      const { data } = await axios.get("/api/v1/product/getall-product");
      setProducts(data.productList.map((data) => ({
        key: data["_id"],
        image: data["images"][0],
        model: data["name"],
        mrp: "₹"+data["mrp"]+".00",
        inventory: data["InStock"]
      })))
      setSpinning(false)
      console.log(data.productList);
      if (data.success) {
      }
    } catch (error) {
      message.error("Request Failed");
    }
  };


  useEffect(() => {
    getAllproducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //delete product
  const handleDelete = async (Id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${Id}`
      );
      if (data.success) {
        message.success(`Product is deleted`);

        getAllproducts();
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("Somtihing went wrong");
    }
  };
  const prcolumns = [
    {
      title: 'Image',
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
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
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
      onFilter: (value, record) => record.model.toLowerCase().includes(value.toLowerCase()),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    },

    {
      title: 'MRP',
      dataIndex: 'mrp',
      key: 'mrp',
    },
    {
      title: 'Inventory',
      dataIndex: 'inventory',
      key: 'inventory',
      render: (inventory) => (
        <span >
          {inventory === 0 ? 'In Stock' : 'Out of Stock'}
        </span>
      ),
    },
    {
      title: 'Edit',
      key: 'action',
      render: (text, record) => (
        <>
          <EditOutlined type="primary" onClick={() => { navigate(`/update-product/${record["key"]}`) }} style={{ marginRight: "10px", fontSize: "30px" }} />

        </>
      ),
    },
    {
      title: 'Delete',
      key: 'action',
      render: (text, record) => (
        <>

          <Popconfirm
            title="Delete Product"
            description="Are you sure to delete this Product?"
            onConfirm={() => handleDelete(record["key"])}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ fontSize: "30px" }} />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <Spin spinning={spinning} fullscreen size='large' />
      <HeaderComp />
      <div>
        <h2 style={{ margin: "50px", fontFamily: "Rubik", fontWeight: "400" }}> Store Products</h2>
      </div>
      <div className="table-container">
        <Table columns={prcolumns} pagination={{ pageSize: 5 }} dataSource={products} style={{ width: "fit-content", fontSize: "50px" }} />
      </div>

    </>
  )
}

export default Products