import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import { Updatecat } from "./updatecat";
import { Createcat } from "./createcat";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

import "./Admindashboard.css"
import HeaderComp from "../../components/header";



const CreateCategory = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    //handle Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/category/create-category", {
                name,
            });

            if (data?.success) {
                toast.success(`${name} is created`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("somthing went wrong in input form");
        }
    };

    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data.success) {
                setCategories(data.category);

            }
        } catch (error) {
            toast.error("Something went wrong in getting catgeory");
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
                `/api/v1/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if (data.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Somtihing went wrong");
        }
    };
    //delete category
    const handleDelete = async (Id) => {
        try {
            const { data } = await axios.delete(
                `/api/v1/category/delete-category/${Id}`
            );
            if (data.success) {
                toast.success(`category is deleted`);

                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Somtihing went wrong");
        }
    };




    return (
        <>
        <HeaderComp/>
            <div className="container-fluid ">
                <div className="row">
            


                    <div className="col-md-3">
                        <div><h2 style={{ margin: "30px", fontFamily: "Rubik", fontWeight: "400" }}>Catagories</h2>
                            <div className='cattop'>
                                <Createcat handleSubmit={handleSubmit} value={name} setValue={setName} />


                            </div>

                            <div className="catgrid">
                                {categories.map(c => (

                                    <div className='catbtn' key={c._id}>
                                        <div className="delbtn">

                                            <div className="catdropdown" tabIndex="0">
                                                <span class="horbtn" className="material-symbols-outlined" onClick={() => {
                                                    setUpdatedName(c.name);
                                                    setSelected(c);
                                                }}>
                                                    more_horiz
                                                </span>


                                                <div className="catdropdown-content">
                                                    <Updatecat value={updatedName}
                                                        setValue={setUpdatedName}
                                                        handleSubmit={handleUpdate} />
                                                    <FontAwesomeIcon className="delcr" icon={faTrashCan} onClick={() => {
                                                        handleDelete(c._id);
                                                    }} />
                                                </div>
                                            </div>








                                        </div>
                                        {c.name}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default CreateCategory