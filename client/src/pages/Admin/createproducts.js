import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { message, Button, Input, Spin, Select,Checkbox } from "antd";
import Form from 'react-bootstrap/Form';
import "./Admindashboard.css"
import "./createProduct.css"
import HeaderComp from "../../components/header";
const { TextArea } = Input;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mrp, setMrp] = useState();
  const [category, setCategory] = useState("");
  const [InStock, setInStock] = useState("");
  const [Featured, setFeatured] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);


  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        console.log(data.category);
        setCategories(data.category.map(category => ({ value: category._id, label: category.name })))
      }
    } catch (error) {
      message.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);


    setSelectedImages((previousImages) => previousImages.concat(selectedFilesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };
  const deleteHandler = (file) => {
    const remainingImages = selectedImages.filter((f) => f !== file);
    setSelectedImages(remainingImages);


    const objectUrlToDelete = URL.createObjectURL(file);


    URL.revokeObjectURL(objectUrlToDelete);
  };

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {

      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      for (let img of selectedImages) {
        productData.append("images", img)
      }

      productData.append("mrp", mrp);
      productData.append("category", category);
      productData.append("InStock", InStock);
      productData.append("isFeatured", Featured);

      const { data } = await axios.post("/api/v1/product/create-product", productData);


      if (data?.success) {
        message.error(data?.message);
      } else {
        message.success("Product Created Successfully");
        navigate("/dashboard/manage.vision/admin/products");
      }
    } catch (error) {
      message.error("something went wrong");
    }
  };
  const taxmethodop = [
    { value: 0, label: 'In Stock' },
    { value: 1, label: 'Out Of Stock' }
  ];

  return (
    <>
      <HeaderComp />
      <div>
        <div className="button-container">
          <button className="prcrbtn" onClick={() => { navigate("/dashboard/manage.vision/admin/products") }}>Cancel</button>
          <button onClick={handleCreate} className="prcrbtn">Create</button>
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
                        <img src={URL.createObjectURL(image)} alt="upload" className="primg" />
                        <div className="overlay">
                        <FontAwesomeIcon icon={faTrashCan} className="prdele" onClick={() => deleteHandler(image)} />
                        </div>
                      </div>
                      
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="prcat">
            <h4 className="prhead">Product Catagory</h4><hr></hr>

            <Select options={categories} size="large" className="catsel" value={category}  onChange={(value) => setCategory(value)} />
            <div style={{ padding: "20px" }}>
              <Checkbox checked={Featured} onChange={(event) => setFeatured(event.target.checked)} size="large" style={{ color: "white", marginRight: "5%" }}>Featured</Checkbox>
             
           
            </div>
          </div>
        </div>


        {/* ----------------------- */}
        <div className="infodiv">

          <h4 className="prhead">Product Info</h4>

          <div className="prinfo">


            <div style={{ display: "flex", flexDirection: "column" }}>
              <h5 >Name</h5>
              <Input
                type="text"
                style={{ width: "200px" }}
                size="large"
                value={name}
                placeholder="Product Name"
                required
                onChange={(e) => setName(e.target.value)}
              />


              <TextArea
                style={{ width: "400px" }}
                size="large"
                value={description} required 
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>


            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
              <h5 >Maximum Retail Price</h5>
              <Input
              size="large"
              type="number"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                required
              />
                </div>

<div>
<h4 >Inventory Status</h4>
              <h5 className="prlab">Status</h5>
              <Select className="stat" options={taxmethodop} value={InStock} onChange={(e) => setInStock(e)} />
</div>
              
            </div>

          </div>

        </div>
      </div>
    </>
  )
}


export default CreateProduct