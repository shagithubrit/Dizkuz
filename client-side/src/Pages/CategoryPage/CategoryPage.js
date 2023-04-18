import React, { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import CategoryCard from '../../Components/CategoryCard';
import './CategoryPage.css';
import Modal from 'react-bootstrap/Modal';
import Footer from '../../Components/Footer';
import NavBar from '../../Components/NavBar';

const Categories = [
    {
        title : 'category 1',
        description : 'description about category 1',
        id : 'id 1'
    },
    {
        title : 'category 2',
        description : 'description about category 2',
        id : 'id 2'
    },
    {
        title : 'category 3',
        description : 'description about category 3',
        id : 'id 3'
    },
    {
        title : 'category 4',
        description : 'description about category 4',
        id : 'id 4'
    },
    {
        title : 'category 5',
        description : 'description about category 5',
        id : 'id 5'
    }
]

export default function CategoryPage() {
  const navigate = useNavigate();

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
    // console.log( "organisation : ", prop.id);
  }

    const [orgName, setOrgName] = useState( 'Organization test');


    const CategoryComponent = Categories.map((category) =>{
        return(
        <div>
            <CategoryCard title={category.title} description={category.description} id={category.id} key={category.id}/>
        </div>
        );
      });

    const openMembers = () => {
        console.log( "Members");
    }

    const leaveOrganisation = () => {
        handleShow();
        console.log( "leave organisation");
    }

    let currentUser_ = {};
  
    useEffect( () => {
      currentUser_ = JSON.parse(localStorage.getItem('currentUser'));
      if( currentUser_ == null){
        navigate( '/landing');
      }
    }, []);

  return (
    <>
    <NavBar />
    <div className='CategoryConainer' style={{paddingTop : '100px'}}>

        <h3 style={{textAlign: 'center'}}>{orgName}</h3>
        <hr/>
        <div className='OrganisationButton2'>
            <Button className='orgbtn_' variant="outline-primary" onClick={openMembers}>Members</Button>
            <Button className='orgbtn_' variant="outline-danger" onClick={leaveOrganisation}>Leave</Button>
        </div>
        {CategoryComponent}
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
    <Footer />
    </>
  )
}
