import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { message, Button, Input, Spin, Select, Checkbox, spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./Admindashboard.css"
import "./createProduct.css"
import HeaderComp from "../../components/header";
const { TextArea } = Input;

const UpdateProduct = () => {
  var hosturl = "https://static-vision.s3.ap-south-1.amazonaws.com/"

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mrp, setMrp] = useState("");
  const [category, setCategory] = useState("");
  const params = useParams();
  const [InStock, setInStock] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [Featured, setFeatured] = useState(false);
  const [spinning, setSpinning] = useState(false);


  const getSingleProduct = async () => {
    try {
      setSpinning(true)
      const { data } = await axios.get(`/api/v1/product/getsingle-product/${params.id}`);

      setName(data.product.name);
      setDescription(data.product.description);
      setSelectedImages(data.product.images);
      setMrp(data.product.mrp);
      setCategory(data.product.category);
      setInStock(data.product.InStock);
      setFeatured(data.product.isFeatured)
      setSpinning(false)
      if (data.success) {

      }
    } catch (error) {
      message.error("Something went wrong in getting product");
    }
  };

  useEffect(() => {
    getSingleProduct(params.id);
    //eslint-disable-next-line
  }, []);
  const getAllCategory = async () => {
    try {
      setSpinning(true)
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category.map(category => ({ value: category._id, label: category.name })))
        setSpinning(false)
      }
    } catch (error) {
      message.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);


  //update product function
  const handleUpdate = async (e) => {

    e.preventDefault();
    try {
      setSpinning(true)
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      for (let img of selectedImages) {
        productData.append("images", img);

      }

      productData.append("mrp", mrp);
      productData.append("category", category);
      productData.append("InStock", InStock);
      productData.append("isFeatured", Featured);
      console.log(selectedImages);
      const { data } = await axios.put(`/api/v1/product/update-product/${params.id}`, productData);
      setSpinning(false)
      if (data?.success) {
        message.error(data?.message);
      } else {
        message.success("Product Created Successfully");
        navigate("/products");
      }
    } catch (error) {
      message.error("something went wrong");
    }
  };

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);


    setSelectedImages((previousImages) => previousImages.concat(selectedFilesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };
  const stock = [
    { value: 0, label: 'In Stock' },
    { value: 1, label: 'Out Of Stock' }
  ];

  const deleteHandler = (file) => {

    const remainingImages = selectedImages.filter((image) => image !== file);

    setSelectedImages(remainingImages);
  };
  return (
    <>
      <Spin spinning={spinning} fullscreen size='large' />
      <HeaderComp />
      <div>
        <div className="button-container">
          <button className="prcrbtn" onClick={() => { navigate("/products") }}>Cancel</button>
          <button onClick={handleUpdate} className="prcrbtn">Update</button>
        </div>
        <div className="prgrid">
          <div className='upimg'>
            <h4 className="prhead">Product Images<hr></hr>
            </h4>
            <div style={{ padding: "20px" }}>
              <input type="file" id='upload' accept="image/png, image/jpeg,image/webp" onChange={onSelectFile} multiple >

              </input><label className="label" for="upload"><h1 style={{ fontSize: "70px" }}>+</h1></label>
              <div className="images">
                {selectedImages &&
                  selectedImages.map((image, index) => {
                    return (
                      <div key={index} className="image">
                        {(() => {
                          try {
                            const imageUrl = URL.createObjectURL(image);
                            return <img src={imageUrl} alt="upload" className="primg" />;
                          } catch (error) {
                            return <img src={hosturl + image} alt="upload" className="primg" />;
                          }
                        })()}
                        <div className="overlay">
                          <DeleteOutlined  className="prdele" onClick={() => deleteHandler(image)} />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="prcat">
            <h4 className="prhead">Product Catagory<hr></hr>
            </h4>

            <Select options={categories} size="large" className="catsel" value={category} onChange={(value) => setCategory(value)} />
            <div style={{ padding: "20px" }}>
              <Checkbox checked={Featured} onChange={(event) => setFeatured(event.target.checked)} size="large" style={{ color: "white", marginRight: "5%" }}>Featured</Checkbox>


            </div>
          </div>
        </div>


        {/* ----------------------- */}
        <div className="infodiv">

          <h4 className="prhead">Product Info<hr></hr></h4>

          <div className="prinfo">


            <div style={{ display: "flex", flexDirection: "column" }}>
              <h5 className="infohead">Name</h5>
              <Input
                type="text"
                style={{ width: "200px" }}
                size="large"
                value={name}
                placeholder="Product Name"
                required
                onChange={(e) => setName(e.target.value)}
              />

              <h5 className="infohead">Description</h5>
              <TextArea
                style={{ width: "400px" }}
                size="large"
                value={description} required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>


            <div style={{ display: "flex", flexDirection: "column", marginLeft: "200px" }}>
              <div>
                <h5 className="infohead">Maximum Retail Price</h5>
                <Input
                  size="large"
                  type="number"
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  required
                />
              </div>

              <div>
                <h5 className="infohead">Inventory Status</h5>
                <Select size="large" className="stat" options={stock} value={InStock} onChange={(e) => setInStock(e)} />
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  )
}


export default UpdateProduct