import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal';

export const Updatecat = ({ handleSubmit, value, setValue }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      
      
      <FontAwesomeIcon icon={faPen} onClick={handleShow} className="crupd"/>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder='New Catagory' 
                value={value} onChange={(e) => setValue(e.target.value)} 
                autoFocus 
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose} type="submit">
              Save 
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}



// import React, { useState } from 'react';
// import "./Admindashboard.css"

// export const Createcat = ({ handleSubmit, value, setValue }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const Createcatpop = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <button className="addbtn" onClick={Createcatpop}>+ Add Catagory</button>

//       {isOpen && (
//         <div className="crbox ">
//           <div className="croverlay">
//             <div className='popheader'>Create Category <div className='close'><span className="material-symbols-outlined" onClick={Createcatpop}>
//               close
//             </span></div></div>
//             <form onSubmit={handleSubmit}>
//               <input type='text' placeholder='New Catagory' value={value} onChange={(e) => setValue(e.target.value)}></input>
//               <button type='submit'>Create Category</button>
//             </form>

//           </div>
//         </div>
//       )}
//     </>
//   );


// }


