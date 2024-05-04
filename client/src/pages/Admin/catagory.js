import React, { useEffect, useState } from "react";
import axios from "axios";
import "./catagory.css"
import "./Admindashboard.css"
import HeaderComp from "../../components/header";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
import { Button, Modal, Input, message } from "antd";



const CreateCategory = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [opencreate, setOpencreate] = useState(false);
    const [selected, setSelected] = useState("");
    const [updatedName, setUpdatedName] = useState("");
    const [openupdate, setopenupdate] = useState(false);

    //handle Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/category/create-category", {
                name,
            });

            if (data?.success) {
                message.success(`${name} is created`);
                setOpencreate(false)
                getAllCategory();
            } else {
                message.error(data.message);
                setOpencreate(false)
            }
        } catch (error) {
            message.error("somthing went wrong in input form");
            setOpencreate(false)
        }
    };

    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data.success) {
                setCategories(data.category);
                setopenupdate(false)
            }
        } catch (error) {
            message.error("Something went wrong in getting catgeory");
            setOpencreate(false)
        }
    };
    useEffect(() => {
        getAllCategory();
    }, []);

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `/api/v1/category/update-category/${selected}`,
                { name: updatedName }
            );
            if (data.success) {
                message.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                getAllCategory();
            } else {
                message.error(data.message);
            }
        } catch (error) {
            message.error("Somtihing went wrong");
        }
    };
    //delete category
    const handleDelete = async (Id) => {
        try {
            const { data } = await axios.delete(
                `/api/v1/category/delete-category/${Id}`
            );
            if (data.success) {
                message.success(`category is deleted`);

                getAllCategory();
            } else {
                message.error(data.message);
            }
        } catch (error) {
            message.error("Somtihing went wrong");
        }
    };




    return (
        <>
            <HeaderComp />
            <div><h2 style={{ margin: "30px", fontFamily: "Rubik", fontWeight: "400" }}>Catagories</h2>
                <Button onClick={() => { setOpencreate(true) }}>Add New Catagory</Button>
                <div className='cattop'>
                </div>
                <div className="catgrid">
                    {categories.map(c => (

                        <div className='catbtn' key={c._id}>
                            {c.name}<div style={{ display: "flex", flexDirection: "row", marginLeft: "80px" }}>
                                <EditFilled onClick={() => {
                                     setSelected(c._id);
                                      setUpdatedName(c.name); 
                                      setopenupdate(true) }} />
                                      &nbsp;&nbsp;&nbsp;&nbsp;
                                      <DeleteOutlined onClick={()=>{
                                        handleDelete(c._id)
                                      }}/>
                                      </div>
                        </div>
                    ))}
                </div>
            </div>



            <>
                <Modal
                    title="Create New Catagory"
                    centered
                    open={opencreate}
                    footer={null}
                    onCancel={() => setOpencreate(false)}
                    width={450}
                >

                    <div className='accsettings'>
                        <div style={{ marginBottom: "20px", marginTop: "20px" }}>
                            <Input value={name} onChange={(event) => { setName(event.target.value) }} size='large' style={{ width: "200px", marginRight: "5%" }} />
                        </div>
                        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <Button size='large' onClick={handleSubmit} >Create Catagory</Button>
                        </div>
                    </div>
                </Modal>
                <Modal
                    title="Update Catagory"
                    centered
                    open={openupdate}
                    footer={null}
                    onCancel={() => setopenupdate(false)}
                    width={450}
                >

                    <div className='accsettings'>
                        <div style={{ marginBottom: "20px", marginTop: "20px" }}>
                            <Input value={updatedName} onChange={(event) => { setUpdatedName(event.target.value) }} size='large' style={{ width: "200px", marginRight: "5%" }} />
                        </div>
                        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <Button size='large' onClick={handleUpdate} >Update Catagory</Button>
                        </div>
                    </div>
                </Modal>
            </>


        </>
    )

}
export default CreateCategory