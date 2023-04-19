import React from 'react';
import './Components.css';
import Button from 'react-bootstrap/Button';
import {useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

export default function OrganisationCard(prop) {

  const navigate = useNavigate(); 
  let currentUser_ = {};

  useEffect(() => {
    currentUser_ = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser_ == null) {
      navigate("/landing");
    }
    console.log(currentUser_);
  }, []);


  // modal
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => {
    setShow(true)
  };
  const handleLeave = () => {
    setShow(false)
    console.log( "organisation : ", prop.id);
  }


  const openOrganisation = () => {
    console.log( "organisation : ", prop.id);
  };
  const leaveOrganisation = () => {
    setShow(true);

  };

  return (
    <>
      <div className='OrganisationCardOuter'>
          <div className='OrganisationTitle'> <h5>{prop.title}</h5> </div>
          <img className='OrganisationLogo' src={prop.logo} alt='logo' />
          <div className='OrganisationButtons'>
            <Button className='orgbtn' variant="outline-primary" onClick={openOrganisation}>Open</Button>
            <Button className='orgbtn' variant="outline-danger" onClick={leaveOrganisation}>Leave</Button>
          </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Once you leave this, you won't be able to access it ever again.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLeave}>
            Leave
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
